# Github REST API Calendar
 - 2022.10.28 10:00 ~ 2022.10.28 14:00
 - 개인이 진행한 subject 점검용 토이 프로젝트
 - algo 레포지토리 내용 기반 캘린더 생성
 + 2023.01.13 Programmers 추가
## Subject
 - REST API 숙달
 - axios 비동기 통신 숙달
 - js 사용 숙달
## Task
 - (HTML) 달력 모양 만들기
 - (REST API) 깃허브 데이터 받아오기
 - (axios) 깃허브 데이터 받아서 달력에 넣기
 - (javascript) 받은 데이터 기반으로 또다른 데이터 만들기
## problem
 - REST API 사용법
 - content 그대로 받기
 - axios 데이터로 다시 axios 실행 시의 콜백 문제
## solution
 - api.github.com/repos/{owner}/{repo}/contents/{path}
 - raw.githubusercontent.com/{owner}/{repo}/master/{path}
 - 필요 조건이 완성될 axios의 .then 안에서 axios 실행하도록 함
 - 때문에 실행 시간에서 손해를 보게 됨
## whatIlearn
 - axios 비동기 순차 처리
 - github REST API 사용법
## next subject
 - vue.js 버전으로?