/* ============================================
   Particle Background System
   ============================================ */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 100;
    this.maxDistance = 150;
    
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, 1)`;
      this.ctx.fill();
      
      // Draw connections
      this.particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.maxDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          const opacity = (1 - distance / this.maxDistance) * 0.05;
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

/* ============================================
   Smooth Scroll & Navigation
   ============================================ */

/* ============================================
   Portfolio Filter
   ============================================ */

class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (this.filterButtons.length === 0) return;
    
    this.init();
  }
  
  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items - only change display/opacity, never background colors
        this.portfolioItems.forEach(item => {
          const category = item.dataset.category;
          
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

/* ============================================
   Contact Form Handler
   ============================================ */

class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    if (!this.form) return;
    
    this.init();
  }
  
  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      // For now, we'll just show an alert
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.form.reset();
    });
  }
}

/* ============================================
   Smooth Scroll & Navigation
   ============================================ */

class Navigation {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-links a');
    this.sections = document.querySelectorAll('section[id]');
    
    this.init();
  }
  
  init() {
    // Handle smooth scrolling for anchor links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle anchor links (starting with #)
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Update active nav link based on scroll position
    this.updateActiveNav();
    window.addEventListener('scroll', () => this.updateActiveNav());
  }
  
  updateActiveNav() {
    const scrollPosition = window.scrollY + 150; // Offset for nav height
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        this.navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
    
    // Handle hero section (at top of page)
    if (window.scrollY < 100) {
      this.navLinks.forEach(link => {
        link.classList.remove('active');
      });
      const heroLink = document.querySelector('.nav-links a[href="#hero"]');
      if (heroLink) {
        heroLink.classList.add('active');
      }
    }
  }
}

/* ============================================
   Initialize Everything
   ============================================ */

/* ============================================
   Tech Stack Marquee
   ============================================ */

class TechMarquee {
  constructor() {
    this.marqueeTracks = document.querySelectorAll('.marquee-track');
    if (this.marqueeTracks.length === 0) return;
    
    this.init();
  }
  
  init() {
    // Duplicate items in each track to ensure full coverage (30-40 items per row)
    this.marqueeTracks.forEach(track => {
      const items = track.querySelectorAll('.marquee-item');
      const originalItems = Array.from(items);
      
      // We need 30-40 items total, so duplicate 6-8 times (5 items * 6-8 = 30-40)
      // Since HTML already has some duplicates, we'll add more to reach target
      const targetCount = 35;
      const currentCount = originalItems.length;
      const duplicatesNeeded = Math.ceil(targetCount / currentCount);
      
      // Clone the entire set multiple times
      for (let i = 0; i < duplicatesNeeded; i++) {
        originalItems.forEach(item => {
          const clone = item.cloneNode(true);
          track.appendChild(clone);
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize particle system
  new ParticleSystem('particle-canvas');
  
  // Initialize tech marquee
  new TechMarquee();
  
  // Initialize portfolio filter
  new PortfolioFilter();
  
  // Initialize contact form
  new ContactForm();
  
  // Initialize navigation
  new Navigation();
  
  // Add fade-in animations to elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.skill-card, .portfolio-item, .contact-card').forEach(el => {
    observer.observe(el);
  });
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
      nav.classList.add("scrolled");
  } else {
      nav.classList.remove("scrolled");
  }
});

function initInfiniteSlider() {

    // ถ้าเป็นมือถือ → ไม่ต้องใช้ marquee
    if (window.innerWidth < 768) {
        console.log("Mobile detected — marquee disabled");
        return;
    }

    const track = document.querySelector(".slider-track");
    const slides = Array.from(track.children);
    
    let totalWidth = 0;

    slides.slice(0, slides.length / 2).forEach(img => {
        totalWidth += img.getBoundingClientRect().width + 32;
    });

    let pos = 0;
    let paused = false;

    function animate() {
        if (!paused) {
            pos -= 1.2;
            if (Math.abs(pos) >= totalWidth) pos = 0;
            track.style.transform = `translateX(${pos}px)`;
        }
        requestAnimationFrame(animate);
    }

    track.parentElement.addEventListener("mouseenter", () => paused = true);
    track.parentElement.addEventListener("mouseleave", () => paused = false);

    animate();
}




initInfiniteSlider();

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.style.display = "flex";
    }

    function closeLightbox() {
        lightbox.style.display = "none";
    }

    // คลิกจาก slider
    document.querySelectorAll(".slider-track img").forEach(img => {
        img.addEventListener("click", () => openLightbox(img.src));
    });

    // คลิกจาก single-image
    document.querySelectorAll(".single-image img").forEach(img => {
        img.addEventListener("click", () => openLightbox(img.src));
    });

    // ปิดเมื่อคลิกพื้นที่มืดหลังภาพ (เฉพาะ background เท่านั้น)
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    closeBtn.addEventListener("click", closeLightbox);
});

const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

document.addEventListener("DOMContentLoaded", () => {
  const orbit = document.querySelector(".hero-orbit");
  const icons = document.querySelectorAll(".orbit-icon");

  const size = orbit.offsetWidth;
  const center = size / 2;
  const radius = center - 1;  // เส้นวงล้วน ๆ ไม่มีลด

  icons.forEach((icon, i) => {
      const total = icons.length;
      const angle = (i / total) * Math.PI * 2;

      const iconW = icon.offsetWidth;
      const iconH = icon.offsetHeight;

      // ตำแหน่งใหม่ — ไอคอนตรงบนเส้นเป๊ะ
      const x = Math.cos(angle) * radius + center - iconW / 2;
      const y = Math.sin(angle) * radius + center - iconH / 2;

      icon.style.left = `${x}px`;
      icon.style.top = `${y}px`;

      // หมุนเข้าหาศูนย์กลาง
      const deg = (angle * 180 / Math.PI) + 90;
      icon.style.transform = `rotate(${deg}deg)`;
  });
});

const subtitleWords = [
  "UX/UI Designer",
  "Visual Designer",
  "3D Artist",
  "Product Designer",
  "Creative Developer"
];

let index = 0;

function rotateSubtitle() {
    const el = document.getElementById("dynamic-text");
    el.style.opacity = 0;

    setTimeout(() => {
        el.innerText = subtitleWords[index];
        el.style.opacity = 1;
        index = (index + 1) % subtitleWords.length;
    }, 400);
}

setInterval(rotateSubtitle, 2500);
rotateSubtitle();
