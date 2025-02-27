document.addEventListener("DOMContentLoaded", () => {
  function updateProgressBar() {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

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
    `,
  ];

  const overlayTexts = ["Experience", "About Me", "Other"];

  document.querySelectorAll(".project").forEach((project, index) => {
    project.addEventListener("click", () => {
      if (!overlayText || !aboutTextElement) return;

      overlayText.classList.add("fade-out");
      aboutTextElement.classList.add("fade-out");
  
      overlayText.addEventListener('animationend', function onFadeOut() {
        aboutTextElement.innerHTML = texts[index];
        overlayText.innerHTML = overlayTexts[index];
  
        overlayText.classList.remove("fade-out");
        aboutTextElement.classList.remove("fade-out");
  
        aboutTextElement.classList.add("fade-in");
        overlayText.classList.add("fade-in");
  
        overlayText.addEventListener('animationend', function onFadeIn() {
          aboutTextElement.classList.remove("fade-in");
          overlayText.classList.remove("fade-in");
  
          overlayText.removeEventListener('animationend', onFadeIn);
          overlayText.removeEventListener('animationend', onFadeOut);
        });
        
        overlayText.removeEventListener('animationend', onFadeOut);
      });
    });
  });

  window.addEventListener("mousemove", (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2;
  let targetMouseX = mouseX,
    targetMouseY = mouseY;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  canvas.addEventListener("mousemove", (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  const spawnBuffer = 50;

  class Dot {
    constructor(initial = false) {
      this.reset(initial);
      this.opacity = Math.random() * 0.6 + 0.2;
      this.fadeSpeed = Math.random() * 0.02 + 0.01;
    }

    reset(initial = false) {
      if (initial) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
      } else {
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0:
            this.x = Math.random() * canvas.width;
            this.y = -spawnBuffer;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = Math.random() * 0.2 + 0.1;
            break;
          case 1:
            this.x = canvas.width + spawnBuffer;
            this.y = Math.random() * canvas.height;
            this.vx = -(Math.random() * 0.2 + 0.1);
            this.vy = (Math.random() - 0.5) * 0.3;
            break;
          case 2:
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + spawnBuffer;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = -(Math.random() * 0.2 + 0.1);
            break;
          case 3:
            this.x = -spawnBuffer;
            this.y = Math.random() * canvas.height;
            this.vx = Math.random() * 0.2 + 0.1;
            this.vy = (Math.random() - 0.5) * 0.3;
            break;
        }
      }
      this.radius = Math.random() * 4 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.fadeSpeed;

      if (this.opacity <= 0.2 || this.opacity >= 0.8) {
        this.fadeSpeed *= -1;
      }

      if (
        this.x < -spawnBuffer ||
        this.x > canvas.width + spawnBuffer ||
        this.y < -spawnBuffer ||
        this.y > canvas.height + spawnBuffer
      ) {
        this.reset(false);
      }

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200;
      if (distance < maxDistance) {
        const lineOpacity = (1 - distance / maxDistance) * this.opacity;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const dots = Array(150)
    .fill()
    .map(() => new Dot(true));

  function drawGradient() {
    const gradientRadius = 200;
    const gradient = ctx.createRadialGradient(
      mouseX,
      mouseY,
      0,
      mouseX,
      mouseY,
      gradientRadius
    );
    gradient.addColorStop(0, "rgba(187, 187, 187, 0.15)");
    gradient.addColorStop(1, "rgba(187, 187, 187, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, gradientRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;

    drawGradient();

    dots.forEach((dot) => {
      dot.update();
      dot.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
});
