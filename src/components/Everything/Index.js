import React from 'react';
import Boyd from "../../assets/imgs/BoydBGRM.png"

function Everything() {
  return (
    <div className="App">
      <body class="background">
        <div class="centr">
          <img src={Boyd} alt="Headshot" />

        </div>
        <section>

          <div class="container">
            <h1>Boyd Colbert Ferando Jr.</h1>
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

      </body>
    </div>
  );
}

export default Everything;