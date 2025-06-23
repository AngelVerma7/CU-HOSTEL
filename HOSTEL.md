# CU Hostels Website

## Overview

This is a static website for Chandigarh University Hostels (both boys and girls), providing comprehensive information about hostel facilities, rules, room types, contacts, and other essential details for prospective and current residents. The website is built using vanilla HTML, CSS, and JavaScript with Bootstrap for responsive design.

## System Architecture

### Frontend Architecture
- **Static Website**: Multi-page HTML structure with shared navigation and styling
- **CSS Framework**: Bootstrap 5.3.0 for responsive design and UI components
- **Icons**: Font Awesome 6.4.0 for consistent iconography
- **JavaScript**: Vanilla JavaScript organized into modular files for different functionalities
- **TypeScript**: Type definitions provided for enhanced development experience

### Technology Stack
- **HTML5**: Semantic markup for all pages
- **CSS3**: Custom styling with CSS variables for consistent theming
- **JavaScript (ES6+)**: Interactive functionality and form handling
- **TypeScript**: Type definitions and interfaces
- **Bootstrap 5**: Responsive framework and components
- **Font Awesome**: Icon library

## Key Components

### Page Structure
- **index.html**: Homepage with hero section and overview
- **facilities.html**: Detailed information about hostel amenities
- **rules.html**: Rules and regulations for residents
- **rooms.html**: Room types, pricing, and availability
- **contacts.html**: Warden information and contact details
- **gallery.html**: Photo gallery of hostel facilities
- **faq.html**: Frequently asked questions

### JavaScript Modules
- **main.js**: Core functionality, navigation, and animations
- **gallery.js**: Image modal, carousel, and gallery interactions
- **forms.js**: Form validation and submission handling
- **main.ts**: TypeScript interfaces and type definitions

### Styling System
- **Color Scheme**: Red (#dc3545), Black (#000000), White (#ffffff)
- **CSS Variables**: Consistent theming and easy maintenance
- **Responsive Design**: Mobile-first approach using Bootstrap grid system

## Data Flow

### Static Content Delivery
1. HTML pages served directly to browser
2. CSS and JavaScript files loaded from relative paths
3. External CDN resources (Bootstrap, Font Awesome) loaded from CDNs
4. No backend data processing required

### Client-Side Interactions
1. Navigation handled through client-side routing
2. Form validation performed in browser before submission
3. Gallery interactions managed through JavaScript event handlers
4. Responsive behavior controlled by CSS media queries

## External Dependencies

### CDN Resources
- **Bootstrap**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`
- **Font Awesome**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`

### Runtime Dependencies
- No backend dependencies
- No database connections
- No external API integrations

## Deployment Strategy

### Current Setup
- **Development Server**: Python HTTP server on port 5000
- **Static Hosting**: Files served directly without processing
- **Environment**: Replit with Node.js 20 and Python 3.11 modules

### Deployment Configuration
```bash
python -m http.server 5000
```

### Production Considerations
- Can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages)
- No server-side processing required
- All assets are self-contained within the repository

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 23, 2025. Initial setup - Girls hostels only
- June 23, 2025. Updated to accommodate both boys and girls hostels - Added hostel type distinction section, updated all page titles and content to be inclusive, added new CSS styling for hostel type cards