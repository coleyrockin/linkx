import React from 'react';
import Boyd from "../../assets/imgs/BoydBGRM.png"

function Everything() {
  return (
    <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
      <img src={Boyd} alt="Headshot"
        class="w-20 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
        width="384" height="512" />
      <section>
        <div class="container">
          {/* Google Font? */}
          <h1 css="font-family: 'Lora', serif">Boyd C Roberts</h1>
          <h1>Full-stack developer</h1>
          <button>
            <a href="https://github.com/coleyrockin">Github</a>
          </button>
          <button>
            <a href="">Portfolio Coming Soon</a>
          </button>
          <button>
            <a href="https://www.linkedin.com/in/boydcroberts/">Linkedin</a>
          </button>
        </div>
      </section>

    </figure>
  );
}

export default Everything;