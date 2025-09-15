# YouTube Clone API 문서

## 개요
YouTube Clone 프로젝트에서 사용된 JavaScript API 및 주요 함수들에 대한 문서입니다.
현재는 프론트엔드 전용 구현이므로 JavaScript 함수와 이벤트 처리에 중점을 둡니다.

## 메인 JavaScript API

### 1. 전역 변수

```javascript
// DOM 요소 참조
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const videoItems = document.querySelectorAll('.video-item');
const sidebarItems = document.querySelectorAll('.sidebar-item');
```

### 2. 핵심 함수들

#### 2.1 사이드바 토글 함수
```javascript
/**
 * 사이드바 표시/숨김 토글
 * @description 메뉴 버튼 클릭 시 사이드바를 축소/확장합니다.
 */
function toggleSidebar() {
  sidebar.classList.toggle('collapsed');
  content.classList.toggle('sidebar-collapsed');
}
```

**사용 예시:**
```javascript
menuBtn.addEventListener('click', toggleSidebar);
```

**동작:**
- 사이드바 너비를 240px ↔ 72px로 토글
- 메인 콘텐츠 영역의 마진을 자동 조정
- CSS 트랜지션으로 부드러운 애니메이션 제공

#### 2.2 검색 처리 함수
```javascript
/**
 * 검색 쿼리 처리
 * @param {string} query - 검색할 키워드
 * @returns {boolean} - 검색 성공 여부
 */
function handleSearch(query) {
  if (!query || query.trim().length === 0) {
    console.warn('검색어가 비어있습니다.');
    return false;
  }

  console.log(`검색어: "${query}"`);
  // 실제 구현에서는 API 호출 또는 필터링 로직
  return true;
}
```

**사용 예시:**
```javascript
searchBtn.addEventListener('click', function() {
  const query = searchInput.value.trim();
  handleSearch(query);
});

// Enter 키 지원
searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const query = this.value.trim();
    handleSearch(query);
  }
});
```

#### 2.3 비디오 클릭 핸들러
```javascript
/**
 * 비디오 아이템 클릭 처리
 * @param {HTMLElement} videoElement - 클릭된 비디오 요소
 */
function handleVideoClick(videoElement) {
  const title = videoElement.querySelector('.video-title').textContent;
  const channel = videoElement.querySelector('.channel-name').textContent;

  console.log(`비디오 선택: "${title}" by ${channel}`);

  // 실제 구현에서는 비디오 재생 페이지로 이동
  // window.location.href = `/watch?v=${videoId}`;
}
```

#### 2.4 사이드바 메뉴 활성화
```javascript
/**
 * 사이드바 메뉴 활성 상태 변경
 * @param {HTMLElement} menuItem - 선택된 메뉴 아이템
 */
function setActiveMenuItem(menuItem) {
  // 모든 메뉴에서 active 클래스 제거
  sidebarItems.forEach(item => item.classList.remove('active'));

  // 선택된 메뉴에 active 클래스 추가
  menuItem.classList.add('active');

  const menuText = menuItem.querySelector('span').textContent;
  console.log(`메뉴 선택: ${menuText}`);
}
```

### 3. 유틸리티 함수들

#### 3.1 조회수 포맷터
```javascript
/**
 * 조회수를 사람이 읽기 쉬운 형태로 변환
 * @param {number} count - 조회수
 * @returns {string} - 포맷된 조회수 (예: "1.2만")
 */
function formatViewCount(count) {
  if (count >= 1000000) {
    return Math.floor(count / 100000) / 10 + 'M';
  } else if (count >= 1000) {
    return Math.floor(count / 100) / 10 + 'K';
  }
  return count.toString();
}
```

**사용 예시:**
```javascript
console.log(formatViewCount(1234567)); // "12.3M"
console.log(formatViewCount(12345));    // "12.3K"
console.log(formatViewCount(123));      // "123"
```

#### 3.2 시간 포맷터
```javascript
/**
 * 업로드 시간을 상대적 시간으로 변환
 * @param {Date|string} date - 업로드 날짜
 * @returns {string} - 상대 시간 (예: "2일 전")
 */
function formatTimeAgo(date) {
  const now = new Date();
  const uploadDate = new Date(date);
  const diff = now - uploadDate;

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
    return '방금 전';
  }
}
```

#### 3.3 이미지 에러 처리
```javascript
/**
 * 이미지 로딩 실패 시 플레이스홀더 처리
 * @param {HTMLImageElement} img - 이미지 요소
 */
function handleImageError(img) {
  if (img.classList.contains('profile-img')) {
    img.src = 'data:image/svg+xml;base64,PHN2Zy4uLg=='; // Base64 인코딩된 기본 아바타
  } else if (img.classList.contains('channel-avatar')) {
    img.parentElement.innerHTML = '<div class="avatar-placeholder">📺</div>';
  } else {
    img.parentElement.innerHTML = '<div class="thumbnail-placeholder">📹</div>';
  }
}
```

