/* ============================================
   EMAGAZINE - GIAO THÔNG CÔNG CỘNG TP.HCM
   JavaScript
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initCounterAnimations();
  initTrafficLights();
  initTimelineAnimations();
  initJourneyAnimations();
  initSmoothScroll();
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe story content elements
  const storyElements = document.querySelectorAll('.story-content');
  storyElements.forEach(el => observer.observe(el));

  // Observe stat cards for counter animation
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(el => observer.observe(el));
}

/* ============================================
   COUNTER ANIMATIONS
   ============================================ */
function initCounterAnimations() {
  const counterOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.stat-number');
        if (counter && !counter.classList.contains('counted')) {
          animateCounter(counter);
          counter.classList.add('counted');
        }
      }
    });
  }, counterOptions);

  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => counterObserver.observe(card));
}

function animateCounter(element) {
  const text = element.textContent;
  const hasPercent = text.includes('%');
  const hasPlus = text.includes('+');
  const hasK = text.includes('K');
  const hasM = text.includes('M');
  
  // Extract number
  let target = parseFloat(text.replace(/[^0-9.]/g, ''));
  if (isNaN(target)) return;
  
  let current = 0;
  const duration = 2000;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    let displayValue = current;
    
    // Format based on size
    if (hasM) {
      displayValue = current.toFixed(1) + 'M';
    } else if (hasK) {
      displayValue = Math.round(current) + 'K';
    } else if (Number.isInteger(target)) {
      displayValue = Math.round(current).toLocaleString('vi-VN');
    } else {
      displayValue = current.toFixed(1);
    }
    
    // Add prefix/suffix
    if (hasPercent) displayValue += '%';
    if (hasPlus) displayValue = '+' + displayValue;
    
    element.textContent = displayValue;
  }, 16);
}

/* ============================================
   TRAFFIC LIGHT ANIMATIONS
   ============================================ */
function initTrafficLights() {
  const trafficLights = document.querySelectorAll('.traffic-light');
  
  trafficLights.forEach((light, index) => {
    const lights = light.querySelectorAll('.light');
    let currentLight = 0;
    const sequence = [2, 1, 0]; // green, yellow, red
    const durations = [3000, 1000, 3000]; // duration for each light
    
    // Offset each traffic light
    setTimeout(() => {
      cycleLight();
    }, index * 1000);
    
    function cycleLight() {
      // Remove active from all
      lights.forEach(l => l.classList.remove('active'));
      
      // Add active to current
      lights[sequence[currentLight]].classList.add('active');
      
      // Schedule next light
      setTimeout(() => {
        currentLight = (currentLight + 1) % sequence.length;
        cycleLight();
      }, durations[currentLight]);
    }
  });
}

/* ============================================
   TIMELINE ANIMATIONS
   ============================================ */
function initTimelineAnimations() {
  const timelineOptions = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.2
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, timelineOptions);

  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => timelineObserver.observe(item));
}

/* ============================================
   JOURNEY ANIMATIONS
   ============================================ */
function initJourneyAnimations() {
  const journeyOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const steps = entry.target.querySelectorAll('.journey-step');
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.classList.add('visible');
          }, index * 200);
        });
      }
    });
  }, journeyOptions);

  const journeyMap = document.querySelector('.journey-map');
  if (journeyMap) {
    journeyObserver.observe(journeyMap);
  }
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ============================================
   IMAGE GALLERY LIGHTBOX (Optional)
   ============================================ */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  
  galleryItems.forEach(img => {
    img.addEventListener('click', function() {
      openLightbox(this.src, this.alt);
    });
  });
}

function openLightbox(src, alt) {
  // Create lightbox overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Đóng">&times;</button>
      <img src="${src}" alt="${alt}">
    </div>
  `;
  
  // Add styles dynamically
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  `;
  
  const content = overlay.querySelector('.lightbox-content');
  content.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90%;
  `;
  
  const closeBtn = overlay.querySelector('.lightbox-close');
  closeBtn.style.cssText = `
    position: absolute;
    top: -40px;
    right: 0;
    font-size: 2rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
  `;
  
  const lightboxImg = overlay.querySelector('img');
  lightboxImg.style.cssText = `
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // Close on click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target === closeBtn) {
      closeLightbox(overlay);
    }
  });
  
  // Close on Escape
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeLightbox(overlay);
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function closeLightbox(overlay) {
  overlay.remove();
  document.body.style.overflow = '';
}

/* ============================================
   PARALLAX EFFECT (Optional)
   ============================================ */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  });
}

/* ============================================
   NETWORK DIAGRAM ANIMATION
   ============================================ */
function initNetworkAnimation() {
  const nodes = document.querySelectorAll('.network-node');
  
  nodes.forEach((node, index) => {
    // Add staggered animation
    node.style.animationDelay = `${index * 0.2}s`;
  });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for frequent events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add class when scrolled past element
function addScrollClass(element, className) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        element.classList.add(className);
      }
    });
  });
  observer.observe(element);
}

/* ============================================
   INITIALIZATION ON LOAD
   ============================================ */
window.addEventListener('load', function() {
  // Initialize optional features
  initLightbox();
  initNetworkAnimation();
  
  // Add loaded class for any load-dependent animations
  document.body.classList.add('loaded');
});

/* ============================================
   SCROLL PROGRESS INDICATOR (Optional)
   ============================================ */
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #1565c0, #ff9800);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.pageYOffset / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  }, 10));
}

// Uncomment to enable scroll progress
// initScrollProgress();
