import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("[linkx] crashed:", error, info);
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="lx-crash" role="alert">
          <div className="lx-crash-card">
            <h1>Something broke.</h1>
            <p>The site crashed. Direct links still work:</p>
            <ul>
              <li><a href="https://github.com/coleyrockin">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/boydcroberts/">LinkedIn</a></li>
              <li><a href="https://coleyrockin.github.io/react-portfolio/">Portfolio</a></li>
            </ul>
            <button type="button" onClick={() => this.setState({ error: null })}>
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
