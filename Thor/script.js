// Thor Cinematic Website - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    
    // Simulate loading time
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);

    // ===== NAVIGATION =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const floatingHammer = document.getElementById('floatingHammer');

    // Toggle mobile navigation
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== 3D MOUSE PARALLAX =====
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Parallax effect on floating hammer
        if (floatingHammer && window.innerWidth > 1024) {
            const moveX = (mouseX - 0.5) * 40;
            const moveY = (mouseY - 0.5) * 40;
            floatingHammer.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
        }
        
        // Parallax effect on weapons cards
        const weaponCards = document.querySelectorAll('.weapon-card');
        weaponCards.forEach(card => {
            if (window.innerWidth > 768) {
                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;
                
                const rotateY = (e.clientX - cardX) / 20;
                const rotateX = (cardY - e.clientY) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    });

    // Reset 3D transforms on mouse leave
    document.addEventListener('mouseleave', () => {
        const weaponCards = document.querySelectorAll('.weapon-card');
        weaponCards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ===== LIGHTNING EFFECTS =====
    const lightningOverlay = document.querySelector('.lightning-overlay');
    const thunderBtn = document.getElementById('thunderBtn');

    // Random lightning flashes
    function triggerLightning() {
        lightningOverlay.style.background = `
            linear-gradient(45deg, 
                transparent 40%, 
                rgba(255, 255, 255, 0.9) 50%, 
                transparent 60%
            )
        `;
        lightningOverlay.style.opacity = '1';
        
        // Play thunder sound if available (commented for browser compatibility)
        // const thunderSound = new Audio('thunder.mp3');
        // thunderSound.volume = 0.3;
        // thunderSound.play();
        
        // Visual effects
        document.body.style.filter = 'brightness(1.5)';
        
        setTimeout(() => {
            lightningOverlay.style.opacity = '0';
            document.body.style.filter = 'brightness(1)';
        }, 100);
        
        setTimeout(() => {
            lightningOverlay.style.background = 'transparent';
        }, 300);
    }

    // Random ambient lightning
    function ambientLightning() {
        if (Math.random() > 0.98) { // Reduced frequency
            triggerLightning();
        }
    }

    // Trigger lightning on button click
    thunderBtn.addEventListener('click', () => {
        triggerLightning();
        // Add button feedback
        thunderBtn.classList.add('active');
        setTimeout(() => {
            thunderBtn.classList.remove('active');
        }, 300);
    });

    // Ambient lightning every 5-10 seconds
    setInterval(ambientLightning, 5000);

    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger lightning when hero section is viewed
                if (entry.target.id === 'hero' && Math.random() > 0.5) {
                    setTimeout(triggerLightning, 500);
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ===== WEAPON MODAL =====
    const weaponModal = document.getElementById('weaponModal');
    const modalWeapon = document.getElementById('modalWeapon');
    const modalTitle = document.getElementById('modalTitle');
    const modalStats = document.getElementById('modalStats');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.getElementById('closeModal');
    const weaponCards = document.querySelectorAll('.weapon-card');

    // Weapon data
    const weaponData = {
        mjolnir: {
            title: 'MJÖLNIR',
            stats: [
                { label: 'POWER', value: 95 },
                { label: 'ENCHANTMENT', value: 100 },
                { label: 'DURABILITY', value: 90 },
                { label: 'WORTHINESS', value: 100 }
            ],
            description: 'Forged by dwarven blacksmiths Eitri, Brokk, and Buri in the heart of a dying star. Mjölnir (pronounced "MYOL-nir") is one of the most powerful weapons in existence, capable of controlling thunder and lightning. The hammer can only be lifted by those who are worthy, as decreed by Odin\'s enchantment.'
        },
        stormbreaker: {
            title: 'STORMBREAKER',
            stats: [
                { label: 'POWER', value: 100 },
                { label: 'BIFRÖST', value: 100 },
                { label: 'CONTROL', value: 85 },
                { label: 'RANGE', value: 95 }
            ],
            description: 'Stormbreaker is an enchanted axe-hammer hybrid created by Eitri in Nidavellir. Designed to be even more powerful than Mjölnir, it grants Thor the ability to summon the Bifröst at will. The weapon channels Thor\'s lightning through its uru metal head and features a handle made from Groot\'s arm.'
        },
        broken: {
            title: 'MJÖLNIR SHATTERED',
            stats: [
                { label: 'POWER', value: 0 },
                { label: 'ENCHANTMENT', value: 40 },
                { label: 'MEMORY', value: 100 },
                { label: 'SIGNIFICANCE', value: 90 }
            ],
            description: 'Shattered by Hela, the Goddess of Death, this event proved that no enchantment is absolute. The destruction of Mjölnir marked a turning point in Thor\'s journey, forcing him to realize that his power comes from within, not from his weapon. The fragments still contain residual magical energy.'
        }
    };

    // Open modal on weapon card click
    weaponCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && e.target.closest('.card-back')) return;
            
            const weaponType = card.dataset.weapon;
            const data = weaponData[weaponType];
            
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            
            // Set weapon image based on type
            modalWeapon.className = 'modal-weapon';
            modalWeapon.classList.add(`${weaponType}-img`);
            
            // Create stats
            modalStats.innerHTML = '';
            data.stats.forEach(stat => {
                const statHTML = `
                    <div class="stat">
                        <span class="stat-label">${stat.label}</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${stat.value}%"></div>
                        </div>
                    </div>
                `;
                modalStats.innerHTML += statHTML;
            });
            
            // Show modal
            weaponModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            triggerLightning();
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        weaponModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal on backdrop click
    weaponModal.addEventListener('click', (e) => {
        if (e.target === weaponModal || e.target.classList.contains('modal-backdrop')) {
            weaponModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== RESPONSIVE IMAGE HANDLING =====
    function handleResponsiveImages() {
        const images = document.querySelectorAll('[data-srcset]');
        
        images.forEach(img => {
            const srcset = img.dataset.srcset.split(',');
            let appropriateSrc = srcset[0];
            
            srcset.forEach(src => {
                const [url, condition] = src.split(' ');
                if (condition && window.matchMedia(condition).matches) {
                    appropriateSrc = url;
                }
            });
            
            img.src = appropriateSrc.trim();
        });
    }

    // Initial load and on resize
    handleResponsiveImages();
    window.addEventListener('resize', handleResponsiveImages);

    // ===== PERFORMANCE OPTIMIZATIONS =====
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Update active nav link based on scroll position
            updateActiveNavLink();
        }, 100);
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (correspondingLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    // Initial call
    updateActiveNavLink();

    // ===== HAMMER INTERACTION =====
    if (floatingHammer) {
        floatingHammer.addEventListener('click', () => {
            triggerLightning();
            
            // Add spinning animation
            floatingHammer.style.animation = 'none';
            floatingHammer.style.transform = 'translateY(-50%) rotate(360deg)';
            
            setTimeout(() => {
                floatingHammer.style.animation = '';
                floatingHammer.style.transform = '';
            }, 1000);
        });
    }

    // ===== TOUCH DEVICE SUPPORT =====
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add tap feedback for cards
        weaponCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.classList.add('touched');
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.classList.remove('touched');
                }, 300);
            });
        });
    }

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        // Close modal on Escape
        if (e.key === 'Escape' && weaponModal.classList.contains('active')) {
            weaponModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Spacebar triggers lightning
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            triggerLightning();
        }
    });

    // ===== INITIAL ANIMATIONS =====
    // Trigger initial lightning after load
    setTimeout(() => {
        triggerLightning();
    }, 2500);

    // Add revealed class to visible elements on load
    const checkVisibility = () => {
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                section.classList.add('revealed');
            }
        });
    };

    window.addEventListener('load', checkVisibility);
});

// ===== UTILITY FUNCTIONS =====
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

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log(`[Performance] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
        }
    });
    
    observer.observe({ entryTypes: ['measure'] });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Uncaught error:', e.error);
});

// ===== PWA FEATURES =====
// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Trigger on user interaction
document.addEventListener('click', requestNotificationPermission, { once: true });