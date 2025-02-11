### 📌 **README.md**

```md
# 🌟 Riko Fan Calendar 🌟

🎉 **Riko Fan Calendar**는 리코의 방송 일정과 팬 활동을 한눈에 확인할 수 있는 달력 웹 애플리케이션입니다.

## 📌 기능 소개

- **월별 방송 일정 표시**: 리코의 방송 일정과 주요 이벤트를 한눈에 확인 가능
- **이미지 & 영상 미리보기**: 방송 썸네일과 관련 영상을 팝업으로 감상
- **연도 및 월 선택 기능**: 연도와 월을 선택하여 원하는 기간의 일정을 확인
- **달력 이미지 저장**: 캘린더를 이미지로 저장하여 보관 가능
- **반응형 디자인**: PC 및 모바일 환경에 최적화된 UI

---

## 📂 디렉토리 구조
```

📂 프로젝트
├── 📂 src/
│ ├── 📂 css/  
 │ │ ├── base.css # 기본적인 스타일 (글꼴, 버튼, 배경)
│ │ ├── calendar.css # 달력 관련 스타일
│ │ ├── popup.css # 팝업 스타일
│ │ ├── responsive.css # 반응형 스타일
│ ├── 📂 images/ # 달력에 사용될 이미지
│ ├── 📂 scripts/
│ │ ├── main.js # 달력 생성 및 데이터 로딩 스크립트
│ │ ├── popup.js # 팝업 및 슬라이더 기능
│ │ ├── calendar.js # 달력 로직 및 UI 업데이트
│ ├── index.html # 메인 페이지
├── README.md # 프로젝트 설명 파일
├── package.json # 프로젝트 설정 파일
├── .gitignore # Git에서 제외할 파일 목록

````

---

## 🚀 설치 및 실행 방법
### 1️⃣ **Git 저장소 클론**
```sh
git clone https://github.com/사용자명/riko-fan-calendar.git
cd riko-fan-calendar
````

### 2️⃣ **라이브 서버 실행 (Live Server 플러그인 사용)**

- **VS Code** 사용 시 `Live Server` 확장 프로그램으로 실행 가능
- 또는 Python 간이 서버 실행:

```sh
# Python 3 내장 HTTP 서버 실행
python -m http.server 8000
```

👉 `http://localhost:8000`에서 페이지 확인

---

## 🛠️ 개발 환경

- **HTML5, CSS3, JavaScript (Vanilla JS)**
- **이미지 캡처 기능**: `html2canvas`
- **반응형 디자인**: `CSS Grid, Flexbox`
- **데이터 저장**: JSON 파일을 활용하여 일정 로드

---

## 📖 사용 방법

1. **연도 및 월 선택**: 원하는 기간을 선택하여 일정 확인
2. **이미지 & 영상 미리보기**: 특정 날짜 클릭 시 팝업창에서 상세 내용 확인
3. **이미지 저장**: `Save Calendar as Image` 버튼을 눌러 캘린더를 이미지로 저장

---

## 📌 향후 추가 예정 기능 (옵션)

✅ **애니메이션 효과 추가** (캘린더 전환 시 부드러운 효과)  
✅ **검색 기능** (특정 방송 및 이벤트 필터링)  
✅ **이벤트 공유 기능** (SNS 공유 버튼 추가)
