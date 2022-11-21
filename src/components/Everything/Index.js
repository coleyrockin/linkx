import React from 'react';
import Boyd from "../../assets/imgs/BoydBGRM.png"
import TextTransition, { presets } from "react-text-transition";
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const TEXTS = [
  '"Saw this documentary..."',
  '"Crypto will, no seriously..."',
  '"Space is the..."',
  '"Thats cool, but..."',
  '"That wont exist in 10-50 years..."',
  '"Technology is..."',
  '"Je..."',
  '"I read this book 7 years ago..."',
  '"I dont believe in money, but..."',
  '"Can I borrow..."',
  '"Society is so..."',
  '"One time on a ...',
  '"If you think enough, nothing..."',
  '"Art is by far..."',
  '"I highly doubt it "'

];

function Everything() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      200 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <figure class="flex flex-col container mx-auto rounded-xl p-4 m-8 bg-gray-800 w-11/12">
      <img src={Boyd} alt="Headshot"
        class="w-24 h-auto md:w-24 md:h-auto rounded-full mx-auto grayscale" />
      <div class="pt-6 md:p-8 text-center space-y-4">
        <h1 class="text-4xl  text-stone-300 ">｛Boyd Roberts｝</h1>
        <p className='flex justify-center italic  text-stone-300'>
          <TextTransition springConfig={presets.gentle}>
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </p>
        <h2 class="text-xl text-stone-400">Gang | | Gang </h2>
        <div className='md:flex flex flex-col'>
          <button>
            <a className='text-stone-700 text-xl relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden font-medium bg-gradient-to-br from-gray-500 to-slate-500 hover:text-slate-300 focus:outline-none px-5 py-2.5 rounded-md'
              href="https://github.com/coleyrockin">Github <FaGithub /></a>
          </button>
          <button>
            <a className='text-stone-500 text-2xl relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden font-medium bg-gradient-to-br from-slate-600 to-gray-600 hover:text-slate-300 focus:outline-none px-5 py-2.5 rounded-md'
              href="https://coleyrockin.github.io/react-portfolio/">Portfolio<FaGlobe /></a>
          </button>
          <button>
            <a className='text-stone-400 text-3xl relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden font-medium bg-gradient-to-br from-gray-700 to-slate-700 hover:text-slate-300  focus:outline-none px-5 py-2.5 rounded-md'
              href="https://www.linkedin.com/in/boydcroberts/">Linkedin<FaLinkedin /></a>
          </button>
        </div>
      </div>
    </figure>
  );
}

export default Everything;