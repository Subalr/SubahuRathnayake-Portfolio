const projects = [
    {
        id: 10,
        title: "V Care — Web Gallery",
        category: "web",
        description: "web-based platform designed to modernize and streamline the operations of veterinary clinics. It addresses key challenges in appointment scheduling, pet health record management, inventory control, and client communication by integrating all essential functions into a single, user-friendly system.",
        year: "2024",
        tools: "HTML, CSS, and JavaScript, Java Servlet, Figma, Draw.io",
        // include all images from the local V Care folder in one project
        images: [
            "V Care/1.jpg","V Care/2.jpg","V Care/3.jpg","V Care/4.jpg",
            "V Care/5.jpg","V Care/6.jpg","V Care/7.jpg","V Care/8.jpg",
            "V Care/9.jpg","V Care/10.jpg","V Care/11.jpg","V Care/12.jpg",
            "V Care/13.jpg","V Care/14.jpg","V Care/15.jpg","V Care/16.jpg"
        ],
        // fallback cover image
        image: "V Care/1.jpg"
    }
    ,
    {
        id: 11,
        title: "GreenLanka — Mobile App",
        category: "mobile",
        description: "This UI project, GreenLanka, is a comprehensive waste management application with a clean, eco-conscious design. The app's core functionality, organized by a 5-icon bottom navigation bar, allows users to manage their waste cycle from end to end. Key features include a main dashboard for at-a-glance info on upcoming collections and reward points, a Schedule Pickup screen for regular or bulk waste, and a Live Tracking map showing the collection truck's real-time location and ETA. The app also provides value-added tools like a Report Issues form, a Waste Segregation Guidelines section, and an AI-based waste recognition feature to identify waste by uploading a photo.",
        year: "2024",
        tools: "Figma",
        images: [
            "GreenLanka/1.jpg","GreenLanka/2.jpg","GreenLanka/3.jpg","GreenLanka/4.jpg",
            "GreenLanka/5.jpg","GreenLanka/6.jpg","GreenLanka/7.jpg","GreenLanka/8.jpg",
            "GreenLanka/9.jpg","GreenLanka/10.jpg","GreenLanka/11.jpg","GreenLanka/12.jpg",
            "GreenLanka/13.jpg"
        ],
        image: "GreenLanka/1.jpg"
    }
    ,
    {
        id: 13,
        title: "Readle Web — Web App",
        category: "web",
        description: "Readle is a digital platform designed to support children with reading difficulties, particularly those with or at risk for dyslexia, by combining assessment with a gamified learning experience. The UI guides parents through a clear process starting with account creation and dual profile setup (Parent and Child), followed by a crucial Dyslexia Screening Questionnaire that assesses reading abilities and provides an estimated probability of dyslexia. The app uses an encouraging, child-friendly design and is built around core features—Games, Tracking, and Rewards—to deliver personalized, engaging activities and allow parents to monitor their child's progress, thus serving as an end-to-end tool from initial screening to ongoing literacy intervention.",
        year: "2024",
        tools: "Figma",
        images: [
            "Readle Web/Logo.png","Readle Web/1.jpg","Readle Web/2.jpg","Readle Web/3.png","Readle Web/4.png",
            "Readle Web/5.jpg","Readle Web/6.png","Readle Web/7.png","Readle Web/8.png",
            "Readle Web/9.png","Readle Web/10.png"
        ],
        // use the project's logo as the cover image in the projects grid
        image: "Readle Web/Logo.png"
    }
];

// Add AutiMate mobile project (local images in AutiMate (1) folder)
projects.push({
    id: 12,
    title: "AutiMate — Mobile App",
    category: "mobile",
    description: "AutiMate is a dual-purpose mobile app designed to support caregivers and children with autism. The UI features a caregiver-facing dashboard for managing schedules, tracking progress, and accessing resources like an emergency toolkit. Simultaneously, it offers a child-facing interface with key assistive tools, including an AAC TalkBoard for communication, Learn & Play games for skill-building, and Social Stories to prepare for events. The design is clean, user-friendly, and sensory-aware, incorporating accessibility options like a grayscale mode to reduce visual stimulation.",
    year: "2024",
    tools: "Figma",
    images: [
        "AutiMate (1)/Logo.jpg","AutiMate (1)/1.jpg","AutiMate (1)/2.jpg","AutiMate (1)/3.jpg","AutiMate (1)/4.jpg",
        "AutiMate (1)/5.jpg","AutiMate (1)/6.jpg","AutiMate (1)/7.jpg","AutiMate (1)/8.jpg",
        "AutiMate (1)/9.jpg","AutiMate (1)/10.jpg","AutiMate (1)/11.jpg","AutiMate (1)/12.jpg",
        "AutiMate (1)/13.jpg","AutiMate (1)/14.jpg"
    ],
    // use the project's logo as the fallback cover image in the projects grid
    image: "AutiMate (1)/Logo.jpg"
});

// Initialize the portfolio
function init() {
    renderProjects('all');
    setupFilterButtons();
    setupModal();
}

// Render projects based on filter
function renderProjects(filter) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        grid.appendChild(card);
    });
}

// Create project card element
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.dataset.category = project.category;
    // set project id attribute so CSS can target specific projects (e.g. GreenLanka)
    card.dataset.projectId = project.id;
    
    const coverSrc = project.images && project.images.length ? project.images[0] : project.image;
    card.innerHTML = `
        <div class="project-image">
            <img src="${coverSrc}" alt="${project.title}">
        </div>
        <div class="project-info">
            <span class="project-category">${project.category}</span>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description.substring(0, 120)}...</p>
        </div>
    `;

    card.addEventListener('click', () => openModal(project));
    
    return card;
}

