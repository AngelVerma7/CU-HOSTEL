// CU Girls Hostels - TypeScript Main File
// Type definitions and interfaces for the hostel website

// Interface definitions
interface HostelRoom {
    id: string;
    type: 'single' | 'double';
    hasAC: boolean;
    price: number;
    features: string[];
    available: boolean;
}

interface Facility {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    timings?: string;
}

interface Warden {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    availability: string;
    qualifications: string;
    imageUrl?: string;
}

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    tags: string[];
}

interface ContactInfo {
    department: string;
    email: string;
    phone: string;
    timings: string;
    description: string;
}

interface FormData {
    [key: string]: string | boolean | number;
}

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
}

interface ValidationRules {
    [fieldName: string]: ValidationRule;
}

// Enums
enum RoomType {
    SINGLE_AC = 'single_ac',
    SINGLE_NON_AC = 'single_non_ac',
    DOUBLE_AC = 'double_ac',
    DOUBLE_NON_AC = 'double_non_ac'
}

enum FacilityCategory {
    ACCOMMODATION = 'accommodation',
    DINING = 'dining',
    RECREATION = 'recreation',
    SECURITY = 'security',
    UTILITIES = 'utilities'
}

enum NotificationType {
    SUCCESS = 'success',
    ERROR = 'danger',
    WARNING = 'warning',
    INFO = 'info'
}

// Main application class
class CUHostelsApp {
    private rooms: HostelRoom[] = [];
    private facilities: Facility[] = [];
    private wardens: Warden[] = [];
    private faqs: FAQ[] = [];
    private contacts: ContactInfo[] = [];

    constructor() {
        this.initializeData();
        this.bindEvents();
    }

    // Initialize data
    private initializeData(): void {
        this.loadRooms();
        this.loadFacilities();
        this.loadWardens();
        this.loadFAQs();
        this.loadContacts();
    }

    private loadRooms(): void {
        this.rooms = [
            {
                id: 'single_ac',
                type: 'single',
                hasAC: true,
                price: 85000,
                features: ['Private bathroom', 'Air conditioning', 'Study table', 'Wardrobe', 'Wi-Fi'],
                available: true
            },
            {
                id: 'single_non_ac',
                type: 'single',
                hasAC: false,
                price: 65000,
                features: ['Private bathroom', 'Ceiling fan', 'Study table', 'Wardrobe', 'Wi-Fi'],
                available: true
            },
            {
                id: 'double_ac',
                type: 'double',
                hasAC: true,
                price: 55000,
                features: ['Shared bathroom', 'Air conditioning', 'Two study tables', 'Individual wardrobes', 'Wi-Fi'],
                available: true
            },
            {
                id: 'double_non_ac',
                type: 'double',
                hasAC: false,
                price: 45000,
                features: ['Shared bathroom', 'Ceiling fans', 'Two study tables', 'Individual wardrobes', 'Wi-Fi'],
                available: true
            }
        ];
    }

    private loadFacilities(): void {
        this.facilities = [
            {
                id: 'wifi',
                name: 'High-Speed Internet',
                description: '24/7 Wi-Fi connectivity with 100+ Mbps speed',
                category: FacilityCategory.UTILITIES,
                icon: 'fas fa-wifi'
            },
            {
                id: 'security',
                name: '24/7 Security',
                description: 'CCTV surveillance and biometric entry system',
                category: FacilityCategory.SECURITY,
                icon: 'fas fa-shield-alt'
            },
            {
                id: 'mess',
                name: 'Mess & Dining',
                description: 'Nutritious 4-time meals with vegetarian and non-vegetarian options',
                category: FacilityCategory.DINING,
                icon: 'fas fa-utensils',
                timings: 'Breakfast: 7:00-9:30 AM, Lunch: 12:00-2:30 PM, Dinner: 7:30-10:00 PM'
            },
            {
                id: 'gym',
                name: 'Fitness & Recreation',
                description: 'Fully equipped gymnasium and recreational facilities',
                category: FacilityCategory.RECREATION,
                icon: 'fas fa-dumbbell'
            }
        ];
    }

