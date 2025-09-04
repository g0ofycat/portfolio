document.body.classList.add("fade-in-loaded");
const fadeElements = document.querySelectorAll(".fade-in");
const cards = document.querySelectorAll(".card");
const videoHolders = document.querySelectorAll(".video-holder");
const headerElement = document.querySelector(".typewriter h1");
const subtitleElement = document.querySelector(".typewriter p");

function isElementInViewport(el) {
  return el.getBoundingClientRect().top <= window.innerHeight * 0.99;
}

function checkScroll() {
  requestAnimationFrame(() => {
    fadeElements.forEach((el) => {
      if (isElementInViewport(el) && !el.classList.contains("visible")) {
        el.classList.add("visible");
      }
    });
  });
}

setTimeout(checkScroll, 100);
window.addEventListener("scroll", checkScroll, { passive: true });
window.addEventListener("resize", checkScroll, { passive: true });

cards.forEach((card) => {
  let bounds = card.getBoundingClientRect();
  const glow = card.querySelector(".glow");

  function updateBounds() {
    bounds = card.getBoundingClientRect();
  }

  window.addEventListener("scroll", updateBounds, { passive: true });
  window.addEventListener("resize", updateBounds, { passive: true });

  function rotateToMouse(e) {
    const { clientX: mouseX, clientY: mouseY } = e;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const centerX = leftX - bounds.width / 2;
    const centerY = topY - bounds.height / 2;
    const distance = Math.sqrt(centerX ** 2 + centerY ** 2);

    card.style.transform = `scale3d(1.07, 1.07, 1.07) rotate3d(${
      centerY / 100
    }, ${-centerX / 100}, 0, ${Math.log(distance) * 5}deg)`;
    card.style.transition = "transform 0.2s ease-out";

    if (glow) {
      glow.style.backgroundImage = `radial-gradient(circle at ${
        centerX * 2 + bounds.width / 2
      }px ${
        centerY * 2 + bounds.height / 2
      }px, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))`;
      glow.style.transition = "background-image 0.2s ease-out";
    }
  }

  card.addEventListener("mouseenter", () => {
    updateBounds();
    document.addEventListener("mousemove", rotateToMouse, { passive: true });
  });

  card.addEventListener("mouseleave", () => {
    document.removeEventListener("mousemove", rotateToMouse);
    card.style.transform = "";
    card.style.transition = "transform 1s ease-out";
    if (glow) {
      glow.style.backgroundImage = "";
      glow.style.transition = "background-image 1s ease-out";
    }
  });

  updateBounds();
});

function createTypewriterEffect(element, text, typingSpeed = 50, delay = 700) {
  element.textContent = "";
  const cursor = document.createElement("span");
  cursor.style.cssText =
    "position:relative;display:inline-block;width:2px;height:1em;background-color:var(--primary);margin-left:2px;vertical-align:middle";
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
      typedTextSpan.textContent += text.charAt(charIndex++);
      setTimeout(typeCharacter, typingSpeed);
    }
  }

  setTimeout(typeCharacter, delay);
  window.addEventListener("beforeunload", () => clearInterval(blinkCursor));
}

if (headerElement)
  createTypewriterEffect(headerElement, headerElement.textContent, 50);
if (subtitleElement)
  createTypewriterEffect(
    subtitleElement,
    subtitleElement.textContent,
    25,
    1750
  );

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

videoHolders.forEach((videoHolder) => observer.observe(videoHolder));