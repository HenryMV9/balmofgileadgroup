import './styles.css';

// Inject the current year into the footer dynamically.
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Subtle parallax on the hero composition for depth (pointer devices only).
const composition = document.querySelector('.composition');
const hero = document.querySelector('.hero');

if (composition && hero && window.matchMedia('(pointer: fine)').matches) {
  let frame = null;

  hero.addEventListener('pointermove', (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      composition.style.setProperty('--px', `${x.toFixed(3)}`);
      composition.style.setProperty('--py', `${y.toFixed(3)}`);
    });
  });

  hero.addEventListener('pointerleave', () => {
    composition.style.setProperty('--px', '0');
    composition.style.setProperty('--py', '0');
  });
}

// Respect reduced-motion preferences.
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduce-motion');
}