    private loadWardens(): void {
        this.wardens = [
            {
                id: 'chief_warden',
                name: 'Dr. Priya Sharma',
                position: 'Chief Warden',
                email: 'priya.sharma@cuchd.in',
                phone: '+91-9876543211',
                availability: '9 AM - 8 PM',
                qualifications: 'M.A. in Psychology, 15+ years experience'
            },
            {
                id: 'assistant_warden_1',
                name: 'Ms. Anjali Gupta',
                position: 'Assistant Warden',
                email: 'anjali.gupta@cuchd.in',
                phone: '+91-9876543212',
                availability: '24/7 Emergency',
                qualifications: 'M.Sc. in Social Work'
            }
        ];
    }

    private loadFAQs(): void {
        this.faqs = [
            {
                id: 'timings',
                question: 'What are the hostel timings?',
                answer: 'Weekdays: 5:30 AM - 10:00 PM, Saturday: 5:30 AM - 11:00 PM, Sunday: 6:00 AM - 10:00 PM',
                category: 'general',
                tags: ['timings', 'entry', 'exit']
            },
            {
                id: 'wifi',
                question: 'Is Wi-Fi available in all rooms?',
                answer: 'Yes, high-speed Wi-Fi (100+ Mbps) is available throughout the hostel including all rooms.',
                category: 'facilities',
                tags: ['wifi', 'internet', 'facilities']
            }
        ];
    }

    private loadContacts(): void {
        this.contacts = [
            {
                department: 'Admissions Office',
                email: 'admissions@cuchd.in',
                phone: '+91-1234567890',
                timings: '9:00 AM - 5:00 PM (Mon-Fri)',
                description: 'New admissions, room allocation, admission queries'
            },
            {
                department: 'Accounts Office',
                email: 'accounts@cuchd.in',
                phone: '+91-1234567892',
                timings: '9:00 AM - 4:00 PM (Mon-Fri)',
                description: 'Fee payment, refunds, financial queries'
            }
        ];
    }

