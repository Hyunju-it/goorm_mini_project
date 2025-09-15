# TODO App - 할 일 관리 애플리케이션

## 프로젝트 개요
MongoDB, Express, React, Node.js (MERN) 스택을 활용한 풀스택 TODO 애플리케이션입니다.
사용자가 할 일을 추가, 수정, 삭제하고 우선순위 및 카테고리로 관리할 수 있는 기능을 제공합니다.

## 프로젝트 구조
```
todo/
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── services/       # API 서비스
│   │   ├── types/          # TypeScript 타입 정의
│   │   └── App.tsx        # 메인 애플리케이션
│   └── package.json       # 클라이언트 의존성
├── server/                # Node.js 백엔드
│   ├── controllers/       # 비즈니스 로직
│   ├── models/           # MongoDB 스키마
│   ├── routes/           # API 라우트
│   └── app.js            # Express 서버
├── database/             # 데이터베이스 관련 파일
└── README.md
```

## 구현된 기능

### ✅ 완료된 작업
- [ ] 프로젝트 초기 세팅 및 디렉토리 구성
- [ ] 데이터베이스 스키마 설계
- [ ] React 컴포넌트 구성
- [ ] API 라우팅 설계 및 구현
- [ ] 상태관리 및 이벤트 처리 구현
- [ ] CSS 스타일링 및 UI 디자인
- [ ] 기능 점검 및 디버깅
- [ ] 결과물 화면설계서, 발표자료 작성

### 주요 기능

#### 1. TODO 관리
- **CRUD 기능**: 할 일 생성, 읽기, 수정, 삭제
- **완료 상태 관리**: 체크박스를 통한 완료/미완료 토글
- **실시간 업데이트**: 상태 변경 시 즉시 UI 반영

#### 2. 고급 기능
- **우선순위 설정**: 높음, 보통, 낮음 3단계 우선순위
- **카테고리 분류**: 업무, 개인, 학습 등 사용자 정의 카테고리
- **마감일 설정**: 날짜/시간 설정으로 일정 관리
- **태그 시스템**: 다중 태그로 세분화된 분류

#### 3. 검색 및 필터링
- **텍스트 검색**: 제목 및 설명 내용 검색
- **상태 필터**: 완료/미완료 상태별 필터링
- **우선순위 필터**: 우선순위별 분류
- **카테고리 필터**: 카테고리별 그룹화

#### 4. 통계 및 시각화
- **완료율 표시**: 진행률 바를 통한 시각적 표현
- **항목별 통계**: 전체, 완료, 대기 중 개수 표시
- **우선순위별 분포**: 각 우선순위별 할 일 개수
- **생산성 팁**: 완료율에 따른 동기부여 메시지

## 기술 스택

### Frontend (Client)
- **React 18**: 컴포넌트 기반 UI 라이브러리
- **TypeScript**: 정적 타입 검사로 안정성 향상
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **CSS3**:
  - CSS Variables를 활용한 테마 시스템
  - Flexbox/Grid 레이아웃
  - 반응형 미디어 쿼리
  - 키프레임 애니메이션

### Backend (Server)
- **Node.js**: JavaScript 런타임
- **Express.js**: 웹 애플리케이션 프레임워크
- **MongoDB**: NoSQL 데이터베이스
- **Mongoose**: MongoDB ODM (Object Document Mapper)

### 개발 도구
- **ESLint**: 코드 품질 관리
- **CORS**: Cross-Origin Resource Sharing 처리
- **dotenv**: 환경 변수 관리

## API 엔드포인트

### TODO API
```
GET    /api/todos          # 모든 TODO 조회 (필터링, 페이지네이션 지원)
GET    /api/todos/:id      # 특정 TODO 조회
POST   /api/todos          # 새 TODO 생성
PUT    /api/todos/:id      # TODO 전체 수정
PATCH  /api/todos/:id/toggle # TODO 완료 상태 토글
DELETE /api/todos/:id      # TODO 삭제
GET    /api/todos/stats    # TODO 통계 조회
```

### 요청/응답 예시
```javascript
// POST /api/todos
{
  "title": "React 컴포넌트 개발",
  "description": "TodoList 컴포넌트 구현하기",
  "priority": "high",
  "category": "개발",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "tags": ["react", "frontend"]
}
```

## 데이터베이스 스키마

### Todo Model
```javascript
{
  title: String (required),           // 할 일 제목
  description: String,                // 상세 설명
  completed: Boolean (default: false), // 완료 상태
  priority: String (enum: ['low', 'medium', 'high']), // 우선순위
  category: String,                   // 카테고리
  dueDate: Date,                     // 마감일
  tags: [String],                    // 태그 배열
  createdAt: Date (default: now),    // 생성일
  updatedAt: Date (default: now)     // 수정일
}
```

## 설치 및 실행

### 사전 요구사항
- Node.js 16+
- MongoDB 5+
- npm 또는 yarn
