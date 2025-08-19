document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Smooth scroll + active link
  const links = document.querySelectorAll('.site-nav .nav-link[href^="#"]');
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  links.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = `#${entry.target.id}`;
      const link = document.querySelector(`.site-nav .nav-link[href="${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(sec => obs.observe(sec));

  // Theme toggle (persisted)
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') {
    document.body.classList.add('dark');
    toggle.textContent = '☀️ Light';
    toggle.setAttribute('aria-pressed', 'true');
  }

  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    toggle.setAttribute('aria-pressed', String(isDark));
  });
});