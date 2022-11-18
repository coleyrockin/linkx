import React from 'react';
import Boyd from "../../assets/imgs/BoydBGRM.png"
import TextTransition, { presets } from "react-text-transition";

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
  '"Can I borrow $5000???"',
  '"Society..."',
  '"In the Bible it says...',
  '"If you think enough, nothing makes sense"'

];

function Everything() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      800 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <figure class="flex flex-col md:container mx-auto rounded-xl p-8 md:p-0 dark:bg-grey-700">
      <img src={Boyd} alt="Headshot"
        class="w-24 h-28 md:w-48 md:h-auto rounded-full mx-auto"
        width="384" height="512" />
      <div class="pt-6 md:p-8 text-center space-y-4">
        <h1 class="text-4xl  text-slate-100 ">｛Boyd Roberts｝</h1>
        <p className='flex justify-center italic'>
          <TextTransition springConfig={presets.stiff}>
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </p>
        <h2 class="text-2xl text-slate-600">Gang | | Gang </h2>
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