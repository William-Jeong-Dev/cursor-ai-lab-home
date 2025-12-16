#[PRD] 통합 AI CRM 구축 제안 사이트 (Motion Web Project)##1. 프로젝트 개요 (Project Overview)* **목적:** 클라이언트(B2B)에게 '데이터 통합 및 AI 자동화' 기술력을 시각적으로 증명하고 수주를 유도함.
* **핵심 컨셉:** **"Data Orchestration & Flow"** (흩어진 데이터가 유기적으로 연결되어 흐르는 모습 시각화)
* **타겟 디바이스:** PC Web 우선 (반응형 모바일 지원)
* **참고 레퍼런스(Benchmark):**
* **Tone & Manner:** [이글루(Igloo)](https://www.igloo.co.kr/) - 다크 모드, 네온 컬러, 3D 파티클, 데이터 시각화의 전문성.
* **Layout & Interaction:** [솔트룩스(Saltlux)](https://www.saltlux.com/ai_center.html) - 깔끔한 섹션 전환, 스크롤 트리거 애니메이션.



##2. 디자인 및 모션 가이드 (Design & Motion Guide)* **Visual Concept:** **"Dark & Neon Tech"**
* 배경: Deep Navy 또는 Black (데이터의 깊이감).
* 포인트 컬러: Cyan, Hologram Blue (AI 지능, 신뢰).


* **Key Motion Keyword:**
* **Floating (부유감):** 안티그래비티 컨셉. 데이터 오브젝트들이 공중에 떠서 유기적으로 움직임.
* **Connecting (연결):** 스크롤에 따라 선(Line)들이 그려지며 서로 다른 객체를 연결.
* **Deep Dive (몰입):** 스크롤 시 화면이 줌인(Zoom-in)되며 데이터 속으로 빨려 들어가는 듯한 연출.



---

##3. 섹션별 상세 요건 (Section Specifications)###Section 1: Hero (메인)* **목표:** 방문 즉시 압도적인 기술적 심미감 전달.
* **화면 구성:**
* 중앙에 거대한 '3D 데이터 구체(Sphere)' 또는 '신경망(Network)' 형상.
* 배경에는 희미한 데이터 코드들이 비처럼 내리거나 떠다님.


* **모션(Interaction):**
* **Load Trigger:** 사이트 로딩 시, 흩어져 있던 파티클(Particle)들이 중앙으로 빠르게 모여들어 하나의 빛나는 구체를 형성 (데이터 통합 상징).
* **Mouse Interaction:** 마우스 커서 움직임에 따라 구체가 살짝 회전하거나 시점이 변환 (WebGL/Three.js 활용).
* **Scroll Trigger:** 스크롤 다운 시, 구체가 폭발하듯 퍼지며 다음 섹션의 배경으로 자연스럽게 전환.



###Section 2: The Challenge (문제 제기)* **목표:** 데이터 파편화의 답답함을 시각적으로 표현.
* **화면 구성:**
* 좌/우/중앙에 'ERP', 'CRM', 'NAS'라고 적힌 큐브(Cube)들이 서로 멀리 떨어져 있고, 연결선이 끊겨 있음.


* **모션(Interaction):**
* **Scrollytelling:** 사용자가 스크롤을 내리면 큐브들이 서로 충돌하려다가 튕겨 나감 (연동 실패 표현).
* **Text Effect:** "Siloed Data(단절된 데이터)" 텍스트가 노이즈(Glitch) 효과와 함께 등장했다가 사라짐.



###Section 3: The Solution (아키텍처)* **목표:** 매끄러운 통합 과정을 '흐름'으로 표현 (Reference: 솔트룩스 프로세스 도식).
* **화면 구성:**
* 중앙에 빛나는 파이프라인(Pipeline) 도식.


* **모션(Interaction):**
* **Line Drawing:** 스크롤에 맞춰 빛줄기가 파이프를 타고 이동 (ETL → Vectorization → RAG).
* **Pinning Effect:** 배경은 고정(Pin)되고, 설명 텍스트만 우측에서 좌측으로 페이드인/아웃되며 교체됨.
* **Highlight:** 'RAG Engine' 부분에 빛이 도달하면 해당 아이콘이 펄스(Pulse)처럼 두근거리는 효과.



###Section 4: Core Features (시연)* **목표:** 실제 AI가 대답하는 듯한 경험 제공.
* **화면 구성:**
* 실제 대시보드 UI 목업(Mockup)이 비스듬하게(Perspective) 배치됨.


* **모션(Interaction):**
* **Typing Effect:** 화면에 진입하면 검색창에 자동으로 질문이 타이핑됨 ("지난달 A업체 이슈 찾아줘").
* **Pop-up Animation:** 질문 직후, 답변 패널과 참고 문서(PDF 아이콘 등)가 카드 형태로 부드럽게 팝업(Pop-up)되며 떠오름.
* **Parallax:** 배경의 요소와 전경의 UI 패널이 서로 다른 속도로 스크롤 되어 입체감(Depth) 부여.



###Section 5: Scalability (확장성) & Contact* **목표:** 미래지향적 비전과 문의 유도.
* **모션(Interaction):**
* **Infinite Scroll:** 배경에 은하수처럼 뻗어나가는 데이터 라인들이 무한히 확장되는 루프 애니메이션.
* **Hover Effect:** [문의하기] 버튼에 마우스를 올리면(Hover), 버튼 주변으로 자기장(Magnetic)처럼 원형 라인이 생기거나 버튼이 커서를 따라 자석처럼 살짝 끌려옴.



---

##4. 기술적 요구사항 (Technical Requirements)1. **Framework:** React, Vue.js 등 SPA 기반 권장 (부드러운 페이지 전환을 위해).
2. **Graphic Library:** Three.js, WebGL, GSAP (ScrollTrigger) 필수 사용.
3. **Performance:** 고사양 인터랙션이 많으므로 **Lottie 파일 최적화** 및 **이미지 Lazy Loading** 필수. 모바일 환경에서는 3D 오브젝트를 경량화된 비디오나 이미지로 대체(Fallback)하여 퍼포먼스 확보.
4. **Browser Support:** Chrome, Safari, Edge 최신 버전 대응.

---

###💡 기획자의 Tip (제작자에게 전달할 메모)> "단순히 화려하기만 한 모션은 지양합니다. **'흩어진 데이터가 하나로 모인다(Integration)'**는 내러티브가 모션을 통해 직관적으로 느껴져야 합니다. 이글루(Igloo) 사이트의 지구본처럼 메인 오브젝트가 스크롤에 따라 변형되면서 끝까지 스토리를 끌고 가는 형태를 선호합니다."

---