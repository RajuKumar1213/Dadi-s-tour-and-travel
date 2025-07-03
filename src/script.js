// Main script file for Vehicle Booking site
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize image carousel
    initImageCarousel();
    
    // Initialize animations
    if (typeof Motion !== 'undefined') {
        console.log('Framer Motion available, initializing animations...');
        initFramerMotionAnimations();
    } else {
        console.log('Framer Motion not available, using fallback animations');
        initFallbackAnimations();
    }
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize button effects
    initButtonEffects();
});

// Mobile Menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLine1 = document.getElementById('hamburger-line-1');
    const hamburgerLine2 = document.getElementById('hamburger-line-2');
    const hamburgerLine3 = document.getElementById('hamburger-line-3');
    
    if (!mobileMenuBtn || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    // Simple toggle function for mobile menu
    function toggleMobileMenu() {
        if (mobileMenu.classList.contains('active')) {
            // Close menu
            mobileMenu.classList.remove('active');
            
            // Reset hamburger icon
            hamburgerLine1.style.transform = 'none';
            hamburgerLine2.style.opacity = '1';
            hamburgerLine3.style.transform = 'none';
        } else {
            // Open menu
            mobileMenu.classList.add('active');
            
            // Transform hamburger to X
            hamburgerLine1.style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgerLine2.style.opacity = '0';
            hamburgerLine3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        }
    }
    
    // Add click event to hamburger button
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMobileMenu();
    });
    
    // Close mobile menu when clicking menu items
    const mobileMenuItems = document.querySelectorAll('#mobile-menu a, #mobile-menu .cursor-pointer, #mobile-menu button');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Close mobile menu on window resize to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

// Framer Motion Animations
function initFramerMotionAnimations() {
    const { animate, stagger } = Motion;
    
    // Animate hero title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        animate("#hero-title", 
            { 
                opacity: [0, 1], 
                y: [50, 0],
                scale: [0.9, 1]
            }, 
            { 
                duration: 1.2, 
                ease: "easeOut",
                delay: 0.3
            }
        );
    }
    
    // Animate hero button
    const heroButton = document.getElementById('hero-button');
    if (heroButton) {
        animate("#hero-button", 
            { 
                opacity: [0, 1], 
                y: [30, 0] 
            }, 
            { 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.8
            }
        );
    }
    
    // Animate stats with stagger effect
    const heroStats = document.getElementById('hero-stats');
    if (heroStats) {
        animate("#hero-stats > div", 
            { 
                opacity: [0, 1], 
                y: [40, 0],
                scale: [0.8, 1]
            }, 
            { 
                duration: 0.6, 
                ease: "easeOut",
                delay: stagger(0.1, { startAfter: 1.2 })
            }
        );
    }
}

// Fallback animations without Framer Motion
function initFallbackAnimations() {
    const heroTitle = document.getElementById('hero-title');
    const heroButton = document.getElementById('hero-button');
    const heroStats = document.getElementById('hero-stats');
    
    if (!heroTitle && !heroButton && !heroStats) {
        console.log('No animation elements found on this page');
        return;
    }
    
    // Set initial styles and animate hero title
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        heroTitle.style.transition = 'all 1.2s ease-out';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate hero button
    if (heroButton) {
        heroButton.style.opacity = '0';
        heroButton.style.transform = 'translateY(30px)';
        heroButton.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            heroButton.style.opacity = '1';
            heroButton.style.transform = 'translateY(0)';
        }, 800);
    }
    
    // Animate hero stats
    if (heroStats) {
        heroStats.style.opacity = '0';
        heroStats.style.transform = 'translateY(40px)';
        heroStats.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
        }, 1200);
    }
}

// Hero Image Carousel
function initImageCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    console.log('Found', slides.length, 'slides for carousel');
    
    if (slides.length === 0) {
        console.log('No slides found in this page');
        return;
    }
    
    // Set initial state - make sure first slide is visible
    slides.forEach((slide, index) => {
        slide.style.transition = 'opacity 1.5s ease-in-out';
        if (index === 0) {
            slide.style.opacity = '1';
            slide.classList.add('active');
        } else {
            slide.style.opacity = '0';
            slide.classList.remove('active');
        }
    });

    function nextSlide() {
        console.log('Transitioning from slide', currentSlide, 'to', (currentSlide + 1) % slides.length);
        
        // Hide current slide
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Show next slide after a brief delay
        setTimeout(() => {
            slides[currentSlide].style.opacity = '1';
            slides[currentSlide].classList.add('active');
        }, 300);
    }

    // Start the carousel
    setInterval(nextSlide, 4000);
    console.log('Image carousel started - changes every 4 seconds');
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scrolling for navigation
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('button');
    
    // Only add fallback effects if Framer Motion is not available
    if (typeof Motion === 'undefined') {
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}


// Form submission handling
const form = document.querySelector("form");
  const submitBtn = document.getElementById("submitBtn");
  const inputs = form.querySelectorAll("input");

  function checkInputsFilled() {
    let allFilled = true;
    inputs.forEach(input => {
      if (input.value.trim() === "") {
        allFilled = false;
      }
    });

    // Toggle button state and style
    if (allFilled) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("bg-sky-400", "cursor-not-allowed");
      submitBtn.classList.add("bg-sky-500", "hover:bg-sky-600");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.add("bg-sky-400", "cursor-not-allowed");
      submitBtn.classList.remove("bg-sky-500", "hover:bg-sky-600");
    }
  }

  // Attach input listener to all fields
  inputs.forEach(input => {
    input.addEventListener("input", checkInputsFilled);
  });

  // Run check on page load (in case browser autofills)
  window.addEventListener("DOMContentLoaded", checkInputsFilled);