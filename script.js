document.addEventListener("DOMContentLoaded", () => {
  function updateProgressBar() {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height === 0) return;

    const scrolled = Math.min(Math.max((winScroll / height) * 100, 0), 100);
    const progressBar = document.getElementById("myBar");

    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  }

  window.addEventListener("scroll", () => {
    requestAnimationFrame(updateProgressBar);
  });

  const fadeElements = document.querySelectorAll(".fade-in-scroll");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => observer.observe(element));

  const text = "g0ofycat 🐈‍⬛";
  let index = 0;
  const speed = 50;
  const typewriterElement = document.getElementById("typewriter");

  function typeWriter() {
    if (index < text.length) {
      typewriterElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  if (typewriterElement) {
    typeWriter();
  }

  const overlayText = document.getElementById("overlayText");
  const aboutTextElement = document.getElementById("aboutText");

  const texts = [
    `<i><b>
      • 4 Years of Scripting <br>
      • 2 Years of UI / UX <br>
      • 2 Years of Building / Modeling <br>
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
    `
  ];

  const overlayTexts = ["Experience", "About Me", "Other"];

  document.querySelectorAll(".project").forEach((project, index) => {
    project.addEventListener("click", () => {
      if (!overlayText || !aboutTextElement) return;

      overlayText.classList.add("fade-out");
      aboutTextElement.classList.add("fade-out");

      setTimeout(() => {
        aboutTextElement.innerHTML = texts[index];
        overlayText.innerHTML = overlayTexts[index];

        aboutTextElement.classList.replace("fade-out", "fade-in");
        overlayText.classList.replace("fade-out", "fade-in");

        setTimeout(() => {
          aboutTextElement.classList.remove("fade-in");
          overlayText.classList.remove("fade-in");
        }, 400);
      }, 500);
    });
  });
});
