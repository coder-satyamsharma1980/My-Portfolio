document.addEventListener('DOMContentLoaded', () => {
  const currentYear = document.getElementById('year');
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const footerGrid = document.querySelector('.footer-grid');
  if (footerGrid && !footerGrid.querySelector('.footer-socials')) {
    const footerSocials = document.createElement('div');
    footerSocials.className = 'footer-socials';
    footerSocials.innerHTML = '<a href="https://github.com/coder-satyamsharma1980" target="_blank" rel="noopener">GitHub <span>↗</span></a><a href="https://www.linkedin.com/in/satyam-sharmalpu" target="_blank" rel="noopener">LinkedIn <span>↗</span></a><a href="mailto:satyamsharma2024@gmail.com">Email <span>↗</span></a>';
    const footerCopy = footerGrid.querySelector('.footer-copy');
    footerGrid.insertBefore(footerSocials, footerCopy);
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('visible'));

  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('satyam-theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');
  if (themeIcon) themeIcon.textContent = document.body.classList.contains('light-mode') ? '☾' : '☀';
  if (themeToggle) themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('satyam-theme', isLight ? 'light' : 'dark');
    if (themeIcon) themeIcon.textContent = isLight ? '☾' : '☀';
  });

  document.querySelectorAll('a[href$=".html"]').forEach((link) => link.addEventListener('click', (event) => {
    const target = link.href;
    if (link.target || target.startsWith('mailto:')) return;
    event.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(() => { window.location.href = target; }, 260);
  }));

  const form = document.querySelector('.contact-form');
  if (form) form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Project idea from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`);
    window.location.href = `mailto:satyamsharma2024@gmail.com?subject=${subject}&body=${body}`;
    const note = form.querySelector('.form-note');
    if (note) note.textContent = 'Your email app is ready to send this message.';
  });
});
