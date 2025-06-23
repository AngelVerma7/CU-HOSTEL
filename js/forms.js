// CU Girls Hostels - Forms JavaScript
(function() {
    'use strict';

    // Form validation rules
    const validationRules = {
        required: {
            test: (value) => value && value.trim() !== '',
            message: 'This field is required'
        },
        email: {
            test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        phone: {
            test: (value) => /^[+]?[\d\s\-\(\)]{10,}$/.test(value),
            message: 'Please enter a valid phone number'
        },
        minLength: (min) => ({
            test: (value) => value.length >= min,
            message: `Must be at least ${min} characters long`
        }),
        maxLength: (max) => ({
            test: (value) => value.length <= max,
            message: `Must be no more than ${max} characters long`
        }),
        studentId: {
            test: (value) => /^[A-Z0-9]{6,12}$/.test(value),
            message: 'Student ID must be 6-12 alphanumeric characters'
        }
    };

    // Initialize forms when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeForms();
    });

    // Main forms initialization
    function initializeForms() {
        initializeFormValidation();
        initializeFormSubmission();
        initializeRealTimeValidation();
        initializeFormEnhancements();
        initializeSpecialForms();
        console.log('Forms functionality initialized');
    }

    // Form validation initialization
    function initializeFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm(this)) {
                    handleFormSubmission(this);
                } else {
                    showFormErrors(this);
                }
            });

            // Add Bootstrap validation classes
            form.classList.add('needs-validation');
            form.noValidate = true;
        });
    }

    // Real-time validation
    function initializeRealTimeValidation() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });

            // Clear errors on input
            input.addEventListener('input', function() {
                clearFieldError(this);
                
                // Real-time validation for certain fields
                if (this.type === 'email' || this.type === 'tel') {
                    debounce(() => validateField(this), 500)();
                }
            });

            // Special handling for select elements
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', function() {
                    validateField(this);
                });
            }
        });
    }

    // Form validation function
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        let isValid = true;
        let errorMessage = '';

        // Clear previous validation state
        clearFieldError(field);

        // Required validation
        if (field.hasAttribute('required') && !validationRules.required.test(value)) {
            isValid = false;
            errorMessage = validationRules.required.message;
        }

        // Type-specific validation (only if field has value)
        if (value && isValid) {
            switch (field.type) {
                case 'email':
                    if (!validationRules.email.test(value)) {
                        isValid = false;
                        errorMessage = validationRules.email.message;
                    }
                    break;
                case 'tel':
                    if (!validationRules.phone.test(value)) {
                        isValid = false;
                        errorMessage = validationRules.phone.message;
                    }
                    break;
            }

            // Custom validation based on field name
            if (isValid) {
                switch (fieldName) {
                    case 'studentId':
                        if (!validationRules.studentId.test(value)) {
                            isValid = false;
                            errorMessage = validationRules.studentId.message;
                        }
                        break;
                }
            }

            // Length validation
            const minLength = field.getAttribute('minlength');
            const maxLength = field.getAttribute('maxlength');

            if (minLength && !validationRules.minLength(parseInt(minLength)).test(value)) {
                isValid = false;
                errorMessage = validationRules.minLength(parseInt(minLength)).message;
            }

            if (maxLength && !validationRules.maxLength(parseInt(maxLength)).test(value)) {
                isValid = false;
                errorMessage = validationRules.maxLength(parseInt(maxLength)).message;
            }
        }

        // Apply validation state
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    // Show field error
    function showFieldError(field, message) {
        let errorDiv = field.parentNode.querySelector('.invalid-feedback');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            field.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    // Clear field error
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    // Show form errors summary
    function showFormErrors(form) {
        const invalidFields = form.querySelectorAll('.is-invalid');
        
        if (invalidFields.length > 0) {
            // Focus on first invalid field
            invalidFields[0].focus();
            
            // Show notification
            if (window.CUHostels) {
                window.CUHostels.showNotification(
                    `Please correct ${invalidFields.length} error(s) before submitting.`,
                    'warning'
                );
            }
        }
    }

    // Form submission handling
    function initializeFormSubmission() {
        // This would typically involve sending data to a server
        // For now, we'll simulate the process
    }

    function handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Show loading state
        showLoadingState(submitBtn);
        
        // Simulate form submission
        setTimeout(() => {
            simulateFormSubmission(form, formData);
        }, 2000);
    }

    function simulateFormSubmission(form, formData) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Get form type
        const formType = getFormType(form);
        
        // Hide loading state
        hideLoadingState(submitBtn);
        
        // Show success message
        showSuccessMessage(formType);
        
        // Reset form
        form.reset();
        form.querySelectorAll('.is-valid').forEach(field => {
            field.classList.remove('is-valid');
        });
        
        // Close modal if form is in modal
        const modal = form.closest('.modal');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
        
        // Log form data (in production, this would be sent to server)
        console.log('Form submitted:', Object.fromEntries(formData));
    }

    function getFormType(form) {
        if (form.id === 'bookingForm') return 'booking';
        if (form.id === 'contactForm') return 'contact';
        if (form.closest('#bookingModal')) return 'booking';
        return 'form';
    }

    function showSuccessMessage(formType) {
        let message = 'Form submitted successfully!';
        
        switch (formType) {
            case 'booking':
                message = 'Your booking inquiry has been submitted! We will contact you within 24 hours.';
                break;
            case 'contact':
                message = 'Thank you for your message! We will get back to you soon.';
                break;
        }
        
        if (window.CUHostels) {
            window.CUHostels.showNotification(message, 'success');
        }
    }

    // Loading state management
    function showLoadingState(button) {
        if (!button) return;
        
        button.originalText = button.innerHTML;
        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        button.disabled = true;
    }

    function hideLoadingState(button) {
        if (!button) return;
        
        button.innerHTML = button.originalText || 'Submit';
        button.disabled = false;
    }

    // Form enhancements
    function initializeFormEnhancements() {
        initializeFileUpload();
        initializePasswordToggle();
        initializeFormStepper();
        initializeConditionalFields();
        initializeFormAutoSave();
    }

    // File upload enhancement
    function initializeFileUpload() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'file-upload-wrapper';
            
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            
            const label = document.createElement('label');
            label.className = 'file-upload-label btn btn-outline-primary';
            label.innerHTML = '<i class="fas fa-upload me-2"></i>Choose File';
            label.setAttribute('for', input.id);
            wrapper.appendChild(label);
            
            const fileInfo = document.createElement('div');
            fileInfo.className = 'file-info mt-2 text-muted';
            wrapper.appendChild(fileInfo);
            
            input.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const file = this.files[0];
                    fileInfo.textContent = `Selected: ${file.name} (${formatFileSize(file.size)})`;
                    label.innerHTML = '<i class="fas fa-check me-2"></i>File Selected';
                    label.classList.remove('btn-outline-primary');
                    label.classList.add('btn-success');
                } else {
                    fileInfo.textContent = '';
                    label.innerHTML = '<i class="fas fa-upload me-2"></i>Choose File';
                    label.classList.remove('btn-success');
                    label.classList.add('btn-outline-primary');
                }
            });
        });
    }

    // Password toggle functionality
    function initializePasswordToggle() {
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        
        passwordInputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-group';
            
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'btn btn-outline-secondary';
            toggleBtn.type = 'button';
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
            
            const btnWrapper = document.createElement('div');
            btnWrapper.className = 'input-group-append';
            btnWrapper.appendChild(toggleBtn);
            wrapper.appendChild(btnWrapper);
            
            toggleBtn.addEventListener('click', function() {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    this.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        });
    }

    // Form stepper for multi-step forms
    function initializeFormStepper() {
        const stepperForms = document.querySelectorAll('.form-stepper');
        
        stepperForms.forEach(form => {
            const steps = form.querySelectorAll('.step');
            const nextBtns = form.querySelectorAll('.btn-next');
            const prevBtns = form.querySelectorAll('.btn-prev');
            let currentStep = 0;
            
            function showStep(step) {
                steps.forEach((s, index) => {
                    s.style.display = index === step ? 'block' : 'none';
                });
                
                // Update progress indicator
                const progressBar = form.querySelector('.progress-bar');
                if (progressBar) {
                    const progress = ((step + 1) / steps.length) * 100;
                    progressBar.style.width = `${progress}%`;
                }
            }
            
            nextBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const currentStepElement = steps[currentStep];
                    const inputs = currentStepElement.querySelectorAll('input, textarea, select');
                    let stepValid = true;
                    
                    inputs.forEach(input => {
                        if (!validateField(input)) {
                            stepValid = false;
                        }
                    });
                    
                    if (stepValid && currentStep < steps.length - 1) {
                        currentStep++;
                        showStep(currentStep);
                    }
                });
            });
            
            prevBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (currentStep > 0) {
                        currentStep--;
                        showStep(currentStep);
                    }
                });
            });
            
            // Initialize first step
            showStep(0);
        });
    }

    // Conditional fields
    function initializeConditionalFields() {
        const conditionalFields = document.querySelectorAll('[data-depends-on]');
        
        conditionalFields.forEach(field => {
            const dependsOn = field.getAttribute('data-depends-on');
            const dependsValue = field.getAttribute('data-depends-value');
            const triggerField = document.querySelector(`[name="${dependsOn}"]`);
            
            if (triggerField) {
                function toggleField() {
                    const shouldShow = triggerField.value === dependsValue;
                    field.style.display = shouldShow ? 'block' : 'none';
                    
                    // Clear field if hidden
                    if (!shouldShow) {
                        const inputs = field.querySelectorAll('input, textarea, select');
                        inputs.forEach(input => {
                            input.value = '';
                            clearFieldError(input);
                        });
                    }
                }
                
                triggerField.addEventListener('change', toggleField);
                toggleField(); // Initial state
            }
        });
    }

    // Form auto-save
    function initializeFormAutoSave() {
        const autoSaveForms = document.querySelectorAll('.auto-save');
        
        autoSaveForms.forEach(form => {
            const formId = form.id || 'auto-save-form';
            
            // Load saved data
            loadFormData(form, formId);
            
            // Save on input
            form.addEventListener('input', debounce(() => {
                saveFormData(form, formId);
            }, 1000));
        });
    }

    function saveFormData(form, formId) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (window.CUHostels && window.CUHostels.storage) {
            window.CUHostels.storage.set(`form_${formId}`, data);
        }
    }

    function loadFormData(form, formId) {
        if (window.CUHostels && window.CUHostels.storage) {
            const data = window.CUHostels.storage.get(`form_${formId}`);
            
            if (data) {
                Object.entries(data).forEach(([name, value]) => {
                    const field = form.querySelector(`[name="${name}"]`);
                    if (field && value) {
                        field.value = value;
                    }
                });
            }
        }
    }

    // Special form handling
    function initializeSpecialForms() {
        initializeBookingForm();
        initializeContactForm();
        initializeSearchForm();
    }

    // Booking form specific functionality
    function initializeBookingForm() {
        const bookingModal = document.getElementById('bookingModal');
        if (!bookingModal) return;
        
        bookingModal.addEventListener('show.bs.modal', function(e) {
            const trigger = e.relatedTarget;
            const roomType = trigger ? trigger.getAttribute('data-room') : null;
            
            if (roomType) {
                const select = this.querySelector('#roomTypeSelect');
                if (select) {
                    select.value = roomType;
                    
                    // Trigger change event to update any dependent fields
                    select.dispatchEvent(new Event('change'));
                }
            }
        });
    }

    // Contact form specific functionality
    function initializeContactForm() {
        const contactForms = document.querySelectorAll('#contactForm');
        
        contactForms.forEach(form => {
            const subjectSelect = form.querySelector('select');
            const messageTextarea = form.querySelector('textarea');
            
            if (subjectSelect && messageTextarea) {
                subjectSelect.addEventListener('change', function() {
                    const placeholders = {
                        admission: 'Please provide details about your admission query...',
                        maintenance: 'Please describe the maintenance issue and your room details...',
                        complaint: 'Please describe your complaint in detail...',
                        suggestion: 'We value your suggestions for improving our services...',
                        other: 'Please describe your query or concern...'
                    };
                    
                    messageTextarea.placeholder = placeholders[this.value] || placeholders.other;
                });
            }
        });
    }

    // Search form functionality
    function initializeSearchForm() {
        const searchForms = document.querySelectorAll('.search-form');
        
        searchForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const query = this.querySelector('input[type="search"], input[type="text"]').value;
                performSearch(query);
            });
        });
    }

    function performSearch(query) {
        // This would typically involve actual search functionality
        console.log('Searching for:', query);
        
        if (window.CUHostels) {
            window.CUHostels.showNotification(`Searching for: ${query}`, 'info');
        }
    }

    // Utility functions
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

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Export functions for external use
    window.FormsManager = {
        validateForm: validateForm,
        validateField: validateField,
        showLoadingState: showLoadingState,
        hideLoadingState: hideLoadingState,
        saveFormData: saveFormData,
        loadFormData: loadFormData
    };

    // Add CSS for form enhancements
    const style = document.createElement('style');
    style.textContent = `
        .file-upload-wrapper {
            position: relative;
        }
        
        .file-upload-wrapper input[type="file"] {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .file-upload-label {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .file-upload-label:hover {
            transform: translateY(-2px);
        }
        
        .form-stepper .step {
            display: none;
        }
        
        .form-stepper .step.active {
            display: block;
        }
        
        .is-invalid {
            border-color: #dc3545;
        }
        
        .is-valid {
            border-color: #28a745;
        }
        
        .invalid-feedback {
            display: none;
            color: #dc3545;
            font-size: 0.875em;
            margin-top: 0.25rem;
        }
        
        .is-invalid ~ .invalid-feedback {
            display: block;
        }
        
        .spinner-border-sm {
            width: 1rem;
            height: 1rem;
        }
        
        @media (max-width: 768px) {
            .form-stepper .btn-group {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        }
    `;
    document.head.appendChild(style);

})();
