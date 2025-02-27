window.onscroll = function () {
  requestAnimationFrame(myFunction);
};

function myFunction() {
  var winScroll = window.scrollY || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  if (height === 0) return;

  var scrolled = (winScroll / height) * 100;

  scrolled = Math.min(Math.max(scrolled, 0), 100);

  var progressBar = document.getElementById("myBar");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
}

window.addEventListener("scroll", function () {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});

const text = "g0ofycat 🐈‍⬛";
let index = 0;
const speed = 50;
function typeWriter() {
  if (index < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();

document.addEventListener("DOMContentLoaded", () => {
  const overlayText = document.getElementById("overlayText");
  const aboutTextElement = document.getElementById("aboutText");

  document.querySelectorAll(".project").forEach((project, index) => {
    project.addEventListener("click", () => {
      overlayText.classList.add("fade-out");
      aboutTextElement.classList.add("fade-out");

      setTimeout(() => {
        const texts = [
          `<i><b>
                  • 4 Years of Scripting <br>
                  • 2 Years of UI / UX <br>
                  • 2 Years of Building / Modelling <br>
                  • 2 Years of Animating <br>
                  • Experienced with almost all Basic Topics <br>
                  • Understanding with some Advanced Topics.
                  </b></i>`,
          `Hello, I'm <b>g0ofycat</b>! I am a <b>Fullstack Developer</b> with <b>~4 years of experience</b>, primarily using <b>Luau</b> as my main programming language. 
                  I am skilled in <b>HTML</b>, <b>Python</b>, and <b>Luau</b>, and I am currently exploring <b>C++</b> or <b>C#</b> 
                  as my next programming language. I specialize in areas such as <b>Mechanics / Systems</b>, <b>UI/UX design</b>, and <b>many other projects</b>, among 
                  other fields. I have a solid understanding of <b>basic programming concepts</b> and <b>some advanced topics.</b>`,
          `<i>Age: <b>14</b> <br> 
                  Timezone: <b>EST (Eastern Standard Time)</b> <br> 
                  Discord: <b>g0ofycat</b> <br> 
                  Email: <b>g0ofycatbusiness@gmail.com</b> <br>
                  Region: <b>USA</b></i><br>
                  (Do <b>NOT</b> DM me if you're trying to make a low quality/cashgrab game)
                  `,
        ];

        const overlayTexts = ["Experience", "About Me", "Other"];

        aboutTextElement.innerHTML = texts[index];
        overlayText.innerHTML = overlayTexts[index];

        setTimeout(() => {
          aboutTextElement.classList.remove("fade-out");
          overlayText.classList.remove("fade-out");

          aboutTextElement.classList.add("fade-in");
          overlayText.classList.add("fade-in");
        }, 200);
      }, 500);

      setTimeout(() => {
        aboutTextElement.classList.remove("fade-in");
        overlayText.classList.remove("fade-in");
      }, 200);
    });
  });
});
