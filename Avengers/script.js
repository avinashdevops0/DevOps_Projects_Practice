// Avengers 3D Gallery - JavaScript
class AvengersGallery {
    constructor() {
        this.heroes = [
            {
                id: 'iron-man',
                name: 'Iron Man',
                alias: 'Tony Stark',
                movie: 'Iron Man',
                actor: 'Robert Downey Jr.',
                type: 'original',
                description: 'Genius billionaire playboy philanthropist Tony Stark creates a suit of armor to fight crime after being held captive.',
                quote: 'I am Iron Man.',
                powers: { intelligence: 100, strength: 85, speed: 58, durability: 85, energy: 100, fighting: 64 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'captain-america',
                name: 'Captain America',
                alias: 'Steve Rogers',
                movie: 'Captain America: The First Avenger',
                actor: 'Chris Evans',
                type: 'original',
                description: 'Super-soldier Steve Rogers fights for justice and freedom during World War II and beyond.',
                quote: 'I can do this all day.',
                powers: { intelligence: 75, strength: 95, speed: 45, durability: 95, energy: 20, fighting: 100 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'thor',
                name: 'Thor',
                alias: 'God of Thunder',
                movie: 'Thor',
                actor: 'Chris Hemsworth',
                type: 'original',
                description: 'The mighty Thor, prince of Asgard, wields the power of lightning and the enchanted hammer Mjolnir.',
                quote: 'Bring me Thanos!',
                powers: { intelligence: 70, strength: 100, speed: 92, durability: 100, energy: 100, fighting: 85 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'hulk',
                name: 'Hulk',
                alias: 'Bruce Banner',
                movie: 'The Incredible Hulk',
                actor: 'Mark Ruffalo',
                type: 'original',
                description: 'Dr. Bruce Banner transforms into the incredible Hulk when angered, gaining immense strength.',
                quote: 'Hulk smash!',
                powers: { intelligence: 85, strength: 100, speed: 75, durability: 100, energy: 40, fighting: 85 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'black-widow',
                name: 'Black Widow',
                alias: 'Natasha Romanoff',
                movie: 'Iron Man 2',
                actor: 'Scarlett Johansson',
                type: 'original',
                description: 'Master spy and assassin Natasha Romanoff uses her skills and gadgets to protect the world.',
                quote: 'I\'ve got red in my ledger.',
                powers: { intelligence: 88, strength: 13, speed: 33, durability: 32, energy: 26, fighting: 95 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'hawkeye',
                name: 'Hawkeye',
                alias: 'Clint Barton',
                movie: 'Thor',
                actor: 'Jeremy Renner',
                type: 'original',
                description: 'Master archer Clint Barton never misses his target and fights alongside the Avengers.',
                quote: 'Made it myself.',
                powers: { intelligence: 56, strength: 12, speed: 21, durability: 14, energy: 26, fighting: 80 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'spider-man',
                name: 'Spider-Man',
                alias: 'Peter Parker',
                movie: 'Captain America: Civil War',
                actor: 'Tom Holland',
                type: 'new',
                description: 'Young hero Peter Parker uses his spider-like abilities to fight crime in New York City.',
                quote: 'With great power comes great responsibility.',
                powers: { intelligence: 90, strength: 55, speed: 92, durability: 75, energy: 75, fighting: 85 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'doctor-strange',
                name: 'Doctor Strange',
                alias: 'Stephen Strange',
                movie: 'Doctor Strange',
                actor: 'Benedict Cumberbatch',
                type: 'new',
                description: 'Former surgeon Stephen Strange masters the mystic arts to protect Earth from otherworldly threats.',
                quote: 'Dormammu, I\'ve come to bargain.',
                powers: { intelligence: 100, strength: 10, speed: 12, durability: 84, energy: 100, fighting: 60 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'captain-marvel',
                name: 'Captain Marvel',
                alias: 'Carol Danvers',
                movie: 'Captain Marvel',
                actor: 'Brie Larson',
                type: 'new',
                description: 'Carol Danvers becomes one of the universe\'s most powerful heroes with cosmic energy abilities.',
                quote: 'I\'m one of the idiots who lives in it.',
                powers: { intelligence: 88, strength: 97, speed: 100, durability: 95, energy: 100, fighting: 90 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'scarlet-witch',
                name: 'Scarlet Witch',
                alias: 'Wanda Maximoff',
                movie: 'Avengers: Age of Ultron',
                actor: 'Elizabeth Olsen',
                type: 'new',
                description: 'Wanda Maximoff possesses reality-warping powers and fights for her family and justice.',
                quote: 'You took everything from me.',
                powers: { intelligence: 88, strength: 10, speed: 29, durability: 70, energy: 100, fighting: 64 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'black-panther',
                name: 'Black Panther',
                alias: 'T\'Challa',
                movie: 'Black Panther',
                actor: 'Chadwick Boseman',
                type: 'new',
                description: 'King T\'Challa of Wakanda uses advanced technology and his enhanced abilities to protect his nation.',
                quote: 'In times of crisis, the wise build bridges, while the foolish build barriers.',
                powers: { intelligence: 88, strength: 16, speed: 30, durability: 60, energy: 32, fighting: 100 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            },
            {
                id: 'thanos',
                name: 'Thanos',
                alias: 'The Mad Titan',
                movie: 'The Avengers',
                actor: 'Josh Brolin',
                type: 'villains',
                description: 'The powerful Thanos seeks to balance the universe by eliminating half of all life.',
                quote: 'I am inevitable.',
                powers: { intelligence: 100, strength: 100, speed: 33, durability: 100, energy: 100, fighting: 80 },
                image: 'https://i.pinimg.com/736x/8a/8b/8c/8a8b8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg'
            }
        ];

        this.currentView = 'grid';
        this.currentFilter = 'all';
        this.current3DIndex = 0;
        this.carouselIndex = 0;
        this.isSoundEnabled = false;
        this.favorites = new Set();

        this.init();
    }

    init() {
        this.bindEvents();
        this.showLoadingScreen();
        this.populateGalleries();
        this.setup3DGallery();
    }

    bindEvents() {
        // Navigation filters
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.setFilter(link.dataset.filter);
            });
        });

        // View toggles
        document.querySelectorAll('.view-option').forEach(option => {
            option.addEventListener('click', () => {
                this.setView(option.dataset.view);
            });
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchHeroes(e.target.value);
        });

        // 3D controls
        document.querySelector('.prev-3d').addEventListener('click', () => this.rotate3D(-1));
        document.querySelector('.next-3d').addEventListener('click', () => this.rotate3D(1));
        document.querySelector('.rotate-3d').addEventListener('click', () => this.autoRotate3D());

        // Carousel controls
        document.querySelector('.carousel-control.prev').addEventListener('click', () => this.moveCarousel(-1));
        document.querySelector('.carousel-control.next').addEventListener('click', () => this.moveCarousel(1));

        // Modal
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.querySelector('.hero-modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeModal();
        });

        // Sound toggle
        document.getElementById('toggleSound').addEventListener('click', () => this.toggleSound());

        // Mobile menu
        document.querySelector('.mobile-menu-toggle').addEventListener('click', () => this.toggleMobileMenu());

        // 3D view toggle
        document.getElementById('toggle3D').addEventListener('click', () => this.toggle3DView());
    }

    showLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        const progressBar = document.querySelector('.loading-progress');

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.playBackgroundMusic();
                }, 500);
            }
            progressBar.style.width = progress + '%';
        }, 100);
    }

