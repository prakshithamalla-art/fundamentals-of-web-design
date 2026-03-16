// Registration Form JavaScript - External file

class RegistrationForm {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.students = this.loadStudents() || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayRegisteredUsers();
    }

    setupEventListeners() {
        // Form submit
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetForm());
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if(this.validateForm()) {
            const studentData = this.getFormData();
            this.students.push(studentData);
            this.saveStudents();
            this.displayRegisteredUsers();
            this.showSuccess('Registration successful!');
            this.form.reset();
        } else {
            this.showError('Please fix all errors before submitting.');
        }
    }

    validateForm() {
        let isValid = true;
        const fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 
                       'phone', 'dob', 'gender', 'course', 'terms'];
        
        fields.forEach(field => {
            if(!this.validateFieldByName(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(input) {
        const field = input.id || input.name;
        return this.validateFieldByName(field);
    }

    validateFieldByName(field) {
        let isValid = true;
        let value = '';

        switch(field) {
            case 'firstName':
                value = document.getElementById('firstName').value;
                if(!value || value.length < 2) {
                    this.showFieldError('firstName', 'First name must be at least 2 characters');
                    isValid = false;
                } else {
                    this.clearFieldError(document.getElementById('firstName'));
                }
                break;

            case 'lastName':
                value = document.getElementById('lastName').value;
                if(!value || value.length < 2) {
                    this.showFieldError('lastName', 'Last name must be at least 2 characters');
                    isValid = false;
                } else {
                    this.clearFieldError(document.getElementById('lastName'));
                }
                break;

            case 'email':
                value = document.getElementById('email').value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailRegex.test(value)) {
                    this.showFieldError('email', 'Please enter a valid email');
                    isValid = false;
                } else {
                    this.clearFieldError(document.getElementById('email'));
                }
                break;

            case 'password':
                value = document.getElementById('password').value;
                if(value.length < 8) {
                    this.showFieldError('password', 'Password must be at least 8 characters');
                    isValid = false;
                } else {
                    this.clearFieldError(document.getElementById('password'));
                }
                break;

            case 'confirmPassword':
                value = document.getElementById('confirmPassword').value;
                const password = document.getElementById('password').value;
                if(value !== password) {
                    this.showFieldError('confirmPassword', 'Passwords do not match');
                    isValid = false;
                } else {
                    this.clearFieldError(document.getElementById('confirmPassword'));
                }
                break;

            case 'phone':
                value = document.getElementById('phone').value;
                const phoneRegex = /^\d{10}$/;
                if(!phoneRegex.test(value)) {
                    this.showFieldError('phone', 'Please enter a valid 10-digit phone number');
                    isValid = false;
                } else {
                    this.clearFieldError(document.getElementById('phone'));
                }
                break;

            case 'dob':
                value = document.getElementById('dob').value;
                if(!value) {
                    this.showFieldError('dob', 'Please select date of birth');
                    isValid = false;
                } else {
                    const age = this.calculateAge(new Date(value));
                    if(age < 16) {
                        this.showFieldError('dob', 'You must be at least 16 years old');
                        isValid = false;
                    } else {
                        this.clearFieldError(document.getElementById('dob'));
                    }
                }
                break;

            case 'gender':
                const genderInputs = document.getElementsByName('gender');
                const selected = Array.from(genderInputs).find(input => input.checked);
                if(!selected) {
                    this.showFieldError('gender', 'Please select gender');
                    isValid = false;
                } else {
                    this.clearFieldError(document.querySelector('[name="gender"]'));
                }
                break;

            case 'course':
                value = document.getElementById('course').value;
                if(!value) {
                    this.showFieldError('course', 'Please select a course');
                    isValid = false;
                } else {
                    this.clearFieldError(document.getElementById('course'));
                }
                break;

            case 'terms':
                const terms = document.getElementById('terms');
                if(!terms.checked) {
                    this.showFieldError('terms', 'You must agree to terms');
                    isValid = false;
                } else {
                    this.clearFieldError(terms);
                }
                break;
        }

        return isValid;
    }

    getFormData() {
        const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
            .map(input => input.value);
        
        return {
            id: Date.now(),
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value,
            course: document.getElementById('course').value,
            address: document.getElementById('address').value,
            interests: interests,
            registeredAt: new Date().toISOString()
        };
    }

    displayRegisteredUsers() {
        const container = document.getElementById('usersList');
        if(!container) return;

        if(this.students.length === 0) {
            container.innerHTML = '<p>No registered students yet.</p>';
            return;
        }

        container.innerHTML = this.students.map(student => `
            <div class="user-card">
                <button class="delete-btn" onclick="registration.deleteStudent(${student.id})">Delete</button>
                <h4>${student.firstName} ${student.lastName}</h4>
                <p>📧 ${student.email}</p>
                <p>📱 ${student.phone}</p>
                <p>🎓 ${this.getCourseName(student.course)}</p>
                <p>📅 DOB: ${new Date(student.dob).toLocaleDateString()}</p>
                <p>⭐ Interests: ${student.interests.length ? student.interests.join(', ') : 'None'}</p>
            </div>
        `).join('');
    }

    getCourseName(courseCode) {
        const courses = {
            'cse': 'Computer Science Engineering',
            'ece': 'Electronics & Communication',
            'me': 'Mechanical Engineering',
            'ce': 'Civil Engineering'
        };
        return courses[courseCode] || courseCode;
    }

    deleteStudent(id) {
        if(confirm('Are you sure you want to delete this student?')) {
            this.students = this.students.filter(s => s.id !== id);
            this.saveStudents();
            this.displayRegisteredUsers();
            this.showSuccess('Student deleted successfully!');
        }
    }

    calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    showFieldError(fieldId, message) {
        const errorDiv = document.getElementById(fieldId + 'Error');
        const input = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
        
        if(errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
        
        if(input) {
            input.classList.add('error');
        }
    }

    clearFieldError(input) {
        const fieldId = input.id || input.name;
        const errorDiv = document.getElementById(fieldId + 'Error');
        
        if(errorDiv) {
            errorDiv.style.display = 'none';
        }
        
        input.classList.remove('error');
    }

    showSuccess(message) {
        const successDiv = document.getElementById('successMessage');
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }

    resetForm() {
        this.form.reset();
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.style.display = 'none');
        
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => input.classList.remove('error'));
    }

    saveStudents() {
        localStorage.setItem('registeredStudents', JSON.stringify(this.students));
    }

    loadStudents() {
        const saved = localStorage.getItem('registeredStudents');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize when DOM is loaded
let registration;
document.addEventListener('DOMContentLoaded', () => {
    registration = new RegistrationForm();
    window.registration = registration; // For delete function
});