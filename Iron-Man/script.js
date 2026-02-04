// Stark Industries Iron Man Interface - Main JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initHero3DEffects();
    init3DCards();
    initSuitGallery();
    initPowerStats();
    initTeamCards();
    initModal();
    initScrollAnimations();
    initMouseTiltEffects();
    
    console.log('Stark Industries Interface Initialized ✅');
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loadingChars = document.querySelectorAll('.loading-char');
    
    // Add index to each character for staggered animation
    loadingChars.forEach((char, index) => {
        char.style.setProperty('--char-index', index);
    });
    
    // Simulate loading
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Remove from DOM after animation
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 2500);
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    // Toggle mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile nav when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 18, 0.95)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 18, 0.8)';
        }
    });
}

// Hero 3D Effects
function initHero3DEffects() {
    const hero3d = document.getElementById('hero3d');
    const ironManModel = document.getElementById('ironManModel');
    const arcReactor = document.getElementById('arcReactor');
    const heroBtn = document.getElementById('heroBtn');
    
    // Mouse move 3D tilt effect
    if (hero3d) {
        document.addEventListener('mousemove', (e) => {
            // Calculate mouse position as percentage
            const xPos = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const yPos = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
            
            // Apply 3D rotation to hero container
            hero3d.style.transform = `
                perspective(1000px)
                rotateY(${xPos * 5}deg)
                rotateX(${-yPos * 3}deg)
                translateZ(0)
            `;
            
            // Parallax effect for Iron Man model
            if (ironManModel) {
                ironManModel.style.transform = `
                    translateX(${xPos * 20}px)
                    translateY(${yPos * 20}px)
                    translateZ(${50 + Math.abs(xPos * 20)}px)
                `;
            }
            
            // Enhanced parallax for HUD elements
            const hudElements = document.querySelectorAll('.hud-element');
            hudElements.forEach((hud, index) => {
                const depth = 20 + (index * 10);
                hud.style.transform = `
                    translateX(${xPos * depth}px)
                    translateY(${yPos * depth}px)
                    translateZ(${depth}px)
                `;
            });
        });
    }
    
    // Arc reactor pulsing animation
    if (arcReactor) {
        // Create additional rings for more complexity
        for (let i = 0; i < 2; i++) {
            const ring = document.createElement('div');
            ring.className = 'reactor-ring';
            ring.style.width = `${60 + i * 40}px`;
            ring.style.height = `${60 + i * 40}px`;
            ring.style.animationDuration = `${10 + i * 3}s`;
            ring.style.animationDirection = i % 2 === 0 ? 'normal' : 'reverse';
            arcReactor.appendChild(ring);
        }
    }
    
    // Hero button 3D press effect
    if (heroBtn) {
        heroBtn.addEventListener('mousedown', () => {
            heroBtn.style.transform = 'translateY(5px) translateZ(10px)';
            heroBtn.style.boxShadow = '0 5px 15px rgba(177, 18, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        });
        
        heroBtn.addEventListener('mouseup', () => {
            heroBtn.style.transform = 'translateY(0) translateZ(20px)';
            heroBtn.style.boxShadow = '0 10px 20px rgba(177, 18, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        });
        
        heroBtn.addEventListener('click', () => {
            // Create a pulse effect
            const pulse = document.createElement('div');
            pulse.style.position = 'fixed';
            pulse.style.top = '50%';
            pulse.style.left = '50%';
            pulse.style.width = '10px';
            pulse.style.height = '10px';
            pulse.style.borderRadius = '50%';
            pulse.style.backgroundColor = 'var(--iron-red)';
            pulse.style.transform = 'translate(-50%, -50%) scale(0)';
            pulse.style.boxShadow = '0 0 0 0 rgba(177, 18, 38, 0.7)';
            pulse.style.zIndex = '9999';
            pulse.style.pointerEvents = 'none';
            document.body.appendChild(pulse);
            
            // Animate the pulse
            setTimeout(() => {
                pulse.style.transition = 'all 0.5s ease-out';
                pulse.style.transform = 'translate(-50%, -50%) scale(30)';
                pulse.style.boxShadow = '0 0 0 20px rgba(177, 18, 38, 0)';
                pulse.style.opacity = '0';
            }, 10);
            
            // Remove pulse after animation
            setTimeout(() => {
                pulse.remove();
            }, 600);
            
            // Play suit activation sound (simulated)
            console.log('Suit activation sequence initiated...');
        });
    }
}

// 3D Cards for About Section
function init3DCards() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        // Enhanced hover effect with tilt
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
}

// Suit Gallery
function initSuitGallery() {
    const suitCards = document.querySelectorAll('.suit-card');
    const suitDetailsBtns = document.querySelectorAll('.suit-details-btn');
    const suitModal = document.getElementById('suitModal');
    
    // 3D hover effect for suit cards
    suitCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 15;
            const rotateX = ((centerY - y) / centerY) * 10;
            
            card.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(30px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
    
    // Suit details button click - open modal with suit data
    suitDetailsBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card flip
            
            const suitCard = btn.closest('.suit-card');
            const suitType = suitCard.getAttribute('data-suit');
            
            openSuitModal(suitType);
        });
    });
    
    // Also allow clicking the entire suit card to open modal
    suitCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only trigger if not clicking the details button
            if (!e.target.closest('.suit-details-btn')) {
                const suitType = card.getAttribute('data-suit');
                openSuitModal(suitType);
            }
        });
    });
    
    // Suit data for modal
    const suitData = {
        mark1: {
            name: 'MARK I ARMOR',
            year: '2008 • ORIGINAL PROTOTYPE',
            material: 'Steel Alloy',
            power: 'Arc Reactor V1.0',
            weapons: 'Flamethrowers, Missiles',
            flight: 'Limited (Jet Boots)',
            ai: 'Basic Systems',
            construction: 'Hand-built in cave',
            description: 'The Mark I was the first Iron Man suit, built by Tony Stark and Ho Yinsen while captive in a terrorist camp. Constructed from scrap metal and weapons parts, it was designed as a means of escape and laid the foundation for all future armor iterations.'
        },
        mark3: {
            name: 'MARK III ARMOR',
            year: '2008 • CLASSIC DESIGN',
            material: 'Gold-Titanium Alloy',
            power: 'Arc Reactor V2.0',
            weapons: 'Repulsors, Missiles, Flares',
            flight: 'Full Capability',
            ai: 'J.A.R.V.I.S. Integrated',
            construction: 'Automated Assembly',
            description: 'The Mark III was the first suit to feature the iconic red and gold color scheme. It introduced many of the signature Iron Man features including advanced flight systems, integrated AI, and repulsor technology.'
        },
        mark7: {
            name: 'MARK VII ARMOR',
            year: '2012 • AVENGERS SUIT',
            material: 'Advanced Titanium Alloy',
            power: 'Arc Reactor V4.0',
            weapons: 'Repulsors, Lasers, Missile Array',
            flight: 'Supersonic + Space Capable',
            ai: 'Enhanced J.A.R.V.I.S.',
            construction: 'Autonomous Deployment',
            description: 'The Mark VII featured autonomous deployment and assembly, allowing Stark to summon the suit mid-air. It played a crucial role in the Battle of New York against the Chitauri invasion and included space survival capabilities.'
        },
        mark50: {
            name: 'MARK L ARMOR',
            year: '2018 • NANOTECH SUIT',
            material: 'Nanotechnology',
            power: 'Arc Reactor V5.0',
            weapons: 'Repulsors, Nanotech Weapons',
            flight: 'Advanced Maneuverability',
            ai: 'F.R.I.D.A.Y.',
            construction: 'Instant Deployment',
            description: 'The Mark L (50) utilized nanotechnology for instant deployment and shape-shifting capabilities. It represented the peak of Stark\'s armor technology, capable of forming various weapons and shields on demand during combat.'
        }
    };
    
    // Function to open modal with suit data
    function openSuitModal(suitType) {
        const suit = suitData[suitType];
        if (!suit) return;
        
        // Update modal content
        document.getElementById('modalSuitName').textContent = suit.name;
        document.getElementById('modalSuitYear').textContent = suit.year;
        document.getElementById('detailMaterial').textContent = suit.material;
        document.getElementById('detailPower').textContent = suit.power;
        document.getElementById('detailWeapons').textContent = suit.weapons;
        document.getElementById('detailFlight').textContent = suit.flight;
        document.getElementById('detailAI').textContent = suit.ai;
        document.getElementById('detailConstruction').textContent = suit.construction;
        document.getElementById('modalDescription').textContent = suit.description;
        
        // Update modal image based on suit
        const modalImage = document.getElementById('modalSuitImage');
        modalImage.className = 'modal-image';
        modalImage.classList.add(`suit-${suitType.replace('mark', '')}`);
        
        // Open modal with 3D effect
        suitModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Power Stats Animation
function initPowerStats() {
    const statProgressBars = document.querySelectorAll('.stat-progress');
    const statGlows = document.querySelectorAll('.stat-glow');
    
    // Animate progress bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progressValue = progressBar.getAttribute('data-progress');
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = `${progressValue}%`;
                }, 300);
                
                // Animate the glow effect with delay
                const glow = progressBar.nextElementSibling;
                if (glow && glow.classList.contains('stat-glow')) {
                    setTimeout(() => {
                        glow.style.width = `${progressValue}%`;
                    }, 600);
                }
                
                // Stop observing after animation
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe each progress bar
    statProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Team Cards
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        // 3D hover effect for team cards
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
}

