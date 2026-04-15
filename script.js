document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor functionality
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Only run cursor on non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Adding a slight delay to follower for smooth effect
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Add hovering effect to links and buttons
        const hoverElements = document.querySelectorAll('a, button, .card, .package-card, .gallery-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
                follower.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
                follower.classList.remove('hovering');
            });
        });
    }

    // Theme toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Check saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
        
        // Add click animation
        themeBtn.style.transform = 'scale(0.9)';
        setTimeout(() => themeBtn.style.transform = 'scale(1)', 150);
    });

    // Parallax effect
    const parallaxEl = document.querySelector('.parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Hero Parallax
        if (parallaxEl && scrolled < window.innerHeight) {
            parallaxEl.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
        // Sticky Navbar
        const nav = document.querySelector('.navbar');
        if (scrolled > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        scrollObserver.observe(el);
    });

    // Counter Animation
    const animateCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const duration = 2000;
        let current = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if(target >= 10000) {
                    el.innerText = Math.ceil(current/1000) + 'k+';
                } else {
                    el.innerText = Math.ceil(current) + '+';
                }
                requestAnimationFrame(updateCounter);
            } else {
                if(target >= 10000) {
                    el.innerText = (target/1000) + 'k+';
                } else {
                    el.innerText = target + '+';
                }
            }
        };
        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.counter').forEach(el => {
        counterObserver.observe(el);
    });

    // Gallery Slider
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainSlide = document.getElementById('current-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    if (thumbnails.length > 0 && mainSlide) {
        let currentIndex = 0;
        
        const updateSlide = (index) => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[index].classList.add('active');
            
            mainSlide.style.opacity = '0.5';
            setTimeout(() => {
                mainSlide.src = thumbnails[index].src;
                mainSlide.style.opacity = '1';
            }, 150);
            
            currentIndex = index;
        };

        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                updateSlide(index);
            });
        });

        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if(newIndex < 0) newIndex = thumbnails.length - 1;
            updateSlide(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if(newIndex >= thumbnails.length) newIndex = 0;
            updateSlide(newIndex);
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});
