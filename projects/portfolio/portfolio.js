// Portfolio JavaScript - External file

// App namespace
const app = {
    // State
    state: {
        name: 'John Doe',
        title: 'Web Developer & Designer',
        about: "Hello! I'm a passionate web developer with 5+ years of experience in creating beautiful, responsive websites.",
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Python'],
        projects: [
            { name: 'Portfolio Website', year: 2024, tech: 'HTML, CSS, JS' },
            { name: 'E-commerce Store', year: 2023, tech: 'React, Node.js' },
            { name: 'Weather App', year: 2023, tech: 'JavaScript, API' }
        ],
        theme: 'light'
    },

    // Initialize app
    init: function() {
        this.loadProjects();
        this.setupEventListeners();
        this.checkStorage();
        console.log('Portfolio initialized');
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if(contactForm) {
            contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
        }

        // Profile image click
        const profileImg = document.getElementById('profileImg');
        if(profileImg) {
            profileImg.addEventListener('click', () => this.changeProfileImage());
        }
    },

    // Load projects from state
    loadProjects: function() {
        const grid = document.getElementById('projectsGrid');
        if(!grid) return;

        grid.innerHTML = this.state.projects.map(project => `
            <div class="project-card" onclick="app.showProjectDetails('${project.name}')">
                <h3>${project.name}</h3>
                <p>${project.tech}</p>
                <span class="year">${project.year}</span>
            </div>
        `).join('');
    },

    // Add new skill
    addSkill: function() {
        const newSkill = prompt('Enter new skill:');
        if(newSkill && newSkill.trim()) {
            this.state.skills.push(newSkill.trim());
            this.updateSkillsList();
            this.saveToStorage();
            this.showNotification('Skill added successfully!');
        }
    },

    // Update skills list in DOM
    updateSkillsList: function() {
        const list = document.getElementById('skillsList');
        if(list) {
            list.innerHTML = this.state.skills.map(skill => 
                `<li onclick="app.removeSkill('${skill}')">${skill}</li>`
            ).join('');
        }
    },

    // Remove skill
    removeSkill: function(skill) {
        if(confirm(`Remove "${skill}" from skills?`)) {
            this.state.skills = this.state.skills.filter(s => s !== skill);
            this.updateSkillsList();
            this.saveToStorage();
            this.showNotification('Skill removed!');
        }
    },

    // Edit about text
    editAbout: function() {
        const newAbout = prompt('Edit about text:', this.state.about);
        if(newAbout && newAbout.trim()) {
            this.state.about = newAbout.trim();
            document.getElementById('aboutText').textContent = this.state.about;
            this.saveToStorage();
            this.showNotification('About text updated!');
        }
    },

    // Toggle theme
    toggleTheme: function() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-theme');
        this.saveToStorage();
        this.showNotification(`${this.state.theme} theme activated!`);
    },

    // Change profile image
    changeProfileImage: function() {
        const imgUrl = prompt('Enter image URL (or leave blank for default):');
        const img = document.getElementById('profileImg');
        if(img) {
            img.src = imgUrl && imgUrl.trim() ? imgUrl : 'https://via.placeholder.com/150';
            this.showNotification('Profile image updated!');
        }
    },

    // Handle contact form submit
    handleContactSubmit: function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Validate
        if(!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }

        if(!this.validateEmail(email)) {
            alert('Please enter a valid email');
            return;
        }

        // Simulate sending
        console.log('Message sent:', { name, email, message });
        this.showNotification('Message sent successfully!');
        e.target.reset();
    },

    // Validate email
    validateEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Show project details
    showProjectDetails: function(projectName) {
        const project = this.state.projects.find(p => p.name === projectName);
        if(project) {
            alert(`Project: ${project.name}\nTechnology: ${project.tech}\nYear: ${project.year}`);
        }
    },

    // Show notification
    showNotification: function(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    // Save to localStorage
    saveToStorage: function() {
        localStorage.setItem('portfolioState', JSON.stringify(this.state));
    },

    // Check localStorage for saved state
    checkStorage: function() {
        const saved = localStorage.getItem('portfolioState');
        if(saved) {
            try {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
                
                // Update DOM with saved state
                document.getElementById('name').textContent = this.state.name;
                document.getElementById('title').textContent = this.state.title;
                document.getElementById('aboutText').textContent = this.state.about;
                this.updateSkillsList();
                this.loadProjects();
                
                if(this.state.theme === 'dark') {
                    document.body.classList.add('dark-theme');
                }
            } catch(e) {
                console.error('Failed to load saved state:', e);
            }
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => app.init());

// Export for use in HTML
window.app = app;