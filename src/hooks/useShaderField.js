import { useEffect, useState } from "react";

/**
 * Renders an animated fragment-shader aurora into the given canvas.
 *
 * Progressive enhancement:
 *   - Returns `supported: false` if WebGL is unavailable or compilation fails.
 *     Callers should fall back to a 2D backdrop.
 *   - Time advancement is suppressed when the user prefers reduced motion;
 *     a single frame still renders so the visual remains.
 */

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// FBM aurora: layered simplex-noise flow with cursor-driven warp.
// Colors resolve against a dark-or-light uniform so the shader honors the theme.
const FRAGMENT_SHADER = `
precision highp float;

uniform float  u_time;
uniform vec2   u_resolution;
uniform vec2   u_mouse;
uniform float  u_scheme; // 0.0 dark, 1.0 light

// Simplex noise — Ashima Arts / Stefan Gustavson, CC0.
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  // Gentle warp toward the cursor.
  vec2 m = (u_mouse / u_resolution) * 2.0 - 1.0;
  m.x *= u_resolution.x / u_resolution.y;
  float mdist = length(p - m);
  p += normalize(p - m + 0.0001) * smoothstep(1.2, 0.0, mdist) * 0.15;

  float t = u_time * 0.08;
  float n = fbm(p * 1.3 + vec2(t, -t * 0.6));
  float n2 = fbm(p * 2.6 - vec2(t * 0.4, t * 0.7));
  float v = smoothstep(-0.8, 0.9, n + n2 * 0.4);

  // Dark-mode palette: violet → indigo → deep navy.
  vec3 darkA = vec3(0.08, 0.04, 0.22);
  vec3 darkB = vec3(0.30, 0.15, 0.55);
  vec3 darkC = vec3(0.15, 0.35, 0.70);
  vec3 darkColor = mix(mix(darkA, darkB, v), darkC, v * v);

  // Light-mode palette: warm sand → dusty mauve → soft sky.
  vec3 lightA = vec3(0.93, 0.89, 0.82);
  vec3 lightB = vec3(0.86, 0.78, 0.88);
  vec3 lightC = vec3(0.72, 0.82, 0.95);
  vec3 lightColor = mix(mix(lightA, lightB, v), lightC, v * v);

  vec3 color = mix(darkColor, lightColor, u_scheme);

  // Subtle radial vignette — center stays brighter so content reads.
  float vig = 1.0 - smoothstep(0.35, 1.1, length(uv - 0.5));
  color *= 0.85 + vig * 0.3;

  float alpha = mix(0.85, 0.45, u_scheme);
  gl_FragColor = vec4(color, alpha);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${info}`);
  }
  return shader;
}

function link(gl, vs, fs) {
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link failed: ${info}`);
  }
  return program;
}

export default function useShaderField(canvasRef) {
  const [supported, setSupported] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl =
      canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false }) ||
      canvas.getContext("experimental-webgl");

    if (!gl || typeof gl.createShader !== "function") {
      setSupported(false);
      return undefined;
    }

    let program;
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      program = link(gl, vs, fs);
    } catch (err) {
      if (import.meta.env.DEV) console.warn("[shader]", err.message);
      setSupported(false);
      return undefined;
    }

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uScheme = gl.getUniformLocation(program, "u_scheme");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const match = (q) =>
      typeof window.matchMedia === "function" && window.matchMedia(q).matches;
    const prefersReducedMotion = match("(prefers-reduced-motion: reduce)");
    const prefersLight = match("(prefers-color-scheme: light)");

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = e.clientX * dpr;
      mouse.y = canvas.height - e.clientY * dpr;
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
    };
    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(uScheme, prefersLight ? 1.0 : 0.0);

    const start = performance.now();
    let raf;
    const render = (now) => {
      const t = prefersReducedMotion ? 0 : (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(render);
      }
    };
    render(performance.now());

    setSupported(true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [canvasRef]);

  return supported;
}
