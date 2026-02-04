// Avengers Data
const avengersData = [
    {
        id: 1,
        name: "Iron Man",
        alias: "Tony Stark",
        actor: "Robert Downey Jr.",
        movie: "Iron Man (2008)",
        description: "Genius, billionaire, playboy, philanthropist. Tony Stark created the Iron Man armor to escape captivity and later used his technology to protect the world as a founding member of the Avengers.",
        quote: "I am Iron Man.",
        category: "original",
        color: "#ED1C24",
        stats: {
            intelligence: 100,
            strength: 85,
            speed: 60,
            durability: 90,
            energy: 95,
            fighting: 75
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/85.jpg"
    },
    {
        id: 2,
        name: "Captain America",
        alias: "Steve Rogers",
        actor: "Chris Evans",
        movie: "Captain America: The First Avenger (2011)",
        description: "A super-soldier from World War II who was frozen in ice and revived in the modern era. He carries an indestructible vibranium shield and serves as the moral compass of the Avengers.",
        quote: "I can do this all day.",
        category: "original",
        color: "#3D4B9F",
        stats: {
            intelligence: 75,
            strength: 80,
            speed: 65,
            durability: 85,
            energy: 20,
            fighting: 95
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/274.jpg"
    },
    {
        id: 3,
        name: "Thor",
        alias: "God of Thunder",
        actor: "Chris Hemsworth",
        movie: "Thor (2011)",
        description: "The Asgardian god of thunder who wields the enchanted hammer Mjolnir (and later Stormbreaker). He possesses superhuman strength, durability, and the ability to control lightning.",
        quote: "Bring me Thanos!",
        category: "original",
        color: "#7A6A56",
        stats: {
            intelligence: 70,
            strength: 100,
            speed: 85,
            durability: 95,
            energy: 100,
            fighting: 90
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/140.jpg"
    },
    {
        id: 4,
        name: "Hulk",
        alias: "Bruce Banner",
        actor: "Mark Ruffalo",
        movie: "The Incredible Hulk (2008)",
        description: "When angered, physicist Bruce Banner transforms into the Hulk, a giant green behemoth with immense strength that increases with his rage. He is a founding member of the Avengers.",
        quote: "That's my secret, Captain. I'm always angry.",
        category: "original",
        color: "#5A7D37",
        stats: {
            intelligence: 90,
            strength: 100,
            speed: 70,
            durability: 100,
            energy: 85,
            fighting: 85
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/83.jpg"
    },
    {
        id: 5,
        name: "Black Widow",
        alias: "Natasha Romanoff",
        actor: "Scarlett Johansson",
        movie: "Iron Man 2 (2010)",
        description: "A highly trained spy and assassin who defected from the KGB to S.H.I.E.L.D. She is a master of martial arts, espionage, and interrogation, with no superhuman abilities.",
        quote: "I'm in the middle of an interrogation, this moron is giving me everything.",
        category: "original",
        color: "#1A1A1A",
        stats: {
            intelligence: 85,
            strength: 15,
            speed: 30,
            durability: 25,
            energy: 20,
            fighting: 95
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/70.jpg"
    },
    {
        id: 6,
        name: "Hawkeye",
        alias: "Clint Barton",
        actor: "Jeremy Renner",
        movie: "Thor (2011)",
        description: "A master archer with near-perfect accuracy. He is a former S.H.I.E.L.D. agent who joined the Avengers despite having no superhuman abilities.",
        quote: "The city is flying and we're fighting an army of robots. And I have a bow and arrow. None of this makes sense.",
        category: "original",
        color: "#5C2D91",
        stats: {
            intelligence: 70,
            strength: 15,
            speed: 25,
            durability: 15,
            energy: 20,
            fighting: 85
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/73.jpg"
    },
    {
        id: 7,
        name: "Black Panther",
        alias: "T'Challa",
        actor: "Chadwick Boseman",
        movie: "Captain America: Civil War (2016)",
        description: "King of Wakanda who gains enhanced strength, speed, and senses from the heart-shaped herb. His suit is made of vibranium, making him nearly indestructible.",
        quote: "Wakanda forever!",
        category: "new",
        color: "#000000",
        stats: {
            intelligence: 90,
            strength: 80,
            speed: 75,
            durability: 90,
            energy: 70,
            fighting: 95
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/247.jpg"
    },
    {
        id: 8,
        name: "Spider-Man",
        alias: "Peter Parker",
        actor: "Tom Holland",
        movie: "Captain America: Civil War (2016)",
        description: "A teenager from Queens who gained spider-like abilities after being bitten by a radioactive spider. He fights crime with his web-shooters and superhuman agility.",
        quote: "With great power comes great responsibility.",
        category: "new",
        color: "#B11313",
        stats: {
            intelligence: 90,
            strength: 55,
            speed: 70,
            durability: 65,
            energy: 60,
            fighting: 85
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/133.jpg"
    },
    {
        id: 9,
        name: "Doctor Strange",
        alias: "Stephen Strange",
        actor: "Benedict Cumberbatch",
        movie: "Doctor Strange (2016)",
        description: "A former neurosurgeon who becomes the Sorcerer Supreme, protecting Earth from magical and mystical threats using spells, artifacts, and mastery of the mystic arts.",
        quote: "We're in the endgame now.",
        category: "new",
        color: "#8A2BE2",
        stats: {
            intelligence: 95,
            strength: 15,
            speed: 30,
            durability: 70,
            energy: 100,
            fighting: 75
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/32.jpg"
    },
    {
        id: 10,
        name: "Captain Marvel",
        alias: "Carol Danvers",
        actor: "Brie Larson",
        movie: "Captain Marvel (2019)",
        description: "A former U.S. Air Force pilot who gained cosmic powers after an accident involving an alien device. She can absorb and manipulate energy, fly at light speed, and shoot energy blasts.",
        quote: "I have nothing to prove to you.",
        category: "new",
        color: "#FFBF00",
        stats: {
            intelligence: 70,
            strength: 95,
            speed: 100,
            durability: 95,
            energy: 100,
            fighting: 80
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/156.jpg"
    },
    {
        id: 11,
        name: "Scarlet Witch",
        alias: "Wanda Maximoff",
        actor: "Elizabeth Olsen",
        movie: "Avengers: Age of Ultron (2015)",
        description: "A Sokovian refugee who gained reality-altering powers from the Mind Stone. She can manipulate probability, energy, and matter with her chaos magic.",
        quote: "You took everything from me.",
        category: "new",
        color: "#C32148",
        stats: {
            intelligence: 90,
            strength: 85,
            speed: 70,
            durability: 85,
            energy: 100,
            fighting: 80
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/444.jpg"
    },
    {
        id: 12,
        name: "Thanos",
        alias: "The Mad Titan",
        actor: "Josh Brolin",
        movie: "Avengers: Infinity War (2018)",
        description: "A powerful warlord from Titan who seeks to collect all six Infinity Stones to wipe out half of all life in the universe, believing it to be the only way to save it from overpopulation.",
        quote: "I am inevitable.",
        category: "villains",
        color: "#6A0D91",
        stats: {
            intelligence: 95,
            strength: 100,
            speed: 45,
            durability: 100,
            energy: 100,
            fighting: 90
        },
        image: "https://www.superherodb.com/pictures2/portraits/10/100/130.jpg"
    }
];

// Global Variables
let currentView = 'grid';
let current3DAngle = 0;
let current3DIndex = 0;
let is3DActive = false;
let isSoundOn = true;
let isRotating = false;
let carouselPosition = 0;
let favorites = JSON.parse(localStorage.getItem('avengersFavorites')) || [];
let filteredAvengers = [...avengersData];

// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const loadingProgress = document.querySelector('.loading-progress');
const gallery3D = document.getElementById('gallery3D');
const galleryGrid = document.getElementById('galleryGrid');
const galleryCarousel = document.getElementById('galleryCarousel');
const gallery3DScene = document.querySelector('.gallery-3d-scene');
const galleryGridContainer = document.querySelector('.gallery-grid');
const carouselTrack = document.querySelector('.carousel-track');
const heroModal = document.getElementById('heroModal');
const searchInput = document.getElementById('searchInput');
const toggle3DBtn = document.getElementById('toggle3D');
const toggleSoundBtn = document.getElementById('toggleSound');
const viewOptions = document.querySelectorAll('.view-option');
const navLinks = document.querySelectorAll('.nav-link');
const heroSound = document.getElementById('heroSound');
const bgMusic = document.getElementById('bgMusic');

// Initialize the application
function init() {
    // Simulate loading progress
    simulateLoading();
    
    // Load initial data
    renderAllViews();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize audio
    if (isSoundOn) {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
    }
}

// Simulate loading progress
function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Animate in content
                document.querySelectorAll('.main-header, .intro-section, .gallery-controls').forEach((el, i) => {
                    setTimeout(() => {
                        el.style.animation = 'fadeIn 0.8s forwards';
                        el.style.opacity = '0';
                    }, i * 200);
                });
            }, 500);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 100);
}

// Render all gallery views
function renderAllViews() {
    renderGridView();
    render3DView();
    renderCarouselView();
}

// Render grid view
function renderGridView() {
    galleryGridContainer.innerHTML = '';
    
    filteredAvengers.forEach(hero => {
        const isFavorite = favorites.includes(hero.id);
        const heroElement = document.createElement('div');
        heroElement.className = 'grid-item';
        heroElement.dataset.id = hero.id;
        heroElement.style.borderTop = `5px solid ${hero.color}`;
        
        heroElement.innerHTML = `
            <div class="grid-image">
                <img src="${hero.image}" alt="${hero.name}" loading="lazy">
            </div>
            <div class="grid-content">
                <h3>${hero.name}</h3>
                <p>${hero.alias}</p>
                <div class="grid-meta">
                    <span class="hero-type" style="background: ${hero.color}20; color: ${hero.color}">${hero.category.toUpperCase()}</span>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${hero.id}">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        galleryGridContainer.appendChild(heroElement);
    });
    
    // Add click events to grid items
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-btn')) {
                const heroId = parseInt(item.dataset.id);
                showHeroModal(heroId);
                playSound();
            }
        });
    });
    
    // Add click events to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const heroId = parseInt(btn.dataset.id);
            toggleFavorite(heroId);
        });
    });
}

// Render 3D view
function render3DView() {
    gallery3DScene.innerHTML = '';
    
    const totalItems = filteredAvengers.length;
    const angleStep = 360 / totalItems;
    
    filteredAvengers.forEach((hero, index) => {
        const angle = angleStep * index;
        const heroElement = document.createElement('div');
        heroElement.className = 'gallery-3d-item';
        heroElement.dataset.id = hero.id;
        heroElement.dataset.index = index;
        
        // Calculate 3D position
        const radius = 600; // Distance from center
        const x = radius * Math.cos(angle * Math.PI / 180);
        const z = radius * Math.sin(angle * Math.PI / 180);
        
        heroElement.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        heroElement.style.opacity = '1';
        
        heroElement.innerHTML = `
            <img src="${hero.image}" alt="${hero.name}">
            <div class="gallery-3d-item-content" style="background: linear-gradient(transparent, ${hero.color}80)">
                <h3>${hero.name}</h3>
                <p>${hero.alias}</p>
            </div>
        `;
        
        gallery3DScene.appendChild(heroElement);
        
        // Add click event
        heroElement.addEventListener('click', () => {
            showHeroModal(hero.id);
            playSound();
        });
    });
    
    // Update 3D rotation based on current angle
    update3DRotation();
}

// Render carousel view
function renderCarouselView() {
    carouselTrack.innerHTML = '';
    
    filteredAvengers.forEach(hero => {
        const heroElement = document.createElement('div');
        heroElement.className = 'carousel-item';
        heroElement.dataset.id = hero.id;
        heroElement.style.borderTop = `5px solid ${hero.color}`;
        
        heroElement.innerHTML = `
            <div class="carousel-image">
                <img src="${hero.image}" alt="${hero.name}" loading="lazy">
            </div>
            <div class="carousel-content">
                <h3>${hero.name}</h3>
                <p>${hero.alias} - ${hero.movie}</p>
            </div>
        `;
        
        carouselTrack.appendChild(heroElement);
    });
    
    // Set carousel width
    const itemWidth = 300 + 32; // 300px width + 2rem gap
    carouselTrack.style.width = `${filteredAvengers.length * itemWidth}px`;
    
    // Add click events
    document.querySelectorAll('.carousel-item').forEach(item => {
        item.addEventListener('click', () => {
            const heroId = parseInt(item.dataset.id);
            showHeroModal(heroId);
            playSound();
        });
    });
    
    // Reset carousel position
    carouselPosition = 0;
    updateCarouselPosition();
}

// Update 3D rotation
function update3DRotation() {
    if (is3DActive) {
        gallery3DScene.style.transform = `rotateY(${current3DAngle}deg)`;
    }
}

// Update carousel position
function updateCarouselPosition() {
    carouselTrack.style.transform = `translateX(${carouselPosition}px)`;
}

// Show hero modal
function showHeroModal(heroId) {
    const hero = avengersData.find(h => h.id === heroId);
    if (!hero) return;
    
    // Update modal content
    document.getElementById('modalHeroName').textContent = hero.name;
    document.getElementById('modalHeroAlias').textContent = hero.alias;
    document.getElementById('modalHeroMovie').textContent = hero.movie;
    document.getElementById('modalHeroActor').textContent = `Played by ${hero.actor}`;
    document.getElementById('modalHeroDescription').textContent = hero.description;
    document.getElementById('modalHeroQuote').textContent = hero.quote;
    
    // Set hero image
    const modalImageContainer = document.querySelector('.modal-image-container');
    modalImageContainer.style.backgroundImage = `url('${hero.image}')`;
    
    // Set hero badge
    const heroBadge = document.getElementById('heroBadge');
    heroBadge.textContent = hero.category.toUpperCase();
    heroBadge.style.backgroundColor = hero.color;
    
    // Update stats
    const statsBars = document.querySelector('.stats-bars');
    statsBars.innerHTML = '';
    
    for (const [stat, value] of Object.entries(hero.stats)) {
        const statBar = document.createElement('div');
        statBar.className = 'stat-bar';
        
        const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
        const barWidth = value;
        
        statBar.innerHTML = `
            <div class="stat-label">${statName}</div>
            <div class="stat-progress">
                <div class="stat-value" style="width: ${barWidth}%; background: ${hero.color};"></div>
            </div>
            <div class="stat-number">${value}</div>
        `;
        
        statsBars.appendChild(statBar);
    }
    
    // Update favorite button state
    const isFavorite = favorites.includes(hero.id);
    const favoriteBtn = document.querySelector('.modal-content .favorite-btn');
    favoriteBtn.dataset.id = hero.id;
    favoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> ${isFavorite ? 'Favorited' : 'Favorite'}`;
    
    // Show modal
    heroModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close hero modal
function closeHeroModal() {
    heroModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Toggle favorite
function toggleFavorite(heroId) {
    const index = favorites.indexOf(heroId);
    
    if (index === -1) {
        favorites.push(heroId);
    } else {
        favorites.splice(index, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('avengersFavorites', JSON.stringify(favorites));
    
    // Update UI
    renderGridView();
    
    // If modal is open for this hero, update its button too
    const modalFavoriteBtn = document.querySelector('.modal-content .favorite-btn');
    if (modalFavoriteBtn && parseInt(modalFavoriteBtn.dataset.id) === heroId) {
        const isFavorite = favorites.includes(heroId);
        modalFavoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> ${isFavorite ? 'Favorited' : 'Favorite'}`;
    }
    
    // Visual feedback
    const heartIcon = document.querySelector(`.favorite-btn[data-id="${heroId}"] i`);
    if (heartIcon) {
        heartIcon.style.transform = 'scale(1.5)';
        setTimeout(() => {
            heartIcon.style.transform = 'scale(1)';
        }, 300);
    }
    
    playSound();
}

// Play sound effect
function playSound() {
    if (!isSoundOn) return;
    
    heroSound.currentTime = 0;
    heroSound.play().catch(e => console.log("Sound play prevented:", e));
}

// Toggle 3D view
function toggle3DView() {
    is3DActive = !is3DActive;
    toggle3DBtn.innerHTML = `<i class="fas fa-cube"></i> ${is3DActive ? '2D View' : '3D View'}`;
    
    if (is3DActive) {
        // Switch to 3D view
        document.querySelectorAll('.view-option').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.view-option[data-view="3d"]').classList.add('active');
        switchView('3d');
        
        // Start auto-rotation
        startAutoRotation();
    } else {
        // Stop auto-rotation
        stopAutoRotation();
    }
}

// Start auto-rotation for 3D view
function startAutoRotation() {
    if (isRotating) return;
    
    isRotating = true;
    let rotationInterval;
    
    function rotate() {
        current3DAngle += 0.5;
        update3DRotation();
    }
    
    rotationInterval = setInterval(rotate, 50);
    
    // Store interval ID for cleanup
    gallery3DScene.dataset.rotationInterval = rotationInterval;
}

// Stop auto-rotation
function stopAutoRotation() {
    if (!isRotating) return;
    
    isRotating = false;
    const intervalId = gallery3DScene.dataset.rotationInterval;
    if (intervalId) {
        clearInterval(intervalId);
    }
}

// Switch between views
function switchView(view) {
    currentView = view;
    
    // Hide all gallery containers
    gallery3D.classList.remove('active');
    galleryGrid.classList.remove('active');
    galleryCarousel.classList.remove('active');
    
    // Show selected gallery container
    if (view === '3d') {
        gallery3D.classList.add('active');
        if (is3DActive) {
            startAutoRotation();
        }
    } else if (view === 'grid') {
        galleryGrid.classList.add('active');
        stopAutoRotation();
    } else if (view === 'carousel') {
        galleryCarousel.classList.add('active');
        stopAutoRotation();
    }
}

// Filter heroes by category
function filterHeroes(category) {
    if (category === 'all') {
        filteredAvengers = [...avengersData];
    } else {
        filteredAvengers = avengersData.filter(hero => hero.category === category);
    }
    
    // Re-render all views with filtered data
    renderAllViews();
    
    // If in 3D view, update rotation
    if (currentView === '3d') {
        update3DRotation();
    }
}

// Search heroes
function searchHeroes(searchTerm) {
    if (!searchTerm.trim()) {
        filteredAvengers = [...avengersData];
    } else {
        const term = searchTerm.toLowerCase();
        filteredAvengers = avengersData.filter(hero => 
            hero.name.toLowerCase().includes(term) || 
            hero.alias.toLowerCase().includes(term) ||
            hero.actor.toLowerCase().includes(term)
        );
    }
    
    // Re-render all views with filtered data
    renderAllViews();
    
    // If in 3D view, update rotation
    if (currentView === '3d') {
        update3DRotation();
    }
}

// Set up all event listeners
function setupEventListeners() {
    // View option buttons
    viewOptions.forEach(option => {
        option.addEventListener('click', () => {
            const view = option.dataset.view;
            
            // Update active button
            viewOptions.forEach(btn => btn.classList.remove('active'));
            option.classList.add('active');
            
            // Switch view
            switchView(view);
            
            // If switching to 3D view, ensure 3D mode is active
            if (view === '3d' && !is3DActive) {
                is3DActive = true;
                toggle3DBtn.innerHTML = `<i class="fas fa-cube"></i> 2D View`;
            } else if (view !== '3d' && is3DActive) {
                is3DActive = false;
                toggle3DBtn.innerHTML = `<i class="fas fa-cube"></i> 3D View`;
                stopAutoRotation();
            }
            
            playSound();
        });
    });
    
    // 3D toggle button
    toggle3DBtn.addEventListener('click', toggle3DView);
    
    // Sound toggle button
    toggleSoundBtn.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        
        if (isSoundOn) {
            toggleSoundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
        } else {
            toggleSoundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            bgMusic.pause();
        }
        
        playSound();
    });
    
    // Navigation links (filtering)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.filter;
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Filter heroes
            filterHeroes(category);
            playSound();
        });
    });
    
    // Search input
    searchInput.addEventListener('input', (e) => {
        searchHeroes(e.target.value);
    });
    
    // 3D controls
    document.querySelector('.prev-3d')?.addEventListener('click', () => {
        current3DAngle += 45;
        update3DRotation();
        playSound();
    });
    
    document.querySelector('.next-3d')?.addEventListener('click', () => {
        current3DAngle -= 45;
        update3DRotation();
        playSound();
    });
    
    document.querySelector('.rotate-3d')?.addEventListener('click', () => {
        if (isRotating) {
            stopAutoRotation();
            playSound();
        } else {
            startAutoRotation();
            playSound();
        }
    });
    
    // Carousel controls
    document.querySelector('.carousel-control.prev')?.addEventListener('click', () => {
        const itemWidth = 300 + 32;
        const maxPosition = 0;
        const minPosition = -(filteredAvengers.length * itemWidth - window.innerWidth * 0.9);
        
        carouselPosition += itemWidth * 3;
        if (carouselPosition > maxPosition) carouselPosition = maxPosition;
        
        updateCarouselPosition();
        playSound();
    });
    
    document.querySelector('.carousel-control.next')?.addEventListener('click', () => {
        const itemWidth = 300 + 32;
        const minPosition = -(filteredAvengers.length * itemWidth - window.innerWidth * 0.9);
        
        carouselPosition -= itemWidth * 3;
        if (carouselPosition < minPosition) carouselPosition = minPosition;
        
        updateCarouselPosition();
        playSound();
    });
    
    // Modal close button
    document.querySelector('.modal-close')?.addEventListener('click', closeHeroModal);
    
    // Modal favorite button
    document.querySelector('.modal-content .favorite-btn')?.addEventListener('click', (e) => {
        const heroId = parseInt(e.currentTarget.dataset.id);
        toggleFavorite(heroId);
    });
    
    // Modal share button
    document.querySelector('.share-btn')?.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Avengers 3D Gallery',
                text: 'Check out this awesome Avengers 3D gallery!',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
        playSound();
    });
    
    // Close modal when clicking outside
    heroModal.addEventListener('click', (e) => {
        if (e.target === heroModal) {
            closeHeroModal();
        }
    });
    
    // Mobile menu toggle
    document.querySelector('.mobile-menu-toggle')?.addEventListener('click', () => {
        document.querySelector('.main-nav').classList.toggle('active');
        playSound();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape closes modal
        if (e.key === 'Escape' && heroModal.classList.contains('active')) {
            closeHeroModal();
        }
        
        // Arrow keys for carousel navigation
        if (currentView === 'carousel' && !heroModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                document.querySelector('.carousel-control.prev').click();
            } else if (e.key === 'ArrowRight') {
                document.querySelector('.carousel-control.next').click();
            }
        }
        
        // Space toggles sound
        if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            toggleSoundBtn.click();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (currentView === 'carousel') {
            updateCarouselPosition();
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);