    populateGalleries() {
        this.populateGrid();
        this.populateCarousel();
        this.populate3D();
    }

    populateGrid() {
        const grid = document.querySelector('.gallery-grid');
        grid.innerHTML = '';

        this.getFilteredHeroes().forEach(hero => {
            const item = this.createGridItem(hero);
            grid.appendChild(item);
        });
    }

    populateCarousel() {
        const track = document.querySelector('.carousel-track');
        track.innerHTML = '';

        this.getFilteredHeroes().forEach(hero => {
            const item = this.createCarouselItem(hero);
            track.appendChild(item);
        });
    }

    populate3D() {
        const scene = document.querySelector('.gallery-3d-scene');
        scene.innerHTML = '';

        const filteredHeroes = this.getFilteredHeroes();
        const angleStep = 360 / filteredHeroes.length;

        filteredHeroes.forEach((hero, index) => {
            const item = this.create3DItem(hero, index, angleStep);
            scene.appendChild(item);
        });

        this.update3DTransform();
    }

    createGridItem(hero) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.dataset.heroId = hero.id;

        item.innerHTML = `
            <div class="grid-image">
                <img src="${hero.image}" alt="${hero.name}" loading="lazy">
            </div>
            <div class="grid-content">
                <h3>${hero.name}</h3>
                <p>${hero.description.substring(0, 100)}...</p>
                <div class="grid-meta">
                    <span class="hero-type">${hero.type}</span>
                    <button class="favorite-btn ${this.favorites.has(hero.id) ? 'active' : ''}" data-hero-id="${hero.id}">
                        <i class="fa${this.favorites.has(hero.id) ? 's' : 'r'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        item.addEventListener('click', () => this.openModal(hero));
        item.querySelector('.favorite-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(hero.id);
        });

        return item;
    }

    createCarouselItem(hero) {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.dataset.heroId = hero.id;

        item.innerHTML = `
            <div class="carousel-image">
                <img src="${hero.image}" alt="${hero.name}" loading="lazy">
            </div>
            <div class="carousel-content">
                <h3>${hero.name}</h3>
                <p>${hero.description.substring(0, 120)}...</p>
            </div>
        `;

        item.addEventListener('click', () => this.openModal(hero));

        return item;
    }

    create3DItem(hero, index, angleStep) {
        const item = document.createElement('div');
        item.className = 'gallery-3d-item';
        item.dataset.heroId = hero.id;
        item.style.transform = `rotateY(${index * angleStep}deg) translateZ(300px)`;

        item.innerHTML = `
            <img src="${hero.image}" alt="${hero.name}" loading="lazy">
            <div class="gallery-3d-item-content">
                <h3>${hero.name}</h3>
                <p>${hero.description.substring(0, 80)}...</p>
            </div>
        `;

        item.addEventListener('click', () => this.openModal(hero));

        return item;
    }

    setup3DGallery() {
        const scene = document.querySelector('.gallery-3d-scene');
        let isDragging = false;
        let startX = 0;
        let currentRotation = 0;

        scene.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });

        scene.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            currentRotation += deltaX * 0.5;
            scene.style.transform = `rotateY(${currentRotation}deg)`;
            startX = e.clientX;
        });

        scene.addEventListener('mouseup', () => {
            isDragging = false;
        });

        scene.addEventListener('mouseleave', () => {
            isDragging = false;
        });
    }

    update3DTransform() {
        const scene = document.querySelector('.gallery-3d-scene');
        const rotation = this.current3DIndex * (360 / this.getFilteredHeroes().length);
        scene.style.transform = `rotateY(${-rotation}deg)`;
    }

    rotate3D(direction) {
        const maxIndex = this.getFilteredHeroes().length - 1;
        this.current3DIndex = (this.current3DIndex + direction + maxIndex + 1) % (maxIndex + 1);
        this.update3DTransform();
    }

    autoRotate3D() {
        const interval = setInterval(() => {
            this.rotate3D(1);
        }, 2000);

        setTimeout(() => clearInterval(interval), 10000);
    }

    moveCarousel(direction) {
        const items = document.querySelectorAll('.carousel-item');
        const maxIndex = Math.max(0, items.length - Math.floor(window.innerWidth / 320));

        this.carouselIndex = Math.max(0, Math.min(maxIndex, this.carouselIndex + direction));
        const track = document.querySelector('.carousel-track');
        track.style.transform = `translateX(-${this.carouselIndex * 320}px)`;
    }

    setFilter(filter) {
        this.currentFilter = filter;

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.filter === filter);
        });

        this.updateGalleries();
    }

    setView(view) {
        this.currentView = view;

        // Update active view option
        document.querySelectorAll('.view-option').forEach(option => {
            option.classList.toggle('active', option.dataset.view === view);
        });

        // Show/hide gallery containers
        document.querySelectorAll('.gallery-grid-container, .gallery-carousel-container, .gallery-3d-container').forEach(container => {
            container.classList.toggle('active', container.classList.contains(`gallery-${view}-container`));
        });
    }

    searchHeroes(query) {
        const filteredHeroes = this.heroes.filter(hero =>
            hero.name.toLowerCase().includes(query.toLowerCase()) ||
            hero.alias.toLowerCase().includes(query.toLowerCase()) ||
            hero.description.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(filteredHeroes);
    }

    displaySearchResults(results) {
        // For now, just filter the current view
        // In a full implementation, you might want to show search results separately
        this.updateGalleries();
    }

    getFilteredHeroes() {
        let filtered = this.heroes;

        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(hero => hero.type === this.currentFilter);
        }

        return filtered;
    }

    updateGalleries() {
        this.populateGrid();
        this.populateCarousel();
        this.populate3D();
    }

    openModal(hero) {
        const modal = document.querySelector('.hero-modal');
        const modalImage = document.querySelector('.modal-image-container');
        const modalName = document.getElementById('modalHeroName');
        const modalAlias = document.getElementById('modalHeroAlias');
        const modalMovie = document.getElementById('modalHeroMovie');
        const modalActor = document.getElementById('modalHeroActor');
        const modalDescription = document.getElementById('modalHeroDescription');
        const modalQuote = document.getElementById('modalHeroQuote');
        const modalBadge = document.getElementById('heroBadge');
        const statsBars = document.querySelector('.stats-bars');

        modalImage.style.backgroundImage = `url(${hero.image})`;
        modalName.textContent = hero.name;
        modalAlias.textContent = hero.alias;
        modalMovie.textContent = hero.movie;
        modalActor.textContent = hero.actor;
        modalDescription.textContent = hero.description;
        modalQuote.textContent = hero.quote;
        modalBadge.textContent = hero.type;

        statsBars.innerHTML = '';
        Object.entries(hero.powers).forEach(([stat, value]) => {
            const statBar = document.createElement('div');
            statBar.className = 'stat-bar';
            statBar.innerHTML = `
                <span class="stat-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
                <div class="stat-progress">
                    <div class="stat-value" style="width: ${value}%"></div>
                </div>
            `;
            statsBars.appendChild(statBar);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate stats bars
        setTimeout(() => {
            document.querySelectorAll('.stat-value').forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }, 100);

        this.playHeroSound();
    }

    closeModal() {
        const modal = document.querySelector('.hero-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleFavorite(heroId) {
        if (this.favorites.has(heroId)) {
            this.favorites.delete(heroId);
        } else {
            this.favorites.add(heroId);
        }

        // Update favorite buttons across all views
        document.querySelectorAll(`[data-hero-id="${heroId}"] .favorite-btn`).forEach(btn => {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            icon.className = `fa${this.favorites.has(heroId) ? 's' : 'r'} fa-heart`;
        });
    }

    toggleSound() {
        this.isSoundEnabled = !this.isSoundEnabled;
        const soundBtn = document.getElementById('toggleSound');
        const icon = soundBtn.querySelector('i');

        if (this.isSoundEnabled) {
            icon.className = 'fas fa-volume-up';
            this.playBackgroundMusic();
        } else {
            icon.className = 'fas fa-volume-mute';
            this.stopBackgroundMusic();
        }
    }

    playBackgroundMusic() {
        if (!this.isSoundEnabled) return;
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.volume = 0.3;
        bgMusic.play().catch(() => {}); // Ignore autoplay restrictions
    }

    stopBackgroundMusic() {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.pause();
    }

    playHeroSound() {
        if (!this.isSoundEnabled) return;
        const heroSound = document.getElementById('heroSound');
        heroSound.currentTime = 0;
        heroSound.play().catch(() => {});
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.main-nav');
        nav.classList.toggle('active');
    }

    toggle3DView() {
        const btn = document.getElementById('toggle3D');
        const is3D = this.currentView === '3d';

        if (is3D) {
            this.setView('grid');
            btn.innerHTML = '<i class="fas fa-cube"></i> 3D View';
        } else {
            this.setView('3d');
            btn.innerHTML = '<i class="fas fa-th"></i> Grid View';
        }
    }
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AvengersGallery();
});

// Add some utility functions for animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.grid-item, .carousel-item, .gallery-3d-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
};

// Call animation function after galleries are populated
setTimeout(animateOnScroll, 1000);
