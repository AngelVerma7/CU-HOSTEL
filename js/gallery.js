// CU Girls Hostels - Gallery JavaScript
(function() {
    'use strict';

    // Initialize gallery when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeGallery();
    });

    // Main gallery initialization
    function initializeGallery() {
        initializeImageModal();
        initializeCarousel();
        initializeGalleryTabs();
        initializeImageLazyLoading();
        initializeKeyboardNavigation();
        console.log('Gallery functionality initialized');
    }

    // Image modal functionality
    function initializeImageModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const imageModal = document.getElementById('imageModal');
        
        if (!imageModal) return;

        const modalTitle = document.getElementById('imageModalTitle');
        const modalImageTitle = document.getElementById('modalImageTitle');
        const modalDescription = document.getElementById('imageModalDescription');

        // Add click event to gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const title = this.getAttribute('data-title') || 'Image';
                const description = this.getAttribute('data-description') || 'No description available';
                
                // Update modal content
                if (modalTitle) modalTitle.textContent = title;
                if (modalImageTitle) modalImageTitle.textContent = title;
                if (modalDescription) modalDescription.textContent = description;

                // Add animation to modal image placeholder
                const modalImagePlaceholder = document.querySelector('.modal-image-placeholder');
                if (modalImagePlaceholder) {
                    modalImagePlaceholder.style.animation = 'modalImageFadeIn 0.3s ease';
                }
            });
        });

        // Reset animation when modal is hidden
        imageModal.addEventListener('hidden.bs.modal', function() {
            const modalImagePlaceholder = document.querySelector('.modal-image-placeholder');
            if (modalImagePlaceholder) {
                modalImagePlaceholder.style.animation = '';
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.classList.contains('show')) {
                const modalInstance = bootstrap.Modal.getInstance(imageModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        });
    }

    // Carousel functionality
    function initializeCarousel() {
        const carousel = document.getElementById('featuredCarousel');
        if (!carousel) return;

        // Add touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > threshold) {
                const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                if (carouselInstance) {
                    if (diff > 0) {
                        carouselInstance.next();
                    } else {
                        carouselInstance.prev();
                    }
                }
            }
        }

        // Auto-pause on hover
        carousel.addEventListener('mouseenter', function() {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.pause();
            }
        });

        carousel.addEventListener('mouseleave', function() {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.cycle();
            }
        });

        // Add loading states to carousel items
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, index) => {
            item.addEventListener('slide.bs.carousel', function() {
                this.style.opacity = '0.7';
            });

            item.addEventListener('slid.bs.carousel', function() {
                this.style.opacity = '1';
            });
        });
    }

    // Gallery tabs functionality
    function initializeGalleryTabs() {
        const tabButtons = document.querySelectorAll('#gallery-tab .nav-link');
        const tabPanes = document.querySelectorAll('#gallery-tabContent .tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-bs-target');
                const targetPane = document.querySelector(targetId);

                if (targetPane) {
                    // Add loading animation
                    targetPane.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        targetPane.style.opacity = '1';
                        
                        // Trigger lazy loading for images in the active tab
                        triggerLazyLoading(targetPane);
                        
                        // Add stagger animation to gallery items
                        const galleryItems = targetPane.querySelectorAll('.gallery-item');
                        galleryItems.forEach((item, index) => {
                            item.style.animation = `galleryItemFadeIn 0.3s ease ${index * 0.1}s both`;
                        });
                    }, 200);
                }

                // Update URL hash for bookmarking
                const tabId = targetId.replace('#', '');
                if (history.pushState) {
                    history.pushState(null, null, `#${tabId}`);
                }
            });
        });

        // Handle direct URL access with hash
        const hash = window.location.hash;
        if (hash) {
            const targetButton = document.querySelector(`[data-bs-target="${hash}"]`);
            if (targetButton) {
                targetButton.click();
            }
        }
    }

    // Lazy loading for gallery images
    function initializeImageLazyLoading() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    loadGalleryItem(item);
                    observer.unobserve(item);
                }
            });
        }, {
            rootMargin: '50px'
        });

        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }

    function loadGalleryItem(item) {
        // Add loaded class for styling
        item.classList.add('loaded');
        
        // Add entrance animation
        item.style.animation = 'galleryItemFadeIn 0.5s ease both';
    }

    function triggerLazyLoading(container) {
        const items = container.querySelectorAll('.gallery-item:not(.loaded)');
        items.forEach(item => {
            loadGalleryItem(item);
        });
    }

    // Keyboard navigation
    function initializeKeyboardNavigation() {
        const imageModal = document.getElementById('imageModal');
        if (!imageModal) return;

        document.addEventListener('keydown', function(e) {
            if (!imageModal.classList.contains('show')) return;

            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateGallery('prev');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateGallery('next');
                    break;
            }
        });
    }

    function navigateGallery(direction) {
        const activeTab = document.querySelector('#gallery-tabContent .tab-pane.active');
        if (!activeTab) return;

        const galleryItems = activeTab.querySelectorAll('.gallery-item');
        const currentModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        
        if (!currentModal || galleryItems.length === 0) return;

        // Find currently displayed item (this is a simplified version)
        // In a real implementation, you'd track the current index
        const currentTitle = document.getElementById('imageModalTitle')?.textContent;
        let currentIndex = -1;

        galleryItems.forEach((item, index) => {
            if (item.getAttribute('data-title') === currentTitle) {
                currentIndex = index;
            }
        });

        if (currentIndex === -1) return;

        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % galleryItems.length;
        } else {
            nextIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
        }

        // Trigger click on next/previous item
        galleryItems[nextIndex].click();
    }

    // Gallery search functionality
    function initializeGallerySearch() {
        const searchInput = document.getElementById('gallerySearch');
        if (!searchInput) return;

        let searchTimeout;

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterGalleryItems(query);
            }, 300);
        });
    }

    function filterGalleryItems(query) {
        const allGalleryItems = document.querySelectorAll('.gallery-item');
        
        allGalleryItems.forEach(item => {
            const title = item.getAttribute('data-title')?.toLowerCase() || '';
            const description = item.getAttribute('data-description')?.toLowerCase() || '';
            
            const matches = query === '' || title.includes(query) || description.includes(query);
            
            item.style.display = matches ? 'block' : 'none';
            
            if (matches && query !== '') {
                item.classList.add('search-highlight');
            } else {
                item.classList.remove('search-highlight');
            }
        });

        // Show "no results" message if needed
        showNoResultsMessage(query);
    }

    function showNoResultsMessage(query) {
        if (!query) {
            removeNoResultsMessage();
            return;
        }

        const activeTab = document.querySelector('#gallery-tabContent .tab-pane.active');
        if (!activeTab) return;

        const visibleItems = activeTab.querySelectorAll('.gallery-item[style*="block"], .gallery-item:not([style*="none"])');
        
        if (visibleItems.length === 0) {
            let noResultsMsg = activeTab.querySelector('.no-results-message');
            
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message text-center py-5';
                noResultsMsg.innerHTML = `
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5>No results found</h5>
                    <p class="text-muted">Try searching with different keywords</p>
                `;
                activeTab.appendChild(noResultsMsg);
            }
        } else {
            removeNoResultsMessage();
        }
    }

    function removeNoResultsMessage() {
        const noResultsMessages = document.querySelectorAll('.no-results-message');
        noResultsMessages.forEach(msg => msg.remove());
    }

    // Fullscreen functionality
    function initializeFullscreen() {
        const imageModal = document.getElementById('imageModal');
        if (!imageModal) return;

        // Add fullscreen button to modal
        const modalHeader = imageModal.querySelector('.modal-header');
        if (modalHeader) {
            const fullscreenBtn = document.createElement('button');
            fullscreenBtn.type = 'button';
            fullscreenBtn.className = 'btn btn-outline-secondary me-2';
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            fullscreenBtn.title = 'Fullscreen';
            
            fullscreenBtn.addEventListener('click', toggleFullscreen);
            modalHeader.insertBefore(fullscreenBtn, modalHeader.querySelector('.btn-close'));
        }
    }

    function toggleFullscreen() {
        const imageModal = document.getElementById('imageModal');
        
        if (!document.fullscreenElement) {
            imageModal.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Download functionality
    function initializeDownload() {
        const imageModal = document.getElementById('imageModal');
        if (!imageModal) return;

        const modalHeader = imageModal.querySelector('.modal-header');
        if (modalHeader) {
            const downloadBtn = document.createElement('button');
            downloadBtn.type = 'button';
            downloadBtn.className = 'btn btn-outline-primary me-2';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
            downloadBtn.title = 'Download';
            
            downloadBtn.addEventListener('click', downloadCurrentImage);
            modalHeader.insertBefore(downloadBtn, modalHeader.querySelector('.btn-close'));
        }
    }

    function downloadCurrentImage() {
        const title = document.getElementById('imageModalTitle')?.textContent || 'hostel-image';
        
        // Create a canvas to generate a placeholder image for download
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 800;
        canvas.height = 600;
        
        // Fill with light gray background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add border
        ctx.strokeStyle = '#dee2e6';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.fillStyle = '#6c757d';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, canvas.height / 2);
        
        // Download the canvas as image
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Share functionality
    function initializeShare() {
        const imageModal = document.getElementById('imageModal');
        if (!imageModal) return;

        const modalHeader = imageModal.querySelector('.modal-header');
        if (modalHeader && navigator.share) {
            const shareBtn = document.createElement('button');
            shareBtn.type = 'button';
            shareBtn.className = 'btn btn-outline-success me-2';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
            shareBtn.title = 'Share';
            
            shareBtn.addEventListener('click', shareCurrentImage);
            modalHeader.insertBefore(shareBtn, modalHeader.querySelector('.btn-close'));
        }
    }

    function shareCurrentImage() {
        const title = document.getElementById('imageModalTitle')?.textContent || 'CU Girls Hostels';
        const description = document.getElementById('imageModalDescription')?.textContent || '';
        
        if (navigator.share) {
            navigator.share({
                title: title,
                text: description,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback: copy URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                if (window.CUHostels) {
                    window.CUHostels.showNotification('Link copied to clipboard!', 'success');
                }
            });
        }
    }

    // Initialize additional features
    initializeGallerySearch();
    initializeFullscreen();
    initializeDownload();
    initializeShare();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes galleryItemFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes modalImageFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .gallery-item.search-highlight {
            border: 2px solid var(--primary-red);
            transform: scale(1.02);
        }
        
        .gallery-item.loaded {
            opacity: 1;
        }
        
        .no-results-message {
            grid-column: 1 / -1;
        }
        
        @media (max-width: 768px) {
            .gallery-item {
                height: 180px;
            }
        }
    `;
    document.head.appendChild(style);

    // Export functions for external use
    window.GalleryManager = {
        filterItems: filterGalleryItems,
        navigateGallery: navigateGallery,
        toggleFullscreen: toggleFullscreen,
        downloadImage: downloadCurrentImage,
        shareImage: shareCurrentImage
    };

})();