// Modal System
function initModal() {
    const suitModal = document.getElementById('suitModal');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    // Close modal on close button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal on backdrop click
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && suitModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        suitModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card-3d, .stat-panel, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Mouse Tilt Effects for Other Elements
function initMouseTiltEffects() {
    // Apply subtle tilt to various elements on mouse move
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply to footer logo
        const footerLogoGlow = document.querySelector('.footer-logo-glow');
        if (footerLogoGlow) {
            footerLogoGlow.style.transform = `
                translateX(${(mouseX - 0.5) * 10}px)
                translateY(${(mouseY - 0.5) * 10}px)
            `;
        }
        
        // Apply to section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const titleCenterX = rect.left + rect.width / 2;
            const titleCenterY = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - titleCenterX;
            const distanceY = e.clientY - titleCenterY;
            
            const intensity = 0.5;
            const rotateY = (distanceX / window.innerWidth) * 10 * intensity;
            const rotateX = -(distanceY / window.innerHeight) * 10 * intensity;
            
            title.style.transform = `
                perspective(500px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });
    });
    
    // Reset transformations when mouse leaves window
    document.addEventListener('mouseleave', () => {
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
        });
        
        const footerLogoGlow = document.querySelector('.footer-logo-glow');
        if (footerLogoGlow) {
            footerLogoGlow.style.transform = 'translateX(0) translateY(0)';
        }
    });
}

// Responsive adjustments
window.addEventListener('resize', function() {
    // Reset transformations on resize
    const hero3d = document.getElementById('hero3d');
    if (hero3d) {
        hero3d.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
    }
});

// Add some interactive console logging for fun
console.log('%c Stark Industries Interface v1.0 ', 'background: #b11226; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c "Sometimes you gotta run before you can walk." - Tony Stark ', 'color: #f5c542; font-size: 14px; font-style: italic;');