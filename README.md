1. login 후 user_id, user_pwd 값 server로 가져오기
2. signUp 후 회원데이터 DB에 저장하기
   - 리팩토링
3. user_id,user_pwd 가 DB정보와 일치 확인
4. jwt 활용하여 토큰 발행
5. 서비스 추가 (openapi를 이용하여 내 gps랑 필요한 위치 gps비교) 
   - 노인복지서비스앱
      - 기능
         - main : 나의 위치와 병원 위치 비교 후 가까운곳 추천
         - another : 핸드폰이 충격을 받았을 경우 119 신고 ( 예외처리 : 만약 잘못하고 놓치셧을 경우를 위해 15초의 타이머를 설정)
   - 공공데이터포털 이용
   
