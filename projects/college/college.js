// College Website JavaScript - External file

class CollegeWebsite {
    constructor() {
        this.currentSection = 'home';
        this.data = {
            collegeName: 'ABC College of Engineering',
            tagline: 'Empowering Future Leaders Since 1980',
            stats: {
                founded: '1980',
                students: '5000+',
                faculty: '300+',
                placement: '95%'
            },
            courses: [
                { name: 'Computer Science Engineering', duration: '4 years', seats: 120 },
                { name: 'Electronics & Communication', duration: '4 years', seats: 90 },
                { name: 'Mechanical Engineering', duration: '4 years', seats: 90 },
                { name: 'Civil Engineering', duration: '4 years', seats: 60 },
                { name: 'Artificial Intelligence & ML', duration: '4 years', seats: 60 },
                { name: 'Data Science', duration: '4 years', seats: 60 }
            ],
            faculty: [
                { name: 'Dr. John Smith', dept: 'CSE', qualification: 'Ph.D, IIT Bombay' },
                { name: 'Prof. Sarah Johnson', dept: 'ECE', qualification: 'M.Tech, IISc' },
                { name: 'Dr. Michael Brown', dept: 'ME', qualification: 'Ph.D, IIT Delhi' },
                { name: 'Dr. Emily Davis', dept: 'CE', qualification: 'Ph.D, IIT Madras' }
            ],
            events: [
                { name: 'Tech Fest 2024', date: '2024-03-15', venue: 'Main Auditorium' },
                { name: 'Annual Sports Day', date: '2024-04-05', venue: 'Sports Complex' },
                { name: 'Hackathon 2024', date: '2024-04-20', venue: 'CS Department' },
                { name: 'Alumni Meet', date: '2024-05-01', venue: 'College Campus' }
            ]
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSection('home');
        this.updateStats();
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.loadSection(section);
                this.setActiveNav(link);
            });
        });

        // Update copyright year
        this.updateCopyright();
    }

    setActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    async loadSection(section) {
        this.showLoading();
        this.currentSection = section;
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let content = '';
        switch(section) {
            case 'home':
                content = this.renderHome();
                break;
            case 'about':
                content = this.renderAbout();
                break;
            case 'courses':
                content = this.renderCourses();
                break;
            case 'faculty':
                content = this.renderFaculty();
                break;
            case 'events':
                content = this.renderEvents();
                break;
            case 'contact':
                content = this.renderContact();
                break;
        }
        
        document.getElementById('content-area').innerHTML = content;
        this.hideLoading();
        
        // Setup contact form if needed
        if(section === 'contact') {
            this.setupContactForm();
        }
    }

    renderHome() {
        return `
            <section class="hero">
                <h2>Welcome to ${this.data.collegeName}</h2>
                <p>${this.data.tagline}. Join us in shaping your future with quality education, 
                experienced faculty, and state-of-the-art facilities. We nurture talent and build careers.</p>
            </section>
            
            <div class="cards-grid">
                <div class="card" onclick="college.loadSection('courses')">
                    <img src="https://via.placeholder.com/400x300" alt="Courses">
                    <div class="card-content">
                        <h3>Our Courses</h3>
                        <p>Explore our diverse range of engineering programs designed for future leaders.</p>
                    </div>
                </div>
                
                <div class="card" onclick="college.loadSection('faculty')">
                    <img src="https://via.placeholder.com/400x300" alt="Faculty">
                    <div class="card-content">
                        <h3>Expert Faculty</h3>
                        <p>Learn from experienced professors and industry experts.</p>
                    </div>
                </div>
                
                <div class="card" onclick="college.loadSection('events')">
                    <img src="https://via.placeholder.com/400x300" alt="Events">
                    <div class="card-content">
                        <h3>Campus Events</h3>
                        <p>Join exciting events, workshops, and cultural activities.</p>
                    </div>
                </div>
            </div>
            
            <div class="info-section">
                <div class="info-box">
                    <h3>Why Choose Us?</h3>
                    <ul>
                        <li>✓ NAAC A+ Accredited</li>
                        <li>✓ 95% Placement Record</li>
                        <li>✓ Modern Laboratories</li>
                        <li>✓ Digital Library</li>
                        <li>✓ Sports Complex</li>
                        <li>✓ Hostel Facilities</li>
                    </ul>
                </div>
                
                <div class="info-box">
                    <h3>Upcoming Events</h3>
                    <ul>
                        ${this.data.events.slice(0, 3).map(event => `
                            <li>📅 ${new Date(event.date).toLocaleDateString()} - ${event.name}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    renderAbout() {
        return `
            <div class="info-section">
                <div class="info-box">
                    <h3>About Our College</h3>
                    <p style="margin-bottom: 20px;">Founded in 1980, ABC College of Engineering has been a pioneer in technical education. 
                    We are committed to producing skilled engineers who can contribute to society and industry.</p>
                    <p>Our mission is to provide quality education, foster innovation, and develop leadership qualities 
                    in students through holistic learning approaches.</p>
                </div>
                
                <div class="info-box">
                    <h3>Vision & Mission</h3>
                    <h4>Vision</h4>
                    <p>To be a center of excellence in engineering education and research.</p>
                    <h4>Mission</h4>
                    <ul>
                        <li>Provide quality technical education</li>
                        <li>Foster research and innovation</li>
                        <li>Develop industry-ready professionals</li>
                        <li>Promote ethical values</li>
                    </ul>
                </div>
            </div>
            
            <div class="info-section">
                <div class="info-box">
                    <h3>Infrastructure</h3>
                    <ul>
                        <li>🏛️ 50 Acre Campus</li>
                        <li>📚 Central Library with 50,000+ books</li>
                        <li>🔬 Modern Laboratories</li>
                        <li>💻 High-speed WiFi Campus</li>
                        <li>🏟️ Olympic-size Swimming Pool</li>
                        <li>🏀 Basketball & Tennis Courts</li>
                    </ul>
                </div>
                
                <div class="info-box">
                    <h3>Achievements</h3>
                    <ul>
                        <li>🏆 Best Engineering College Award 2023</li>
                        <li>🥇 NBA Accreditation for 5 Years</li>
                        <li>🎯 100+ Research Publications</li>
                        <li>💼 200+ Recruiting Companies</li>
                    </ul>
                </div>
            </div>
        `;
    }

    renderCourses() {
        return `
            <h2 style="text-align: center; margin-bottom: 30px;">Our Programs</h2>
            <div class="cards-grid">
                ${this.data.courses.map(course => `
                    <div class="card">
                        <div class="card-content">
                            <h3>${course.name}</h3>
                            <p><strong>Duration:</strong> ${course.duration}</p>
                            <p><strong>Intake:</strong> ${course.seats} seats</p>
                            <p><strong>Eligibility:</strong> 60% in 10+2 with PCM</p>
                            <button class="submit-btn" style="margin-top: 15px;" 
                                    onclick="college.showCourseDetails('${course.name}')">
                                Learn More
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderFaculty() {
        return `
            <h2 style="text-align: center; margin-bottom: 30px;">Our Faculty</h2>
            <div class="faculty-grid">
                ${this.data.faculty.map(f => `
                    <div class="faculty-card">
                        <img src="https://via.placeholder.com/150" alt="${f.name}">
                        <h3>${f.name}</h3>
                        <p class="department">${f.dept}</p>
                        <p>${f.qualification}</p>
                        <p>📧 ${f.name.toLowerCase().replace(' ', '.')}@college.edu</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderEvents() {
        return `
            <h2 style="text-align: center; margin-bottom: 30px;">Upcoming Events</h2>
            <div class="events-list">
                ${this.data.events.map(event => `
                    <div class="event-item">
                        <div class="event-date">
                            <div class="day">${new Date(event.date).getDate()}</div>
                            <div class="month">${new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                        </div>
                        <div class="event-details">
                            <h3>${event.name}</h3>
                            <p>📍 ${event.venue}</p>
                            <p>⏰ ${new Date(event.date).toLocaleTimeString()}</p>
                        </div>
                        <button class="submit-btn" style="width: auto; margin-left: auto;" 
                                onclick="college.registerForEvent('${event.name}')">
                            Register
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderContact() {
        return `
            <div class="contact-form">
                <h2>Contact Us</h2>
                <form id="collegeContactForm">
                    <div class="form-group">
                        <label for="contactName">Name *</label>
                        <input type="text" id="contactName" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contactEmail">Email *</label>
                        <input type="email" id="contactEmail" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contactPhone">Phone</label>
                        <input type="tel" id="contactPhone">
                    </div>
                    
                    <div class="form-group">
                        <label for="contactSubject">Subject *</label>
                        <input type="text" id="contactSubject" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contactMessage">Message *</label>
                        <textarea id="contactMessage" rows="5" required></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
                
                <div style="margin-top: 40px; text-align: center;">
                    <h3>Visit Us</h3>
                    <p>📍 123 College Road, Tech City, State - 123456</p>
                    <p>📞 +1 234 567 8900</p>
                    <p>✉️ info@abccollege.edu</p>
                    <p>🕒 Mon-Fri: 9:00 AM - 5:00 PM</p>
                </div>
            </div>
        `;
    }

    setupContactForm() {
        const form = document.getElementById('collegeContactForm');
        if(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit();
            });
        }
    }

    handleContactSubmit() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        
        if(name && email && subject) {
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            document.getElementById('collegeContactForm').reset();
        } else {
            this.showNotification('Please fill all required fields.', 'error');
        }
    }

    showCourseDetails(courseName) {
        alert(`📚 ${courseName}\n\nFor more details, please contact the department office or visit during office hours.`);
    }

    registerForEvent(eventName) {
        if(confirm(`Register for ${eventName}?`)) {
            this.showNotification(`Successfully registered for ${eventName}!`, 'success');
        }
    }

    updateStats() {
        document.getElementById('foundedYear').textContent = this.data.stats.founded;
        document.getElementById('studentCount').textContent = this.data.stats.students;
        document.getElementById('facultyCount').textContent = this.data.stats.faculty;
        document.getElementById('placementRate').textContent = this.data.stats.placement;
    }

    updateCopyright() {
        const year = new Date().getFullYear();
        document.getElementById('copyright').textContent = `© ${year} ABC College. All rights reserved.`;
    }

    showLoading() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
    }

    hideLoading() {
        // Loading removed by content replacement
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize when DOM is loaded
let college;
document.addEventListener('DOMContentLoaded', () => {
    college = new CollegeWebsite();
    window.college = college; // For onclick handlers
});