### 4. 반응형 처리 함수

#### 4.1 창 크기 변경 핸들러
```javascript
/**
 * 반응형 레이아웃 조정
 * @description 창 크기에 따라 사이드바 표시 방식 변경
 */
function handleResize() {
  const width = window.innerWidth;

  if (width <= 768) {
    // 모바일: 사이드바 숨김
    sidebar.style.display = 'none';
    content.style.marginLeft = '0';
  } else if (width <= 1024) {
    // 태블릿: 축소된 사이드바
    sidebar.style.display = 'block';
    sidebar.style.width = '72px';
    content.style.marginLeft = '72px';
  } else {
    // 데스크톱: 풀 사이드바
    sidebar.style.display = 'block';
    sidebar.style.width = '240px';
    content.style.marginLeft = '240px';
  }
}

// 이벤트 리스너 등록
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize); // 초기 로드 시에도 실행
```

### 5. 이벤트 초기화 함수

#### 5.1 메인 초기화 함수
```javascript
/**
 * 애플리케이션 초기화
 * @description 모든 이벤트 리스너를 등록하고 초기 설정을 수행합니다.
 */
function initializeApp() {
  console.log('YouTube Clone 애플리케이션 초기화 시작');

  // 메뉴 토글 기능
  menuBtn.addEventListener('click', toggleSidebar);

  // 검색 기능
  searchBtn.addEventListener('click', function() {
    const query = searchInput.value.trim();
    handleSearch(query);
  });

  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch(this.value.trim());
    }
  });

  // 비디오 클릭 이벤트
  videoItems.forEach(item => {
    item.addEventListener('click', function() {
      handleVideoClick(this);
    });
  });

  // 사이드바 메뉴 클릭 이벤트
  sidebarItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      setActiveMenuItem(this);
    });
  });

  // 이미지 에러 처리
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      handleImageError(this);
    });
  });

  // 반응형 처리
  window.addEventListener('resize', handleResize);
  handleResize(); // 초기 실행

  console.log('YouTube Clone 애플리케이션 초기화 완료');
}

// DOM 로드 완료 시 초기화 실행
document.addEventListener('DOMContentLoaded', initializeApp);
```

## CSS API (사용자 정의 속성)

### 1. 색상 변수
```css
:root {
  --youtube-red: #ff0000;
  --primary-text: #0f0f0f;
  --secondary-text: #606060;
  --border-color: #e5e5e5;
  --hover-bg: #f2f2f2;
  --active-bg: #e5e5e5;
}
```

### 2. 레이아웃 변수
```css
:root {
  --header-height: 56px;
  --sidebar-width: 240px;
  --sidebar-collapsed-width: 72px;
  --content-padding: 20px;
}
```

### 3. 애니메이션 변수
```css
:root {
  --transition-fast: 0.15s ease-out;
  --transition-normal: 0.2s ease-in-out;
  --transition-slow: 0.3s ease-in-out;
}
```

## 성능 최적화 기법

### 1. 이벤트 위임
```javascript
// 개별 이벤트 리스너 대신 이벤트 위임 사용
document.addEventListener('click', function(e) {
  if (e.target.matches('.video-item')) {
    handleVideoClick(e.target);
  } else if (e.target.matches('.sidebar-item')) {
    setActiveMenuItem(e.target);
  }
});
```

### 2. 디바운싱
```javascript
// 검색 입력 디바운싱
let searchTimeout;
searchInput.addEventListener('input', function() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    // 실시간 검색 로직
    console.log('실시간 검색:', this.value);
  }, 300);
});
```

### 3. 지연 로딩
```javascript
// Intersection Observer를 활용한 이미지 지연 로딩
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

## 확장 가능한 API 설계

### 1. 플러그인 시스템
```javascript
// 플러그인 등록을 위한 기본 구조
const YouTubeClone = {
  plugins: new Map(),

  registerPlugin(name, plugin) {
    this.plugins.set(name, plugin);
    plugin.init && plugin.init();
  },

  getPlugin(name) {
    return this.plugins.get(name);
  }
};

// 플러그인 예시
const DarkModePlugin = {
  init() {
    this.createToggleButton();
  },

  createToggleButton() {
    // 다크 모드 토글 버튼 생성 로직
  }
};

YouTubeClone.registerPlugin('darkMode', DarkModePlugin);
```

### 2. 상태 관리
```javascript
// 간단한 상태 관리 시스템
const AppState = {
  state: {
    sidebarCollapsed: false,
    currentVideo: null,
    searchQuery: ''
  },

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  },

  subscribers: [],

  subscribe(callback) {
    this.subscribers.push(callback);
  },

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }
};
```

이 API 문서는 YouTube Clone 프로젝트의 JavaScript 기능들을 체계적으로 정리한 것입니다. 실제 YouTube API와 연동하거나 백엔드 서버를 구축할 때 이 구조를 기반으로 확장할 수 있습니다.