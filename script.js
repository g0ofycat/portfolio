const fadeElements = document.querySelectorAll(".fade-in");
const cards = document.querySelectorAll(".card");
const headerElement = document.querySelector(".typewriter h1");
const subtitleElement = document.querySelector(".typewriter p");
const buttonScroller = document.querySelector(".button-scroller");

// ---------- SCROLLER HANDLER ----------

if (buttonScroller) {
  const buttons = [...buttonScroller.children];
  buttons.forEach((btn) => {
    buttonScroller.appendChild(btn.cloneNode(true));
  });
}

// ---------- FADE IN ----------

document.body.classList.add("fade-in-loaded");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.1) { 
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.1 }
);
  
fadeElements.forEach((el) => observer.observe(el));

// ---------- MOUSE ROTATION ----------

function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

cards.forEach((card) => {
  const glow = card.querySelector(".glow");
  let bounds = card.getBoundingClientRect();

  const updateBounds = () => (bounds = card.getBoundingClientRect());
  window.addEventListener("scroll", updateBounds, { passive: true });
  window.addEventListener("resize", updateBounds, { passive: true });

  const rotateToMouse = (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const centerX = mouseX - bounds.x - bounds.width / 2;
    const centerY = mouseY - bounds.y - bounds.height / 2;
    const distance = Math.sqrt(centerX ** 2 + centerY ** 2);

    card.style.transform = `scale3d(1.07, 1.07, 1.07) rotate3d(${
      centerY / 100
    }, ${-centerX / 100}, 0, ${Math.log(distance) * 5}deg)`;
    card.style.transition = "transform 0.2s ease-out";

    if (glow) {
      glow.style.backgroundImage = `radial-gradient(circle at ${
        centerX * 2 + bounds.width / 2
      }px ${centerY * 2 + bounds.height / 2}px, rgba(255,255,255,0.3), rgba(255,255,255,0))`;
      glow.style.transition = "background-image 0.2s ease-out";
    }
  };

  const throttledRotate = throttle(rotateToMouse, 16);

  card.addEventListener("mouseenter", () => {
    updateBounds();
    document.addEventListener("mousemove", throttledRotate, { passive: true });
  });

  card.addEventListener("mouseleave", () => {
    document.removeEventListener("mousemove", throttledRotate);
    card.style.transform = "";
    card.style.transition = "transform 1s ease-out";

    if (glow) {
      glow.style.backgroundImage = "";
      glow.style.transition = "background-image 1s ease-out";
    }
  });

  updateBounds();
});

// ---------- TYPEWRITER ----------

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

  const typedTextSpan = document.createElement("span");
  element.insertBefore(typedTextSpan, cursor);

  let charIndex = 0;
  const typeCharacter = () => {
    if (charIndex < text.length) {
      typedTextSpan.textContent += text.charAt(charIndex++);
      setTimeout(typeCharacter, typingSpeed);
    } else {
      clearInterval(blinkCursor);
      cursor.remove();
    }
  };

  setTimeout(typeCharacter, delay);
  window.addEventListener("beforeunload", () => clearInterval(blinkCursor));
}

if (headerElement) createTypewriterEffect(headerElement, headerElement.textContent, 50);
if (subtitleElement) createTypewriterEffect(subtitleElement, subtitleElement.textContent, 25, 1750);