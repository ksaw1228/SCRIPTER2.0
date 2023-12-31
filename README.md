# SCRIPTER 2.0 📚🗣️ 
리팩토링 이전 코드 :[SCRIPTER Ver 1.0 Github Repository](https://github.com/ksaw1228/SCRIPTER)
<details>

</br>
<summary>[SCRIPTER]는 영화와 미드의 자막을 이용해 영어 학습을 도와주는 웹 사이트입니다.</summary>

사용자의 자막 파일에서 시간정보,마크다운 언어 등 불필요한 데이터를 제거하고 **대사만 추출**합니다.

한/영 자막을 한 화면에서 동시에 보며 학습할 수 있습니다.

타이핑 영작 타이핑 기능으로 Writing 학습도 가능합니다.

</details>

<details>
</br>
<summary>🌐 사용 방법</summary>
  
1. [SCRIPTER](http://35.227.141.58/) 에 접속하세요
2. "스크립트 업로드하기" 버튼을 클릭하세요
4. 테트스 계정으로 로그인 하시거나 회원가입하세요
   - **ID**: test123
    - **PW**: testing123!
5. 자막 목록에서 타이핑,스크립트 중 원하는 학습방법을 선택 후 학습을 진행하시면 됩니다
</details>

<img width=70% height=70% src="https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/75d4f2ab-f249-41aa-92f5-44b1e82242a5"/>

## 🛠️Stacks

### Front-End : <img src="https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp;
### Back-End :  <img src="https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">&nbsp;<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/typeORM-%23E0234E.svg?style=for-the-badge&logo=typeORM-&logoColor=white"/>
### DataBase : <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white"/>&nbsp;
### IaaS : <img src="https://img.shields.io/badge/AWS EC2-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/AWS RDS-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/AWS S3-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/AWS elasticache-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>
### Test : <img src='https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white'>&nbsp;

## 서비스 아키텍처

<img width=70% height=70% src="https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/096f5317-25ce-4e90-a737-989493a8decb"/>

---

# 리팩토링 이유

> 이전 프로젝트에서 빠른 프로토타입 구현을 목표로 아키텍처 패턴을 따로 적용하지 않고 
Express와 NoSQL 기반의 MongoDB를 사용하여  개발을 진행했습니다.
그러나 서비스를 운영하면서 추가적인 요구사항에 대한 기능 확장 및 유지보수에 어려움을 겪게 되었고, 
이에 따라 기존 Express 프로젝트를 NestJS로 **리팩토링** 하기로 결정했습니다.
<br/>
<br/>

## 개선점과 리팩토링 요구사항

### 1. 유지보수를 위한 아키택쳐 패턴 적용 필요

기존의 구조에서는 새로운 기능이나 외부 시스템을 추가할 때마다 중요한 로직이 영향을 받았기 때문에 버그 수정, 추가 요구사항 반영 등의 애플리케이션 변화에 유연하게 대응하기 어려웠습니다.</br>
이를 해결하기 위해 클린 아키텍처에서 제안하는 동심원 구조를 활용하여 애플리케이션 내부 영역과 외부 영역을 명확하게 분리하였으며, 각각의 층(도메인, 유스케이스, 인터페이스 어댑터, 프레임워크와 드라이버)에 역할과 책임을 명확하게 할당하였습니다. </br>

비즈니스 로직의 외부 리소스(데이터베이스, 네트워크 등) 의존성으로 인한 유닛 테스트의 복잡성 문제가 있었습니다. </br>
이 문제를 해결하기 위해 클린 아키텍처에서 강조하는 의존성 규칙을 적용하여 비즈니스 로직과 외부 의존성을 분리하였습니다. </br>
이렇게 하여 순수한 로직에만 집중할 수 있는 유닛 테스트가 가능해지고 하위 모듈간의 구현 변경도 용이해져서 고차원 정책 변경 없이 개발을 진행할 수 있게 되었습니다. </br>
결론적으로 클린 아키텍처를 도입함으로써 유닛 테스트가 용이해졌고 전반적인 애플리케이션의 확장성과 유지보수성이 증가 하였습니다.

<img width=40% height=40% src="https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/97e11288-4d31-42b4-9516-3965285ae028"/>

<img width=40% height=40% src="https://github.com/ksaw1228/NSfootballServer/assets/48974380/117a2b03-1b2d-4b1d-b805-ddf339c24b36"/>

---


### 2. 레거시 코드의 효율적 재작성을 위한 테스트 주도 개발 필요성
Jest를 이용하여 테스트 주도 개발(TDD)을 도입하여 테스트 코드를 작성하고, 레거시 코드를 테스트 주도로 리팩토링하였습니다. 

**기존에 존재하던 프로젝트를 처음부터 NestJS로 전환하는 작업이었기 때문에 이미 바람직한 Test 결과값을 알고 있었습니다.**
이를 통해 빠른 Red test 코드 작성이 가능하였고, Red test 코드를 기반으로 안정적인 리팩토링을 할 수 있었습니다.

또한, 혼자서 다수의 서비스 코드를 작성하며 각 로직에 대한 인식이 흐려질 때가 있었으나, **테스트 코드가 문서화 역할을 하는 것을 경험**하면서, TDD에 대한 긍정적 경험을 얻었습니다.

![스크린샷 2023-08-30 오후 3 50 27](https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/08e516d1-f28a-4d98-abbc-0da591d44e48)


---
### 3. 대용량 트래픽 처리를 위한 확장성 고려 설계
최근 K-pop의 영향으로 전 세계에서 한국어 학습에 대한 관심이 높아지고 있습니다. 이러한 변화에 따라 전 세계의 학습자들을 고려하게 되었습니다. 이에 따라, 대용량 트래픽을 처리할 수 있는 확장성 있는 시스템 설계가 필요하게 되었습니다.</br>
비용적인 측면에서 상대적으로 유리한 Scale-out 방식을 중심으로 설계를 진행하였습니다.</br>
이는 여러 서버 인스턴스 간에 사용자 세션 정보를 공유해야 하는 어려움을 초래했습니다.</br>
이를 해결하기 위해 stateless application 구조와 JWT(JSON Web Tokens) 인증 방식을 도입하였습니다.</br>

1. JWT 토큰 보안 강화</br>
JWT는 사용자의 인증 정보를 포함하므로, 이 토큰의 보안은 중요한 이슈였습니다. 따라서 HTTPS 등의 암호화 통신 방법을 활용하여 토큰이 탈취되지 않도록 보호하였습니다.</br>
2. 토큰 크기 최적화</br>
JWT 토큰은 HTTP 헤더에 포함되어 전송되므로, 그 크기가 클 경우 성능 저하를 일으킬 수 있었습니다. 이 문제를 해결하기 위해 필요한 최소한의 정보만 포함하는 방식으로 JWT 토큰을 설계하였습니다.</br>
3. Stateless 시스템 설계</br>
JWT는 stateless 시스템에서 가장 잘 작동합니다. 따라서 각 요청이 독립적으로 처리될 수 있도록 시스템을 설계하고, 서버 측에서 상태 정보를 저장하지 않도록 하였습니다.</br>
4. JWT 만료 및 폐기 처리 로직 추가</br>
일단 발급된 JWT는 취소(revocation)할 수 없다는 단점이 있었습니다. 이 문제를 해결하기 위해 짧은 만료 기간을 설정하고, 필요시 서버 측에서 유효성 검사 로직을 추가하여 처리할 수 있도록 하였습니다.</br>
5. 일관된 Signing Key 관리</br>
여러 서버 인스턴스에서 JWT 검증시 동일한 signing key가 필요합니다. 운영 환경에서 안전한 key 관리 시스템(KMS) 을 활용하여 모든 서버 인스턴수가 같은 key 를 공유 할 수 있게 하였습니다.</br>
6. Load Balancing 및 Session Stickiness 비활성화</br>
stateless인 JWT 메커니즘은 각 요청이 독립적으로 처리될 때 가장 잘 작동합니다. </br>
따라서 로드 밸런서를 활용하여 트래픽을 여러 서버 인스턴스에 분산시키되, 세션 스틱니스 설정은 비활성화하였습니다. </br>
이로써 Stateless Application과 JWT 인증 도입으로 인한 보안 강화, 시스템 성능 최적화, 유연한 시스템 설계 등의 이점을 얻을 수 있었습니다.

---

### 3. 큰 용량의 잦은 데이터 입출력으로 인한 서버 부하 개선 필요 [S3]
저희의 주요 서비스는 방대한 자막 데이터를 사용하므로, 큰 용량의 데이터를 자주 처리하는 것이 서버에 큰 부담이었습니다. 
또한, 이러한 데이터를 게시판처럼 DB에 직접 저장하는 것이 비용 면에서도 부담이었습니다. 

이 문제를 해결하기 위해 `AWS`의 `S3`를 사용하여 데이터를 저장할 방법을 고려했습니다. 
데이터의 검색이나 수정이 주기적으로 필요하지 않다고 판단한 것도 S3를 선택한 이유 중 하나였습니다.

이 때, S3를 퍼블릭으로 설정하게 되면 클라이언트가 S3와 직접 통신하여 서버 부담을 줄일 수 있지만, 이런 설정은 보안 상의 위험이 커서 적절하지 않다고 판단되었습니다. 
따라서, S3를 퍼블릭으로 설정하지 않고, 서버를 거치게 되면 DB 비용 문제는 해결될 수 있으나, 서버에서 여전히 해당 데이터를 처리해야 하는 문제가 남아 있습니다. 

이를 해결하기 위해 `Presigned URL` 을 발행하여 클라이언트에게 넘겨줌으로써 서버의 리소스 사용 없이 대용량 텍스트 데이터를 저장하고 관리하는 데 성공했습니다. 

**하지만 `Presigned URL` 기법으로 서버를 거치지 않고 S3에 데이터를 저장하면, 자막 파일에서 불필요한 텍스트를 제거하고 대사만 추출하는 저희 서비스의 핵심 기능을 실행할 수 없다는 문제가 있었습니다.**

**이를 해결하기 위해 자막 파싱 작업을 프론트엔드에서 수행했고, 최종적으로 사용자 경험에 부정적인 영향 없이 서버와 DB의 부하를 성공적으로 줄였습니다.**

최종적으로는 속도와 성능면에서 우수한 go Lang을 마이크로 서비스로 사용해 데이터를 파싱할 계획을 가지고 있습니다.

### 자막 POST 로직
<img width="803" alt="S3 시퀀스" src="https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/d04b7e24-c15a-43f3-b0a6-1979804ced25">


---

### 4. 작성자만이 열람 가능한 자막에 대한 추가 보안 작업 필요 [Redis]
이전에는 작성자의 자막 목록 전체를 요청할 때만 사용자를 검증했지만, 
개별 자막 컨텐츠에 접근할 때에는 사용자를 검증하지 않았습니다. 

이러한 인증 과정을 구현하기 위해 프로젝트 초기에 자막 테이블에 `JOIN`을 사용하여 
자막의 작성자 ID를 불러와 요청자의 ID와 비교하는 로직을 적용했습니다. 

그러나 이 인증 과정에서 `JOIN`으로 인해 많은 데이터를 가져오는 것이 비효율적이라고 판단했고,
이에 따른 해결 방법으로 데이터 캐싱 기법을 사용 하였습니다.

**데이터 캐싱 기법으로 `AWS ElastiCache` / `Redis`를 사용하여 자막 ID와 작성자 ID 데이터를 캐싱함으로써 
불필요한 데이터베이스 통신을 줄였습니다.**
### 개별 자막 Get 로직
<img width="754" alt="redis시퀀스" src="https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/3694259b-a3ac-4aa3-bef8-ae348bd46fa1">

---


### 5. 회원가입 규칙 설정, SQL injection 등 입력값 공격 방어를 위한 입력값 검증 기능 필요 
`DTO`와 `@Pipe`, `@Gaurd` 를 이용하여 입력값 검증 기능을 구현하는 방식을 선택했습니다.

`@ValidationPipe`와 `@AuthGuard`를 사용하여 데이터의 유효성을 검사하고, 각 필드에 대한 validation 규칙을 정의한 
DTO를 만들어 데이터 형식을 체크하였습니다. 

이를 통해 사용자의 입력값을 검증하고, 잘못된 값으로 인한 SQL 인젝션 공격이나 다른 입력값 공격을 예방할 수 있었습니다.

### QnA 게시판 생성 Post 로직
<img width="809" alt="스크린샷 2023-08-11 오후 10 29 55" src="https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/0bb6afc5-d89c-4377-b751-b6fe3c9d4980">

---


### ERD
---
![ERD](https://github.com/ksaw1228/SCRIPTER/assets/48974380/6838e693-421b-4de0-aef3-d8eefc732e05)

---
[SCRIPTER Ver 1.0](https://github.com/ksaw1228/SCRIPTER)