    // Event binding
    private bindEvents(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });
    }

    private initializeComponents(): void {
        this.initializeFormValidation();
        this.initializeSearch();
        this.initializeModals();
    }

    // Form validation
    private initializeFormValidation(): void {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form as HTMLFormElement)) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });
    }

    public validateForm(form: HTMLFormElement): boolean {
        const formData = new FormData(form);
        const data: FormData = {};
        
        formData.forEach((value, key) => {
            data[key] = value as string;
        });

        const rules = this.getValidationRules(form);
        return this.validateData(data, rules);
    }

    private getValidationRules(form: HTMLFormElement): ValidationRules {
        const rules: ValidationRules = {};
        
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            const name = (input as HTMLInputElement).name;
            if (name) {
                rules[name] = { required: true };
                
                // Add specific validation rules
                if ((input as HTMLInputElement).type === 'email') {
                    rules[name].pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                }
                
                if ((input as HTMLInputElement).type === 'tel') {
                    rules[name].pattern = /^[+]?[\d\s-()]+$/;
                }
            }
        });
        
        return rules;
    }

    private validateData(data: FormData, rules: ValidationRules): boolean {
        let isValid = true;
        
        for (const [field, rule] of Object.entries(rules)) {
            const value = data[field];
            
            if (rule.required && (!value || value.toString().trim() === '')) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else if (value && rule.pattern && !rule.pattern.test(value.toString())) {
                this.showFieldError(field, 'Please enter a valid value');
                isValid = false;
            } else if (rule.custom && !rule.custom(value)) {
                this.showFieldError(field, 'Invalid value');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        }
        
        return isValid;
    }

    private showFieldError(fieldName: string, message: string): void {
        const field = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
        if (field) {
            field.classList.add('is-invalid');
            
            // Remove existing error message
            const existingError = field.parentNode?.querySelector('.invalid-feedback');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = message;
            field.parentNode?.appendChild(errorDiv);
        }
    }

    private clearFieldError(fieldName: string): void {
        const field = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
        if (field) {
            field.classList.remove('is-invalid');
            const errorDiv = field.parentNode?.querySelector('.invalid-feedback');
            if (errorDiv) {
                errorDiv.remove();
            }
        }
    }

    // Search functionality
    private initializeSearch(): void {
        const searchInputs = document.querySelectorAll<HTMLInputElement>('.search-input');
        searchInputs.forEach(input => {
            let searchTimeout: number;
            
            input.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = window.setTimeout(() => {
                    this.performSearch((e.target as HTMLInputElement).value);
                }, 300);
            });
        });
    }

    private performSearch(query: string): void {
        if (!query.trim()) {
            this.showAllItems();
            return;
        }

        const searchResults = this.searchInData(query.toLowerCase());
        this.displaySearchResults(searchResults);
    }

    private searchInData(query: string): any[] {
        const results: any[] = [];
        
        // Search in FAQs
        this.faqs.forEach(faq => {
            if (faq.question.toLowerCase().includes(query) || 
                faq.answer.toLowerCase().includes(query) ||
                faq.tags.some(tag => tag.includes(query))) {
                results.push({ type: 'faq', data: faq });
            }
        });
        
        // Search in facilities
        this.facilities.forEach(facility => {
            if (facility.name.toLowerCase().includes(query) || 
                facility.description.toLowerCase().includes(query)) {
                results.push({ type: 'facility', data: facility });
            }
        });
        
        return results;
    }

    private displaySearchResults(results: any[]): void {
        // Implementation depends on specific UI requirements
        console.log('Search results:', results);
    }

    private showAllItems(): void {
        // Show all items when search is cleared
        const hiddenItems = document.querySelectorAll('[style*="display: none"]');
        hiddenItems.forEach(item => {
            (item as HTMLElement).style.display = '';
        });
    }

    // Modal functionality
    private initializeModals(): void {
        const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const roomType = (e.target as HTMLElement).getAttribute('data-room');
                if (roomType) {
                    this.populateBookingModal(roomType);
                }
            });
        });
    }

    private populateBookingModal(roomType: string): void {
        const room = this.rooms.find(r => r.id === roomType);
        if (room) {
            const select = document.getElementById('roomTypeSelect') as HTMLSelectElement;
            if (select) {
                select.value = roomType;
            }
        }
    }

    // Utility methods
    public getRoomById(id: string): HostelRoom | undefined {
        return this.rooms.find(room => room.id === id);
    }

    public getFacilitiesByCategory(category: FacilityCategory): Facility[] {
        return this.facilities.filter(facility => facility.category === category);
    }

    public searchFAQs(query: string): FAQ[] {
        return this.faqs.filter(faq => 
            faq.question.toLowerCase().includes(query.toLowerCase()) ||
            faq.answer.toLowerCase().includes(query.toLowerCase()) ||
            faq.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
    }

    public formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    }

    public showNotification(message: string, type: NotificationType = NotificationType.INFO): void {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1050;
            max-width: 300px;
        `;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Public API
    public getPublicAPI() {
        return {
            rooms: this.rooms,
            facilities: this.facilities,
            wardens: this.wardens,
            faqs: this.faqs,
            contacts: this.contacts,
            searchFAQs: this.searchFAQs.bind(this),
            formatCurrency: this.formatCurrency.bind(this),
            showNotification: this.showNotification.bind(this)
        };
    }
}

// Global type declarations
declare global {
    interface Window {
        CUHostelsTS: CUHostelsApp;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.CUHostelsTS = new CUHostelsApp();
});

// Export types for use in other files
export {
    HostelRoom,
    Facility,
    Warden,
    FAQ,
    ContactInfo,
    FormData,
    ValidationRule,
    ValidationRules,
    RoomType,
    FacilityCategory,
    NotificationType,
    CUHostelsApp
};
