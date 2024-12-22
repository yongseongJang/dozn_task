# Dozn Task

### Environment
- node v20.10.0
- yarn v1.22.21

---

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yongseongJang/dozn_task.git
   cd dozn_task
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```

---

## Usage
### Development Server
```bash
yarn dev
```
Access the app at `http://localhost:3000`.

### Production Build
```bash
yarn build
yarn start
```
Access the app at `http://localhost:3000`.

---

## 프로젝트 설명
### 유효시간 체크 기능
- 서버로부터 응답받은 토큰을 디코딩해서 payload에 저장된 exp를 사용했습니다.
- dozn_task/src/app/components/AuthTimeoutWatcher.tsx 파일에 구현된 컴포넌트에서 1초마다 token이 유효한지 판단합니다.
### 스크레핑 데이터 호출 목록 기능
- 유저가 호출한 스크레핑 데이터 목록을 localstorage에 저장해서 사용했습니다.
- 유저별 목록을 구분하기 위해서 토큰의 payload에 저장된 identification을 사용했습니다.

### 참고사항
- [GET]/admin/api/user/api/list의 응답 내용 중 totalCount와 totalPage가 0으로 들어옵니다. 이로 인해서 API 목록 조회 페이지 내 테이블 페이지네이션은 정상 작동하지 못하는 상태입니다.
- 유저가 직접 로그아웃을 할 수 있는 UI 및 기능을 구현하지 않았습니다.(토큰의 유효시간이 지난 시점에 자동 로그아웃은 구현됨.) 로그아웃이 필요한 경우 개발자 도구를 통해서 'token'이라는 이름의 쿠키를 제거 부탁드립니다.
- 스크래핑 데이터 호출 히스토리 페이지의 카드 우측 상단의 체크박스가 북마크 기능을 위한 UI입니다.
- 팝업 생성 시 dimmed 처리된 부분을 클릭하면 팝업이 닫힙니다.

## UI
### Login Page
![image](https://github.com/user-attachments/assets/6c809395-c7e2-4c9c-a4e3-72a4f1426272)
### API List Page
![image](https://github.com/user-attachments/assets/7ba94c1c-6ae1-43ce-82d6-8bab9fad9a83)
![image](https://github.com/user-attachments/assets/0d1f02bd-7922-4696-97d1-0d98f8f41cf2)

### Scraping History Page
![image](https://github.com/user-attachments/assets/c1725b4c-7bc9-4d67-b67f-4cea95b1b749)
![image](https://github.com/user-attachments/assets/27f3ac52-b884-4bbf-a321-2b03156de774)
![image](https://github.com/user-attachments/assets/369fe604-29ad-44c3-8050-dadf55762e6d)

