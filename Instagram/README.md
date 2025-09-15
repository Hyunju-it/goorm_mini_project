# Instagram 목업 프로젝트

## 프로젝트 개요
Instagram 웹 버전의 주요 UI를 HTML5, CSS3, Vanilla JavaScript로 구현한 목업 프로젝트입니다.

## 기술 스택
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, CSS Grid, 미디어 쿼리
- **JavaScript**: Vanilla JS (ES6+)
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응

## 프로젝트 구조
```
Instagram/
├── index.html              # 메인 HTML 파일
├── styles/                 # CSS 스타일 파일들
│   ├── main.css           # 기본 스타일 및 리셋
│   ├── header.css         # 헤더 스타일
│   ├── feed.css           # 피드 및 게시물 스타일
│   ├── sidebar.css        # 사이드바 스타일
│   └── responsive.css     # 반응형 미디어 쿼리
├── js/                    # JavaScript 파일들
│   └── main.js           # 메인 JavaScript 로직
├── assets/               # 정적 리소스
│   ├── images/          # 이미지 파일들
│   └── icons/           # 아이콘 파일들
├── docs/                # 문서
│   └── design-spec.md   # 화면 설계서
└── README.md           # 프로젝트 설명서
```

## 주요 기능
### ✅ 완료된 기능
- [x] 화면설계서 및 목업 문서 작성
- [x] HTML 구조 분석 및 설계
- [x] 시맨틱 태그를 이용한 마크업 구현
- [x] CSS 레이아웃 구성 및 스타일링
- [x] 리소스(아이콘, 이미지 등) 적용
- [x] 반응형 미디어 쿼리 적용
- [x] JavaScript 인터랙션 구현

### 🎯 구현된 UI 컴포넌트
1. **헤더 (Header)**
   - Instagram 로고
   - 검색창 (포커스 스타일 포함)
   - 네비게이션 메뉴 (홈, 탐색, 작성, 활동, 프로필)

2. **스토리 섹션**
   - 사용자 스토리 리스트
   - 가로 스크롤 가능
   - 그라데이션 테두리 효과

3. **피드 (게시물)**
   - 사용자 프로필 정보
   - 게시물 이미지
   - 액션 버튼 (좋아요, 댓글, 공유, 저장)
   - 좋아요 수 표시
   - 댓글 시스템
   - 댓글 작성 폼

4. **사이드바 (데스크톱)**
   - 사용자 프로필 정보
   - 친구 추천 목록
   - 푸터 링크

