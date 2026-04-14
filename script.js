/* =============================================
   PORTFOLIO — script.js
   Custom Cursor · Navbar Scroll · Mobile Menu
   Tabs · Scroll Reveal · Smooth Hover
============================================= */

// ─── Custom Cursor ───────────────────────────
const cursor   = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .project-card, .about-img-frame');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});


// ─── Navbar Scroll Effect ────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


// ─── Mobile Menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


// ─── Experience Tabs ──────────────────────────
const tabBtns     = document.querySelectorAll('.tab-btn');
const tabPanels   = document.querySelectorAll('.tab-panel');
const tabIndicator = document.getElementById('tabIndicator');

function moveIndicator(btn) {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    tabIndicator.style.left  = btn.offsetLeft + 'px';
    tabIndicator.style.width = btn.offsetWidth + 'px';
  } else {
    tabIndicator.style.top   = btn.offsetTop + 'px';
    tabIndicator.style.height = btn.offsetHeight + 'px';
  }
}

// Init indicator position
moveIndicator(document.querySelector('.tab-btn.active'));

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('tab-' + btn.dataset.tab);
    target.classList.add('active');
    moveIndicator(btn);
  });
});

window.addEventListener('resize', () => {
  const active = document.querySelector('.tab-btn.active');
  if (active) moveIndicator(active);
});


// ─── Scroll Reveal ────────────────────────────
const aosElements = document.querySelectorAll('[data-aos]');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

aosElements.forEach(el => revealObserver.observe(el));


// ─── Active Nav Link Highlight ───────────────
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(s => sectionObserver.observe(s));


// ─── Project Cards Stagger ───────────────────
const projectCards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projectCards.forEach(card => cardObserver.observe(card));


// ─── Smooth scroll offset for fixed nav ──────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});


// ─── Typed greeting effect (Hero) ────────────
const taglines = [
  'I build things for the web.',
  'I design mobile experiences.',
  'I craft elegant UIs.',
];

const taglineEl = document.querySelector('.hero-tagline');
if (taglineEl) {
  let currentLine = 0;
  let charIndex    = 0;
  let deleting     = false;

  function typeEffect() {
    const text        = taglines[currentLine];
    const displayText = text.slice(0, text.lastIndexOf('.'));

    if (!deleting) {
      charIndex++;
      taglineEl.innerHTML = displayText.slice(0, charIndex) + '<span class="accent-dot">.</span>';

      if (charIndex >= displayText.length) {
        deleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 80);

    } else {
      charIndex--;
      taglineEl.innerHTML = displayText.slice(0, charIndex) + '<span class="accent-dot">.</span>';

      if (charIndex === 0) {
        deleting     = false;
        currentLine  = (currentLine + 1) % taglines.length;
        setTimeout(typeEffect, 400);
        return;
      }
      setTimeout(typeEffect, 40);
    }
  }

  // Mulai setelah animasi hero selesai
  setTimeout(typeEffect, 800);
}

// ─── Data Proyek ─────────────────────────────
const projects = [
  {
    title: "Sistem Pencatatan Prestasi Mahasiswa dan Rekomendasi Peserta Lomba Berbasis WEB",
    desc: "Sebuah sistem informasi pencatatan prestasi mahasiswa dan rekomendasi lomba berbasis web. Sistem ini dikembangkan sebagai solusi digital untuk mendokumentasikan berbagai pencapaian mahasiswa secara sistematis, serta memberikan saran kompetisi yang sesuai dengan minat dan bidang keahlian mahasiswa.",
    tech: ["Figma", "Laravel", "MySQL", "Bootstrap", "JavaScript"],
    images: ["image/pblsmt5-1.png", "image/pblsmt5-2.png", "image/pblsmt5-3.png"],
    imageLayout: "layout-3",
    github: "https://github.com/Noklent-Fardian/STARS",
    drive: "https://drive.google.com/file/d/13z66zkigEB2VQbg7FrWmUaEu7UouIObr/view?usp=sharing",
  },
  {
    title: "Deteksi Huruf Alfabet ASL Menggunakan Metode SVM dan CNN",
    desc: "Sebuah aplikasi mobile yang mampu mengenali bentuk tangan dan dikonversi menjadi huruf alfabet menggunakan American Sign Language. Didukung dengan computer vision, fitur ekstraksi HOG dan Mediapipe Hand Landmark, serta klasifikasi SVM dan CNN.",
    tech: ["Figma", "Flutter", "Python", "MySQL"],
    images: ["image/pblsmt6-1.jpeg", "image/pblsmt6-2.jpeg", "image/pblsmt6-3.jpeg"],
    imageLayout: "layout-2",
    github: "https://github.com/slizer432/flutter_pbl",
    drive: "https://drive.google.com/file/d/1JgNvEyFDuVmMgsEmkN4DIvuOy9X49W32/view?usp=sharing",
  },
  {
    title: "Sistem Perpustakaan Digital SMPN 1 Pujon",
    desc: "Sebuah aplikasi mobile untuk menunjang pembelajaran murid SMP Negeri 1 Pujon. Aplikasi ini berupa elektronik book (e-book) supaya murid dengan mudah mengakses buku untuk kegiatan belajar kapan saja dan di mana saja.",
    tech: ["Flutter"],
    images: ["image/proyekflutter1-1.jpeg", "image/proyekflutter1-2.jpeg", "image/proyekflutter1-3.jpeg"],
    imageLayout: "layout-3",
    github: "https://github.com/MaulanaHamzah/sistem-perpusdigital",
    drive: null,
  },
];

