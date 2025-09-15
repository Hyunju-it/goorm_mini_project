// YouTube Clone JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('YouTube Clone loaded');

    // Menu toggle functionality
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('sidebar-collapsed');
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('검색어:', query);
            // 실제 검색 로직은 여기에 구현
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Video item click handlers
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.video-title').textContent;
            console.log('비디오 클릭:', title);
            // 비디오 재생 페이지로 이동하는 로직
        });
    });

    // Sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            const text = this.querySelector('span').textContent;
            console.log('사이드바 메뉴 클릭:', text);
        });
    });

    // Enhanced image handling with better error recovery
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading class initially
        img.classList.add('loading');

        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.style.opacity = '1';
        });

        img.addEventListener('error', function() {
            this.classList.remove('loading');
            console.log('Image failed to load:', this.src);

            if (this.classList.contains('profile-img')) {
                // Use a default profile image from Unsplash
                this.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face&auto=format&q=80';
            } else if (this.classList.contains('channel-avatar')) {
                // Use a default avatar
                this.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&crop=face&auto=format&q=80';
            } else if (this.parentElement.classList.contains('video-thumbnail')) {
                // Use a default video thumbnail
                this.src = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=320&h=180&fit=crop&auto=format&q=80';
            }

            // If even the fallback fails, create a styled placeholder
            this.addEventListener('error', function() {
                this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                this.style.color = 'white';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.fontSize = '24px';
                this.innerHTML = '🎥';
                this.removeAttribute('src');
            }, { once: true });
        });

        // Add intersection observer for lazy loading optimization
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        }
    });

    // Responsive sidebar toggle for mobile
    function handleResize() {
        const width = window.innerWidth;
        if (width <= 768) {
            sidebar.style.display = 'none';
            content.style.marginLeft = '0';
        } else if (width <= 1024) {
            sidebar.style.display = 'block';
            sidebar.style.width = '72px';
            content.style.marginLeft = '72px';
        } else {
            sidebar.style.display = 'block';
            sidebar.style.width = '240px';
            content.style.marginLeft = '240px';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Simulate loading delay and show content
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Utility functions
function formatViewCount(count) {
    if (count >= 1000000) {
        return Math.floor(count / 100000) / 10 + 'M';
    } else if (count >= 1000) {
        return Math.floor(count / 100) / 10 + 'K';
    }
    return count.toString();
}

function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}일 전`;
    } else if (hours > 0) {
        return `${hours}시간 전`;
    } else if (minutes > 0) {
        return `${minutes}분 전`;
    } else {
        return `방금 전`;
    }
}