# 프론트엔드 챌린지 8월 - CRUD w React Query
* * *

* [1. 개요](#개요)
* [2. 주요 기술](#주요-기술)
* [3. 구현 사항](#구현-사항)
* [4. API 스펙](#api-스펙)
* [5. 리팩토링 기록](#리팩토링-기록)
* [6. UI 개선 전후](#ui-개선-전후-진행-중)
* [7. 리팩토링 전후 디렉토리 구조](#리팩토링-전후-디렉토리-구조)

* * *

## 개요
![Animation](https://user-images.githubusercontent.com/66938939/187980293-3320cce8-5d6b-4a08-95b9-81397215ab0e.gif)

- 로그인/회원가입과 CRUD 기능이 있는 투두 웹 앱입니다.
- 원티드 프리온보딩 챌린지를 통해 컴포넌트의 분리, 인증과 인가, OOP와 추상화, 클린 코드는 무엇인가에 대해 열심히 고민하고 배우면서 리팩토링을 하고 있으며 현재 UI 개선을 위한 리팩토링 진행 중입니다.
- NodeJs로 구축된 server를 NodeJs express로 client단과 직접 연결했습니다. 투두의 CRUD API 요청은 Axios를 사용합니다.
- Client/Server State를 React-Query로 관리합니다.
- 로그인 시 유저 토큰을 로컬 스토리지에 저장하여 자동 로그인 기능을 구현하였습니다.
- 새로고침 없이도 투두의 CRUD가 실시간으로 반영되고, 새로고침을 하거나 뒤로가기를 해도 히스토리가 남아있습니다.
- 제안된 필수 구현사항 외에 필요한 기능들을 개인적으로 추가해보았습니다. (투두 전체 삭제, 투두 완료, 완료된 투두 삭제 등)
* * *
## 주요 기술
> ### BackEnd
- NodeJs, TypeScript
> ### FrontEnd
- React Js, HTML, CSS, TypeScript, React-Query
* * *

## 구현 사항
> ### Node.js Express와 React.js 연동
> #### 제공되는 API Repository를 활용하여 ReacJS 프로젝트와 연동하여 API 통신하기😺
> Node.js Express : javascript를 사용하여 쉽게 서버를 구축할 수 있게 해주는 Node.js의 웹 프레임워크
<details>
    <summary><strong>구현 과정 보기</strong></summary>
    
1. 기본 세팅
    - 폴더 구조는 프론트 단을 맡는 client와 API Repository가 들어갈 server로 구성한다. 메인 폴더에서 명령어를 통해 'client' 이름의 리액트 프로젝트를 만들고 express와 concurrently를 차례로 설치한다. 
    
    ❓ concurrently : 리액트 서버와 노드 서버를 동시에 실행하기 위한 모듈
    
    ```javascript
    yarn create react-app client --template typescript
    yarn add express
    yarn addd concurrently
    ```
    
    - server 폴더를 만들고 API Repository를 옮긴다. cd 명령어를 통해 server 폴더로 접근한 후 yarn, yarn start를 차례로 입력하여 서버가 잘 작동하는지 확인한다.
    ```javascript
    cd server
    yarn
    yarn start
    ```
    ![image](https://user-images.githubusercontent.com/66938939/182816945-09387143-dfa4-4c88-a969-761a113aa93b.png)
    
    - 최종 폴더 구조
    
    ![image](https://user-images.githubusercontent.com/66938939/182817270-a4ebf5be-5706-4669-9c1f-47754c59640f.png)
    
    - 루트 경로에서 yarn start 커맨드 입력시 서버와 리액트가 동시에 시작할 수 있게 package.json을 세팅한다.
    
    ![image](https://user-images.githubusercontent.com/66938939/182818593-65e8b80f-1294-44df-8b60-a62e5fdb3c96.png)

    - 루트 경로에서 yarn start후 localhost:3000 (리액트 서버)와 localhost:80800 (API 서버)로 접속하여 이상이 없는지 확인한다.
    
    
2. 프록시 설정과 API 통신을 위한 axios 설치
    - client 폴더로 이동하여 API와 통신하기 위한 axios 모듈과 CORS 이슈를 해결하기 위해 proxy-middleware 모듈을 차례로 설치한다.
    
    <a href='https://velog.io/@kina'>❓ CORS (Cross-Origin Resource Sharing) Policy? </a>
    ```javascript
    cd client
    yarn add axios
    yarn add http-proxy-middleware
    ```
    
    - src 폴더 내에 프록시를 설정할 setupProxy.js를 생성한다. 사용할 API base url이 '/users'와 '/todos'고 포트 번호가 8080이기 때문에 아래와 같이 설정한다.
    - Typescript 환경이지만 setupProxy는 js로 작성해도 자동으로 읽힌다.
    
     ![image](https://user-images.githubusercontent.com/66938939/182822350-3ff63b54-8108-4e2e-a190-3d3d80889b85.png)
     
3. 마무리
    - 프록시 설정까지 마무리했으니 백단과 프론트단이 잘 연결이 됐는지 확인하기 위해 테스트한다. 나는 server의 userRouter.ts에 get으로 테스트 코드를 작성하고, client의 App에서 작성한 테스트 코드를 axios.get으로 호출해서 확인했다.
    
    ![image](https://user-images.githubusercontent.com/66938939/182824167-aa4f6c65-dff5-4fde-a297-762b8e097234.png)
    ![image](https://user-images.githubusercontent.com/66938939/182824241-6a718433-9e3e-4bc6-899f-cfe05c71c70d.png)

    - API가 정상적으로 호출된다.
    ![image](https://user-images.githubusercontent.com/66938939/182824457-1a018507-a3c4-4ed6-b45d-6bb9ce17df9a.png)



</details>

> ### Assignment 1 - Login / SignUp
- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - [x] 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
  
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 `@`, `.` 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
  
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요
  
> ### Assignment 2 - Todo List
- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [x] 목록 / 상세 영역으로 나누어 구현해주세요 
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요. 
  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

> ### 참고사항
- 로컬 서버를 실행했을 때 생성되는 `db/db.json`이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.
- 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)
- 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

* * *

## <a href='https://github.com/kina94/wanted-pre-onboarding-challenge-fe-1/tree/main/server'>API 스펙</a>

* * *

## 리팩토링 기록
> ### <a href='https://velog.io/@kina/CRUD-w-React-Query-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-1'>Refactoring 1 - 추상화, 관심사의 분리, 맥락을 이해하기 힘든 변수 고치기 </a>
> ### <a href='https://velog.io/@kina/CRUD-w-React-Query-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-2'>Refactoring 2 - strict 옵션 적용, 타입 가드 </a>
> ### <a href='https://velog.io/@kina/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-3'>Refactoring 3 - Redux 적용하기
> ### <a href='https://velog.io/@kina/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-4'>Refactoring 4 - React-Query 적용하기
> ### Refactoring 5 - 기능 추가
> #### - <a href='https://velog.io/@kina/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-5-1'>할 일 완료하기 / 완료된 할 일 삭제하기 기능 구현
> ### Refactoring 6 - 최종 마무리


* * *

## UI 개선 전후 (진행 중)
> ### Login 및 SignUp 화면
- lottie 추가, input validation 추가

| 개선 전 | 개선 후 |
| --- | --- |
| ![Animation](https://user-images.githubusercontent.com/66938939/183641184-301a9ed4-42b0-46c8-b88d-e27533604589.gif) | ![Animation](https://user-images.githubusercontent.com/66938939/186227628-adc857b5-e57f-49df-add4-69b1592bfae4.gif) |

- 단순 alert 발생에서 modal로 변경
- 서버단에서 로그인 실패 시 발생하는 alert message 친절하게 변경

| 개선 전 | 개선 후 |
| --- | --- |
| ![Animation](https://user-images.githubusercontent.com/66938939/187479530-e2a97207-c613-4b19-b065-bede8074e3b8.gif) | ![Animation](https://user-images.githubusercontent.com/66938939/187478698-dd3c3335-dbc7-445e-a96a-a55436e3fb8e.gif)|

> ### Todo List 화면
- 투두 추가 / 수정 모달로 변경

| 개선 전 | 개선 후 |
| --- | --- |
| ![Animation](https://user-images.githubusercontent.com/66938939/187980733-6f2a0535-4241-42cd-8fc9-03f36f78d773.gif) | ![Animation](https://user-images.githubusercontent.com/66938939/187978625-d1776e41-e1ce-44b3-a8e3-3fefc2a04323.gif) |

- 투두 완료하기 / 완료된 투두 삭제하기 추가

| 개선 전 | 개선 후 |
| --- | --- |
| 기능 없음 | ![Animation](https://user-images.githubusercontent.com/66938939/187979202-8311dc21-1cec-43ec-a978-a3fb1f7e053e.gif) |


* * *

## 리팩토링 전후 디렉토리 구조
    
| 리팩토링 전 (첫 시작) | 리팩토링 후 |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/66938939/186230525-b28db246-103f-4c74-ad38-63c53587e403.png) | ![image](https://user-images.githubusercontent.com/66938939/187982139-432d5d5b-b7f8-48ad-9390-193db1268d15.png) |
