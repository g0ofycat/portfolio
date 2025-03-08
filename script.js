document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.99
    );
  }

  function checkScroll() {
    fadeElements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.classList.add("visible");
      }
    });
  }

  setTimeout(checkScroll, 100);

  window.addEventListener("scroll", checkScroll);

  window.addEventListener("resize", checkScroll);
});

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".card");

  elements.forEach((element) => {
    let bounds;
    let glow;

    function updateBounds() {
      bounds = element.getBoundingClientRect();
      glow = element.querySelector(".glow");
    }

    window.addEventListener("scroll", updateBounds);
    window.addEventListener("resize", updateBounds);

    function rotateToMouse(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2,
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      const rotationX = center.y / 100;
      const rotationY = -center.x / 100;
      const rotationZ = Math.log(distance) * 5;

      element.style.transform = `scale3d(1.07, 1.07, 1.07) 
              rotate3d(${rotationX}, ${rotationY}, 0, ${rotationZ}deg)`;
      element.style.transition = "transform 0.2s ease-out";

      if (glow) {
        glow.style.backgroundImage = `radial-gradient(
              circle at ${center.x * 2 + bounds.width / 2}px ${
          center.y * 2 + bounds.height / 2
        }px,
              rgba(255, 255, 255, 0.3),
              rgba(255, 255, 255, 0)
          )`;
        glow.style.transition = "background-image 0.2s ease-out";
      }
    }

    function handleMouseMove(e) {
      rotateToMouse(e);
    }

    element.addEventListener("mouseenter", () => {
      updateBounds();
      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
    });

    element.addEventListener("mouseleave", () => {
      document.removeEventListener("mousemove", handleMouseMove);
      element.style.transform = "";
      element.style.transition = "transform 1s ease-out";
      if (glow) {
        glow.style.backgroundImage = "";
        glow.style.transition = "background-image 1s ease-out";
      }
    });

    updateBounds();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function createTypewriterEffect(
    element,
    text,
    typingSpeed = 50,
    delay = 700
  ) {
    element.textContent = "";

    const cursor = document.createElement("span");
    cursor.style.position = "relative";
    cursor.style.display = "inline-block";
    cursor.style.width = "2px";
    cursor.style.height = "1em";
    cursor.style.backgroundColor = "var(--primary)";
    cursor.style.marginLeft = "2px";
    cursor.style.verticalAlign = "middle";

    element.appendChild(cursor);

    let cursorVisible = true;
    const blinkCursor = setInterval(() => {
      cursor.style.opacity = cursorVisible ? "1" : "0";
      cursorVisible = !cursorVisible;
    }, 500);

    let charIndex = 0;

    const typedTextSpan = document.createElement("span");
    element.insertBefore(typedTextSpan, cursor);

    function typeCharacter() {
      if (charIndex < text.length) {
        typedTextSpan.textContent += text.charAt(charIndex);
        charIndex++;

        let progress = charIndex / text.length;
        let easing = 0;

        if (progress < 0.3) {
          // Slow start
          easing = 1 - Math.pow(1 - progress / 0.3, 3);
          setTimeout(typeCharacter, typingSpeed * (2 - easing));
        } else if (progress > 0.7) {
          // Slow end
          easing = Math.pow((progress - 0.7) / 0.15, 3);
          setTimeout(typeCharacter, typingSpeed * (1 + easing));
        } else {
          // Fast middle
          setTimeout(typeCharacter, typingSpeed * 0.5);
        }
      }
    }

    setTimeout(typeCharacter, delay);

    window.addEventListener("beforeunload", () => {
      clearInterval(blinkCursor);
    });
  }

  const headerElement = document.querySelector(".typewriter h1");
  const headerText = headerElement.textContent;
  createTypewriterEffect(headerElement, headerText, 50);

  const subtitleElement = document.querySelector(".typewriter p");
  const subtitleText = subtitleElement.textContent;
  createTypewriterEffect(subtitleElement, subtitleText, 25, 1750);
});

document.addEventListener("DOMContentLoaded", () => {
  const videoHolders = document.querySelectorAll(".video-holder");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  videoHolders.forEach((videoHolder) => {
    observer.observe(videoHolder);
  });
});
