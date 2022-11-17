import React from 'react';
import Boyd from "../../assets/imgs/BoydBGRM.png"

function Everything() {
  return (
    <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-600">
      <img src={Boyd} alt="Headshot"
        class="w-20 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
        width="384" height="512" />
      <div class="pt-6 md:p-8 text-center space-y-4">
        <h1 class="text-4xl  text-zinc-300 ">Boyd C Roberts</h1>
        <h2 class="text-2xl  text-zinc-400 ">Full-stack developer</h2>
        <div className='md:flex flex flex-col text-zinc-500'>
          <button>
            <a href="https://github.com/coleyrockin">Github</a>
          </button>
          <button>
            <a href="https://coleyrockin.github.io/react-portfolio/">Portfolio</a>
          </button>
          <button>
            <a href="https://www.linkedin.com/in/boydcroberts/">Linkedin</a>
          </button>
        </div>
      </div>
    </figure>
  );
}

export default Everything;