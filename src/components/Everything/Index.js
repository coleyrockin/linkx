import React from 'react';
import Boyd from "../../assets/imgs/BoydBGRM.png"
import Typical from 'react-typical';

function Everything() {
  return (
    <figure class="flex flex-col md:container mx-auto rounded-xl p-8 md:p-0 dark:bg-grey-700">
      <img src={Boyd} alt="Headshot"
        class="w-24 h-28 md:w-48 md:h-auto rounded-full mx-auto"
        width="384" height="512" />
      <div class="pt-6 md:p-8 text-center space-y-4">
        <h1 class="text-4xl  text-slate-100 ">｛Boyd Roberts｝</h1>
        <Typical
          steps={['"Saw this documentary..."', 2000, '"crypto"', 1000, '"Elon"', 1000, '"Dude, I love Space"', 1000]}
          loop={Infinity}
          wrapper="blockquote"
          className="italic"
        />
        <h2 class="text-2xl  text-slate-600 "> Nerd || Old Man </h2>
        <div className='md:flex flex flex-col text-zinc-300'>
          <button>
            <a className='text-cyan-700 text-2xl' href="https://github.com/coleyrockin">Github</a>
          </button>
          <button>
            <a className='text-sky-700 text-2xl' href="https://coleyrockin.github.io/react-portfolio/">Portfolio</a>
          </button>
          <button>
            <a className='text-blue-700 text-3xl' href="https://www.linkedin.com/in/boydcroberts/">Linkedin</a>
          </button>
        </div>
      </div>
    </figure>
  );
}

export default Everything;