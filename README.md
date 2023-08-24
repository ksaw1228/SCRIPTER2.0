# SCRIPTER 2.0 📚🗣️ 
리팩토링 이전 코드 :[SCRIPTER Ver 1.0 Github Repository](https://github.com/ksaw1228/SCRIPTER)
<details>
<summary>[SCRIPTER]는 영화와 미드의 자막을 이용해 영어 학습을 도와주는 웹 사이트입니다.</summary>

자막 파일에서 **대사만 추출**하여 타이핑하거나 한/영 스크립트를 동시에 읽어 제공합니다.

영어 학습의 훌륭한 교보재인 자막 파일을 한/영 스크립트로써 사용하여, 영어 스피킹과 라이팅 능력을 향상시킬 수 있는 서비스 입니다.<br>
***기존 자막 파일에는 대사뿐만 아니라 시간정보,마크다운 언어 등 불필요한 데이터가 많이 포함되어 있어,<br> 사용자가 편리하게 학습할 수 있도록 불필요한 데이터를 제거해줍니다.***<br><br>
두 개의 스크립트 파일을 동시에 볼 때 발생하는 불편함을 해결하고 진행 상황과 성취도를 가시화하여<br> 영어 학습을 보다 편리하게 도와주기 위한 목표를 가지고 있습니다.
</details>
<img width=70% height=70% src="https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/bb763b4f-60d8-4303-a2bc-a7cfe8125bad"/>

## 🌐 사용 방법
**!현재 백엔드 코드 리팩토링 후 변경된 API와 기능에 대응하는 프론트 코드를 준비중에 있는 관계로 현재 서비스 중인 사이트는 1.0Version임을 안내드립니다.!**

1. [SCRIPTER](http://35.227.141.58/) 에 접속하세요
2. "스크립트 업로드하기" 버튼을 클릭하세요
3. 테트스 계정으로 로그인 하시거나 회원가입하세요
   - **ID**: test123
    - **PW**: testing123!
4. 자막 목록에서 타이핑,스크립트 중 원하는 학습방법을 선택 후 학습을 진행하시면 됩니다

## 🛠️Stacks

### Front-End : <img src="https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp;
### Back-End :  <img src="https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">&nbsp;<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/typeORM-%23E0234E.svg?style=for-the-badge&logo=typeORM-&logoColor=white"/>
### DataBase : <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white"/>&nbsp;
### IaaS : <img src="https://img.shields.io/badge/AWS EC2-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/AWS RDS-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/AWS S3-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/AWS elasticache-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>
### Test : <img src='https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white'>&nbsp;


---

# 리팩토링 이유

> 이전 프로젝트에서 빠른 프로토타입 구현을 목표로 아키텍처 패턴을 따로 적용하지 않고 
Express와 NoSQL 기반의 MongoDB를 사용하여  개발을 진행했습니다.
그러나 서비스를 운영하면서 추가적인 요구사항에 대한 기능 확장 및 유지보수에 어려움을 겪게 되었고, 
이에 따라 기존 Express 프로젝트를 NestJS로 **리팩토링** 하기로 결정했습니다.
<br/>
<br/>

## 개선점과 리팩토링 요구사항
### 1. 평균 4만자(50KB)의 잦은 데이터 입출력으로 인한 서버 부하 개선 필요 [S3]
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
### 2. 작성자만이 열람 가능한 자막에 대한 추가 보안 작업 필요 [Redis]
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



### 3. Repository 통합을 통한 유지,보수성 향상 필요 [typeORM 0.3]


| subtitleId | title   | english_content     | korean_content      | english_scroll_progress | korean_scroll_progress | typed_words      | typing_progress | userId(FK) |
|------------|---------|---------------------|---------------------|-------------------------|------------------------|------------------|-----------------|------------|
| 1          | IronMan | IronMan En contents | Ironman Ko contents | 50                      | 100                    | "['a,','b','c']" | 3               | 1          |

위 테이블의 데이터를 정규화 하여 총 4개의 테이블로 나눌 수 있었습니다.

[subtitle.repositoryty], [englishsubtitle.repository], [koreansubtitle.repository], [pingprogress.repository]

이 때,
TypeORM 0.2 버전의 Repository 패턴을 사용하면, 정규화된 테이블마다 각각의 Repository를 생성해야 합니다. 
이는 코드의 가독성과 유지보수성을 저하시키는 요인이 된다고 판단하였습니다.

**이에 따라 TypeORM 0.3 버전을 사용하여 `Service`에 직접 `Entity`를 주입하여 `Repository` 패턴을 통합한 결과, 코드의 가독성과 유지보수성이 향상되었습니다. <br><br>또한, `Jest`를 사용하여 Unit Test를 작성하는 과정에서, `Repository` 패턴을 사용한 경우보다 테스트 코드가 간결해지고 명확해지는 경험을 하였습니다.**

---

### 4. 유지보수를 위한 문서화, 아키택쳐 패턴 적용 필요
NestJS의 클린 아키텍처와 싱글톤 패턴의 가이드를 따라가며 프로젝트를 구현하기 위해 헥사고날 아키텍처를 도입하여 설계하였습니다. 헥사고날 아키텍처는 클린 아키텍처를 구체화한 방법 중 하나로, 의존성이 외부에서 내부로만 존재하고, 비즈니스 로직(엔티티)이 외부에 대해 전혀 알지 못해도 되는 구조입니다.

이 아키텍처 패턴은 Adapter와 Port를 통해 비즈니스 로직과 외부 사항 간의 결합도를 최소화하고, 각 영역의 책임을 분명히 합니다. NestJS 프레임워크를 사용하면서 이를 실현하기 위해 각 레이어의 구성요소를 분리하여 의존성 주입과 싱글톤 패턴을 적용하였습니다.

이를 통해 프로젝트의 구조가 더욱 분명해지고, 변화에 유연하게 대응할 수 있는 설계가 되었습니다. 결과적으로 비즈니스 로직을 효과적으로 독립시켜 확장성을 높여주고, 외부와의 상호작용을 쉽게 관리할 수 있게 되었습니다.

---
### 5. 효율적 레거시 코드 재작성을 위한 테스트 주도 개발 필요성
Jest를 이용하여 테스트 주도 개발(TDD)을 도입하여 테스트 코드를 작성하고, 레거시 코드를 테스트 주도로 리팩토링하였습니다. 

기존에 존재하던 프로젝트를 처음부터 NestJS로 전환하는 작업이었기에, 프로젝트 시작 시 TDD를 도입한 결과, 레거시 코드를 테스트 주도로 재작성하는 과정에서 서비스 코드 구현에 집중할 수 있었습니다. 

혼자서 다수의 서비스 코드를 작성하며 각 로직에 대한 인식이 흐려질 때가 있었으나, 테스트 코드가 문서화 역할을 하는 것을 경험하면서, TDD에 대한 긍정적 경험을 얻었습니다. 

---
### 6. 회원가입 규칙 설정, SQL injection 등 입력값 공격 방어를 위한 입력값 검증 기능 필요 
`DTO`와 `@Pipe`, `@Gaurd` 를 이용하여 입력값 검증 기능을 구현하는 방식을 선택했습니다.

`@ValidationPipe`와 `@AuthGuard`를 사용하여 데이터의 유효성을 검사하고, 각 필드에 대한 validation 규칙을 정의한 
DTO를 만들어 데이터 형식을 체크하였습니다. 

이를 통해 사용자의 입력값을 검증하고, 잘못된 값으로 인한 SQL 인젝션 공격이나 다른 입력값 공격을 예방할 수 있었습니다.

### QnA 게시판 생성 Post 로직
<img width="809" alt="스크린샷 2023-08-11 오후 10 29 55" src="https://github.com/ksaw1228/SCRIPTER2.0/assets/48974380/0bb6afc5-d89c-4377-b751-b6fe3c9d4980">

### 7. 소셜 로그인 추가(JWT)
소셜 로그인이 필요한다는 유저의 요청사항이 있었습니다.
기존 서비스에서 사용중이었던 session 방식의 유저 인증으로는 소셜 로그인을 구현할수 없다고 판단하여 유저 인증 방식을 기존 session 방식에서 JWT로 변경하였습니다.

또한 현재 AWS EC2 프리티어 인스턴스인 t2.micro를 사용하고 있습니다.
동일한 서비스 로직이라 하더라도 Express에서 NestJS로 리팩토링 하는 과정에서, 부하가 조금 증가할 수 있다고 생각했습니다. 그래서 서버의 메모리 사용을 줄이기 위해 기존 session 방식에서 JWT 방식으로 변경했습니다



### ERD
---
![ERD](https://github.com/ksaw1228/SCRIPTER/assets/48974380/6838e693-421b-4de0-aef3-d8eefc732e05)

---
[SCRIPTER Ver 1.0](https://github.com/ksaw1228/SCRIPTER)