// Setup filter buttons
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.dataset.filter;
            renderProjects(filter);
        });
    });
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('projectModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Open modal with project details
function openModal(project) {
    const modal = document.getElementById('projectModal');
    
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalYear = document.getElementById('modalYear');
    const modalTools = document.getElementById('modalTools');
    const modalDescription = document.getElementById('modalDescription');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    const modalThumbs = document.getElementById('modalThumbs');

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalYear.textContent = project.year;
    modalTools.textContent = project.tools;
    modalDescription.textContent = project.description;

    // Clear any previous gallery state
    modal._images = null;
    modal._currentIndex = 0;

    if (project.images && project.images.length) {
        // Gallery mode - use only prev/next buttons for navigation (no thumbnails)
        modal._images = project.images.slice();
        modal._currentIndex = 0;

        // populate thumbnails
        modalThumbs.innerHTML = '';
        modal._images.forEach((src, i) => {
            const t = document.createElement('img');
            t.src = src;
            t.className = i === 0 ? 'active' : '';
            t.dataset.index = i;
            t.addEventListener('click', () => showGalleryImage(i));
            modalThumbs.appendChild(t);
        });

        // If this is a mobile project, mark thumbnails as mobile (portrait) so CSS can size them taller
        if (project.category === 'mobile') {
            modalThumbs.classList.add('mobile');
        } else {
            modalThumbs.classList.remove('mobile');
        }

        // show first image
        setModalImageSrc(0);

        // ensure thumbnails container shows the first items (not centered)
        // do a small deferred reset so layout has measured thumbnails
        setTimeout(() => {
            if (modalThumbs) modalThumbs.scrollLeft = 0;
        }, 40);
        // show first image
        setModalImageSrc(0);

        // hook prev/next (always visible in markup)
        prevBtn.style.display = '';
        nextBtn.style.display = '';
        prevBtn.onclick = () => showGalleryImage(modal._currentIndex - 1);
        nextBtn.onclick = () => showGalleryImage(modal._currentIndex + 1);

        // ensure thumbnails visible (they're inside the left column)
        if (modalThumbs) modalThumbs.style.display = '';

        // keyboard navigation
        modal._keyHandler = (e) => {
            if (e.key === 'ArrowLeft') showGalleryImage(modal._currentIndex - 1);
            if (e.key === 'ArrowRight') showGalleryImage(modal._currentIndex + 1);
        };
        document.addEventListener('keydown', modal._keyHandler);
    } else {
        // Single-image fallback
        modalImage.src = project.image || '';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // ensure modal content is scrolled to top when opened
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) modalContent.scrollTop = 0;

    // helper functions
    function setModalImageSrc(i) {
        const idx = ((i % modal._images.length) + modal._images.length) % modal._images.length;
        modal._currentIndex = idx;
        // fade effect
        modalImage.classList.add('fade');
        // small timeout to let CSS opacity transition apply
        setTimeout(() => {
            modalImage.src = modal._images[idx];
            modalImage.classList.remove('fade');
            // update active thumbnail
            if (modalThumbs) {
                const thumbs = modalThumbs.querySelectorAll('img');
                thumbs.forEach(t => t.classList.remove('active'));
                if (thumbs[idx]) {
                    thumbs[idx].classList.add('active');
                    // Calculate a centered scroll position but clamp to bounds so first thumbnails stay visible
                    const thumb = thumbs[idx];
                    const left = thumb.offsetLeft - (modalThumbs.clientWidth / 2) + (thumb.clientWidth / 2);
                    modalThumbs.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
                }
            }

            // reset modal-content vertical scroll so description remains visible
            if (modalContent) modalContent.scrollTop = 0;
        }, 60);
    }

    function showGalleryImage(i) {
        if (!modal._images || !modal._images.length) return;
        const len = modal._images.length;
        const nextIndex = ((i % len) + len) % len;
        setModalImageSrc(nextIndex);
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('projectModal');
    // remove gallery keyboard handler if set
    if (modal._keyHandler) {
        document.removeEventListener('keydown', modal._keyHandler);
        delete modal._keyHandler;
    }

    // clear image state
    modal._images = null;
    modal._currentIndex = 0;

    // disconnect prev/next
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    if (prevBtn) prevBtn.onclick = null;
    if (nextBtn) nextBtn.onclick = null;

    // clear thumbnails
    const modalThumbs = document.getElementById('modalThumbs');
    if (modalThumbs) modalThumbs.innerHTML = '';

    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Smooth scrolling for navigation links
// Custom smooth scrolling for anchor links that accounts for the fixed header
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function smoothScrollTo(targetY, duration = 700) {
    const startY = window.scrollY || window.pageYOffset;
    const diff = targetY - startY;
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutQuad(progress);
        window.scrollTo(0, startY + diff * eased);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const selector = this.getAttribute('href');
        const target = document.querySelector(selector);
        if (target) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetRect = target.getBoundingClientRect();
            // Scroll to the target top minus header height and a small gap
            const targetY = window.scrollY + targetRect.top - headerHeight - 12;
            // Use a comfortable duration (in ms) for a slower, smoother feel
            smoothScrollTo(targetY, 700);
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);