// ─── SVG Icons ───────────────────────────────
const githubIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
const driveIcon  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 19.5h20L12 2z"/><path d="M2 19.5l5-8.5h10l5 8.5"/><path d="M7 11l5-9 5 9"/></svg>`;

// ─── Buka Modal ──────────────────────────────
function openModal(index) {
  const p = projects[index];
  const overlay = document.getElementById('modalOverlay');

  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent  = p.desc;

  // Tech badges
  document.getElementById('modalTech').innerHTML =
    p.tech.map(t => `<span>${t}</span>`).join('');

  // Images
  const imgContainer = document.getElementById('modalImages');
  imgContainer.className = 'modal-images ' + p.imageLayout;
  imgContainer.innerHTML = p.images
    .map(src => `<img src="${src}" alt="Screenshot proyek" loading="lazy" />`)
    .join('');

  // Links
  const githubClass = p.github ? '' : ' disabled';
  const driveClass  = p.drive  ? '' : ' disabled';
  const githubHref  = p.github || '#';
  const driveHref   = p.drive  || '#';
  const githubTarget = p.github ? 'target="_blank" rel="noopener"' : '';
  const driveTarget  = p.drive  ? 'target="_blank" rel="noopener"' : '';

  document.getElementById('modalLinks').innerHTML = `
    <a href="${githubHref}" ${githubTarget} class="modal-link-btn${githubClass}" aria-label="GitHub">
      ${githubIcon} GitHub
    </a>
    <a href="${driveHref}" ${driveTarget} class="modal-link-btn${driveClass}" aria-label="Google Drive">
      ${driveIcon} Laporan Drive
    </a>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ─── Tutup Modal ─────────────────────────────
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ─── Update Link GitHub & Drive di Kartu ────
function initCardLinks() {
  projects.forEach((p, i) => {
    const githubEl = document.querySelector(`.proj-github-${i}`);
    const driveEl  = document.querySelector(`.proj-drive-${i}`);

    if (githubEl) {
      if (p.github) {
        githubEl.href = p.github;
        githubEl.target = '_blank';
        githubEl.rel = 'noopener';
      } else {
        githubEl.style.opacity = '0.3';
        githubEl.style.pointerEvents = 'none';
      }
    }

    if (driveEl) {
      if (p.drive) {
        driveEl.href = p.drive;
        driveEl.target = '_blank';
        driveEl.rel = 'noopener';
      } else {
        driveEl.style.opacity = '0.3';
        driveEl.style.pointerEvents = 'none';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initCardLinks); 

// ─── Typing Effect Section Titles ────────────
const sectionTitles = document.querySelectorAll('.section-title, .contact-title');

const titleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el      = entry.target;
    const numEl   = el.querySelector('.section-num');
    const numText = numEl ? numEl.outerHTML : '';
    const fullText = el.textContent.trim();
    const titleOnly = numEl
      ? fullText.replace(numEl.textContent.trim(), '').trim()
      : fullText;

    el.innerHTML = numText;

    let i = 0;
    function typeTitle() {
      if (i <= titleOnly.length) {
        el.innerHTML = numText + (numText ? ' ' : '') + titleOnly.slice(0, i);
        i++;
        setTimeout(typeTitle, 150);
      }
    }
    typeTitle();
  });
}, { threshold: 0.5 });

sectionTitles.forEach(el => titleObserver.observe(el));