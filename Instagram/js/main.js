// Instagram Clone Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Handle comment form interactions
    initializeCommentForms();

    // Handle like button interactions
    initializeLikeButtons();

    // Handle story interactions
    initializeStories();

    // Handle search functionality
    initializeSearch();

    // Handle navigation
    initializeNavigation();
}

// Comment Form Handling
function initializeCommentForms() {
    const commentForms = document.querySelectorAll('.comment-form');

    commentForms.forEach(form => {
        const input = form.querySelector('.comment-input');
        const submitBtn = form.querySelector('.comment-submit');

        input.addEventListener('input', function() {
            if (this.value.trim()) {
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            } else {
                submitBtn.style.opacity = '0.3';
                submitBtn.style.cursor = 'not-allowed';
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value.trim()) {
                addComment(this, input.value.trim());
                input.value = '';
                submitBtn.style.opacity = '0.3';
                submitBtn.style.cursor = 'not-allowed';
            }
        });
    });
}

function addComment(form, commentText) {
    const post = form.closest('.post');
    const commentsContainer = post.querySelector('.post-info');
    const timeElement = post.querySelector('.post-time');

    // Create new comment element
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <span class="comment-username"><strong>my_username</strong></span>
        <span class="comment-text">${commentText}</span>
    `;

    // Insert before the time element
    commentsContainer.insertBefore(newComment, timeElement);

    // Update comment count if exists
    const viewCommentsBtn = post.querySelector('.view-comments');
    if (viewCommentsBtn) {
        const currentText = viewCommentsBtn.textContent;
        const match = currentText.match(/(\d+)/);
        if (match) {
            const newCount = parseInt(match[1]) + 1;
            viewCommentsBtn.textContent = `댓글 ${newCount}개 모두 보기`;
        }
    }
}

// Like Button Handling
function initializeLikeButtons() {
    const likeButtons = document.querySelectorAll('.action-button');

    likeButtons.forEach(button => {
        if (button.querySelector('.icon-heart')) {
            button.addEventListener('click', function() {
                toggleLike(this);
            });
        }
    });
}

function toggleLike(button) {
    const post = button.closest('.post');
    const likesElement = post.querySelector('.likes-count');
    const heartIcon = button.querySelector('.icon-heart');

    // Toggle like state
    const isLiked = button.classList.toggle('liked');

    if (isLiked) {
        heartIcon.style.filter = 'hue-rotate(320deg) saturate(2)';
        // Increase like count
        const currentText = likesElement.textContent;
        const match = currentText.match(/(\d+)/);
        if (match) {
            const newCount = parseInt(match[1]) + 1;
            likesElement.innerHTML = `<strong>좋아요 ${newCount}개</strong>`;
        }
    } else {
        heartIcon.style.filter = 'none';
        // Decrease like count
        const currentText = likesElement.textContent;
        const match = currentText.match(/(\d+)/);
        if (match) {
            const newCount = Math.max(0, parseInt(match[1]) - 1);
            likesElement.innerHTML = `<strong>좋아요 ${newCount}개</strong>`;
        }
    }
}

// Story Handling
function initializeStories() {
    const storyButtons = document.querySelectorAll('.story-button');

    storyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const username = this.querySelector('.story-username').textContent;
            showStoryModal(username);
        });
    });
}

function showStoryModal(username) {
    // Simple alert for demo purposes
    alert(`${username}의 스토리를 보고 있습니다.`);
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                performSearch(query);
            }
        });

        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
}

function performSearch(query) {
    console.log(`검색 중: ${query}`);
    // 실제 구현에서는 여기서 검색 API를 호출하거나 로컬 데이터를 필터링
}

// Navigation Handling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Handle navigation based on href
            const href = this.getAttribute('href');
            handleNavigation(href);
        });
    });
}

function handleNavigation(href) {
    switch(href) {
        case '/':
            console.log('홈으로 이동');
            break;
        case '/explore':
            console.log('탐색 페이지로 이동');
            break;
        case '/create':
            showCreateModal();
            break;
        case '/activity':
            console.log('활동 페이지로 이동');
            break;
        case '/profile':
            console.log('프로필 페이지로 이동');
            break;
    }
}

function showCreateModal() {
    alert('게시물 만들기 기능은 아직 구현되지 않았습니다.');
}

// Utility Functions
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else {
        return `${days}일 전`;
    }
}

// Handle image loading errors
function handleImageError(img) {
    img.src = 'assets/images/placeholder.svg';
    img.alt = '이미지를 불러올 수 없습니다';
}

// Add error handling for all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
});

// Smooth scrolling for stories
function initializeStoriesScrolling() {
    const storiesContainer = document.querySelector('.stories-container');
    if (storiesContainer) {
        let isScrolling = false;

        storiesContainer.addEventListener('wheel', function(e) {
            if (!isScrolling) {
                isScrolling = true;
                e.preventDefault();

                const scrollAmount = e.deltaY > 0 ? 100 : -100;
                this.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }
        });
    }
}

// Initialize stories scrolling
document.addEventListener('DOMContentLoaded', initializeStoriesScrolling);