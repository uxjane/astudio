/**
 * Portfolio Interaction Scripts
 * Author: A.Studio Design
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. CASE STUDY PANEL TAB SWITCHING
  const tabButtons = document.querySelectorAll('.cs-tab-btn');
  const panels = document.querySelectorAll('.cs-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active states
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Add active state to clicked button
      btn.classList.add('active');

      // Add active state to matching panel
      const tabId = btn.dataset.tab;
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 2. HAMBURGER AND MOBILE NAVIGATION MENU
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      // Lock scroll when mobile menu is active
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. ANCHOR SCROLL REVEAL INTERSECTION OBSERVER
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.12, 
    rootMargin: '0px 0px -40px 0px' 
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. SKILL BAR ANIMATION TRIGGER
  const skillGroups = document.querySelectorAll('.skill-group');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.classList.add('animated');
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.3 
  });

  skillGroups.forEach(group => skillObserver.observe(group));

  // 5. STATS BANDS COUNT-UP ANIMATION
  const countElements = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.ceil(target / 50);

        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + (target > 10 ? '+' : '');
          if (current >= target) {
            clearInterval(timer);
          }
        }, 30);
        countObserver.unobserve(el);
      }
    });
  }, { 
    threshold: 0.5 
  });

  countElements.forEach(el => countObserver.observe(el));

  // 6. PORTFOLIO FILTERING AND GRID AUTO-LAYOUT ADAPTATION
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');
  const workGrid = document.querySelector('.work-grid-new');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Manage active classes
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      workCards.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.display = '';
          item.style.opacity = '1';
          item.style.pointerEvents = 'auto';
        } else {
          item.style.display = 'none';
        }
      });

      // Recalculate grid spans to prevent blank layouts during filters
      if (workGrid) {
        if (filter === 'all') {
          workGrid.style.gridTemplateColumns = 'repeat(12, 1fr)';
          workCards.forEach(item => {
            item.style.gridColumn = '';
          });
        } else {
          workGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(340px, 1fr))';
          workCards.forEach(item => {
            if (item.style.display !== 'none') {
              item.style.gridColumn = 'span 1';
            }
          });
        }
      }
    });
  });

  // Explicit handler specifically for resetting grid structure when "All" is clicked
  const resetBtn = document.querySelector('[data-filter="all"]');
  if (resetBtn && workGrid) {
    resetBtn.addEventListener('click', () => {
      workGrid.style.gridTemplateColumns = 'repeat(12, 1fr)';
      workCards.forEach(item => {
        item.style.gridColumn = '';
      });
    });
  }

  // 7. NAVIGATION SHADOW/BLUR ON SCROLL
  const navElement = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (navElement) {
      navElement.classList.toggle('scrolled', window.scrollY > 80);
    }
  });

  // 8. CONTACT FORM SUBMISSION VISUAL FEEDBACK
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      const originalText = this.innerHTML;
      this.textContent = 'Message Sent ✓';
      this.style.background = '#2a7a4a';
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = '';
      }, 3000);
    });
  }

});