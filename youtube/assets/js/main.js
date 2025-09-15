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

    // Handle placeholder images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create placeholder with gradient background
            this.style.backgroundColor = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';

            if (this.classList.contains('profile-img')) {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
            } else if (this.classList.contains('channel-avatar')) {
                this.parentElement.innerHTML = '<div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">📺</div>';
            } else {
                this.parentElement.innerHTML = '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; border-radius: 12px;">📹</div>';
            }
        });
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