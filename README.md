# React Blog

### 🌎 Demo 👉🏻 [https://study-blog-7eeb8.web.app/](https://study-blog-7eeb8.web.app/)

## 1️⃣ 프로젝트 소개

로그인/회원가입 기능을 가진 간단한 블로그 입니다. 기능은 아래와 같습니다.

- 포스트 및 댓글 생성, 수정, 삭제
  - `Firebase`를 활용한 CRUD (Firestore)
- 다크/라이트 모드 전환
- 로그인/회원가입 기능
  - `Firebase`를 활용한 인증 (Firebase Auth)

## 2️⃣ 이 프로젝트를 통해 공부한 내용

- `Firebase`
  - Auth, FireStore
- FireStore을 통한 CRUD 구현
- `ContextAPI`를 활용한 사용자 인증 정보 관리
- `ContextAPI`를 활용한 테마 관리 (다크모드)
- Carousel 자체 구현 (라이브러리 사용x)

## 3️⃣ 향후 추가하고자 하는 기능

- Carousel autoplay
- 회원가입 시 작성 항목 추가
  - 프로필 사진
  - 닉네임
- 사용자 간 팔로우
- 피드 페이지에서 팔로우한 사용자의 포스트만 보이기
- 포스트 검색 기능

## 4️⃣ 기술스택

<img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/>

## 5️⃣ 프로젝트 트리

```
📦src
 ┣ 📂components
 ┃ ┣ 📜Carousel.tsx
 ┃ ┣ 📜Comments.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜Loader.tsx
 ┃ ┣ 📜LoginForm.tsx
 ┃ ┣ 📜PostDetail.tsx
 ┃ ┣ 📜PostForm.tsx
 ┃ ┣ 📜PostList.tsx
 ┃ ┣ 📜ProfilePage.tsx
 ┃ ┗ 📜SignupForm.tsx
 ┣ 📂context
 ┃ ┣ 📜AuthContext.tsx
 ┃ ┗ 📜ThemeContext.tsx
 ┣ 📂pages
 ┃ ┣ 📂home
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂posts
 ┃ ┃ ┣ 📜detail.tsx
 ┃ ┃ ┣ 📜edit.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜new.tsx
 ┃ ┣ 📂profile
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂signup
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📜App.tsx
 ┣ 📜Router.tsx
 ┣ 📜firebaseApp.ts
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```

## 6️⃣ 프로젝트 설치 및 실행

```bash
yarn install
yarn start
```
