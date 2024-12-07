let currentYear = new Date().getFullYear(); // 현재 연도 자동으로 설정
let currentMonth = "dec"; // 기본적으로 5월을 표시
const holidayImage = "images/holiday_image.png"; // 휴방일 이미지 설정

const holidays = {
  "2024-09-16": "추석 연휴",
  "2024-09-17": "추석 연휴",
  "2024-09-18": "추석 연휴",
};

// 연도 변경 함수
function changeYear(direction) {
  currentYear += direction;
  document.getElementById("current-year").textContent = currentYear;
  document.getElementById("calendar-year").textContent = currentYear;
  loadScheduleData(); // 연도 변경 시 데이터 로드
}

// 연도와 월을 함께 변경하는 함수
function changeYearMonth(selectedValue) {
  const [year, month] = selectedValue.split("-");
  currentYear = parseInt(year, 10); // 연도 업데이트
  currentMonth = month; // 월 업데이트
  document.getElementById("calendar-year").textContent = currentYear + "년";
  updateCalendarHeader(currentMonth);
  showMonth(currentMonth);
  loadScheduleData(); // 선택된 연도에 맞는 데이터 로드
}

// 연도와 월 정보 업데이트 함수
function updateCalendarHeader(monthId) {
  const monthNames = {
    may: "5월",
    jun: "6월",
    jul: "7월",
    aug: "8월",
    sep: "9월",
    oct: "10월",
    nov: "11월",
    dec: "12월",
  };
  document.getElementById("calendar-month").textContent = monthNames[monthId];
}

// // 연도와 월 정보 업데이트 함수
// function updateCalendarHeader(monthId) {
//   const monthNames = {
//     may: "5월",
//     jun: "6월",
//     jul: "7월",
//     aug: "8월",
//     sep: "9월",
//   };
//   document.getElementById("calendar-year").textContent = currentYear + "년";
//   document.getElementById("calendar-month").textContent = monthNames[monthId]; // 숫자+월로 변환
// }

// 초기화 함수 (연도 및 월 셀렉트 박스 설정)
function initializeSelectors() {
  const yearMonthSelect = document.getElementById("year-month-select");
  const currentYear = new Date().getFullYear();

  const availableMonths = [
    { year: 2024, month: "may", label: "2024년 5월" },
    { year: 2024, month: "jun", label: "2024년 6월" },
    { year: 2024, month: "jul", label: "2024년 7월" },
    { year: 2024, month: "aug", label: "2024년 8월" },
    { year: 2024, month: "sep", label: "2024년 9월" },
    { year: 2024, month: "oct", label: "2024년 10월" },
    { year: 2024, month: "nov", label: "2024년 11월" },
    { year: 2024, month: "dec", label: "2024년 12월" },
  ];

  // 셀렉트 박스에 연도와 월 추가
  availableMonths.forEach(({ year, month, label }) => {
    const option = document.createElement("option");
    option.value = `${year}-${month}`;
    option.textContent = label;
    yearMonthSelect.appendChild(option);
  });

  // 현재 연도와 월을 기본값으로 선택
  const defaultValue = `${currentYear}-${currentMonth}`;
  yearMonthSelect.value = defaultValue;

  updateCalendarHeader(currentMonth);
  showMonth(currentMonth);
}

// 연도에 맞는 JSON 데이터 불러오기
async function loadScheduleData() {
  try {
    const response = await fetch(`${currentYear}_schedule.json`); // 연도별로 다른 JSON 파일 사용
    const data = await response.json();
    applyScheduleData(data);
  } catch (error) {
    console.error(`Error loading schedule data for ${currentYear}:`, error);
    // alert(`${currentYear}년도 데이터를 불러오는 데 실패했습니다.`);
    generateEmptyCalendar(); // 데이터가 없을 경우 빈 달력 생성
  }
}

// 빈 달력 생성 함수 (일정 데이터가 없을 경우)
function generateEmptyCalendar() {
  document.querySelectorAll(".month").forEach((monthContainer) => {
    monthContainer.innerHTML = ""; // 기존 데이터 초기화
    const daysInMonth = new Date(
      currentYear,
      monthContainer.idToMonthIndex(),
      0
    ).getDate(); // 각 달의 일수 계산
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("calendar-cell");
      dayCell.innerText = day; // 기본적으로 날짜만 표시
      monthContainer.appendChild(dayCell);
    }
  });
}

// 달력에 데이터를 적용하는 함수 (요일 구조 포함)
function applyScheduleData(data) {
  document.querySelectorAll(".month").forEach((monthContainer) => {
    monthContainer.innerHTML = ""; // 기존 데이터 초기화
    const daysInMonth = new Date(
      currentYear,
      monthContainer.idToMonthIndex(),
      0
    ).getDate(); // 각 달의 일수 계산

    // 해당 월의 첫 번째 날짜 요일 계산
    const firstDayOfMonth = new Date(
      currentYear,
      monthContainer.idToMonthIndex() - 1,
      1
    ).getDay(); // 0: Sunday, 1: Monday, ...

    // 빈 셀 채우기 (월의 첫 요일에 맞춰)
    for (let empty = 0; empty < firstDayOfMonth; empty++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("calendar-cell", "empty-cell");
      monthContainer.appendChild(emptyCell);
    }

    // 실제 날짜 셀 생성
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("calendar-cell");

      // 날짜 텍스트 오버레이 추가
      const dateOverlay = document.createElement("div");
      dateOverlay.classList.add("date-overlay");
      dateOverlay.textContent = day;
      dayCell.appendChild(dateOverlay);

      // 요일 계산 (0: 일요일, 6: 토요일)
      const dayOfWeek = (firstDayOfMonth + day - 1) % 7;
      if (dayOfWeek === 0) {
        dayCell.classList.add("sunday"); // 일요일 스타일 추가
      } else if (dayOfWeek === 6) {
        dayCell.classList.add("saturday"); // 토요일 스타일 추가
      }

      // 추석 연휴 확인
      const currentDate = `${currentYear}-${String(
        monthContainer.idToMonthIndex()
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (holidays[currentDate]) {
        dayCell.classList.add("holiday"); // 추석 연휴 스타일 추가
        dayCell.title = holidays[currentDate]; // 추석 연휴 설명 추가 (툴팁)
      }

      // 일정 데이터가 있는지 확인
      const monthData = data[monthContainer.id] || [];
      const event = monthData.find((event) => event.day === day);

      if (event) {
        // 이미지가 있는 경우 배경 이미지 설정
        if (event.image) {
          dayCell.style.backgroundImage = `url(${event.image})`;
          dayCell.style.backgroundSize = "cover"; // 이미지를 덮어 씌움
          dayCell.style.backgroundPosition = "center";
        }

        // 팝업 이벤트 연결 (텍스트는 팝업에서만 표시)
        dayCell.addEventListener("click", () => {
          openPopup(event);
        });
      }

      monthContainer.appendChild(dayCell);
    }
  });
}

// 팝업 열기 함수 수정
function openPopup(event) {
  const popup = document.getElementById("popup");
  const eventTitle = document.getElementById("event-title");
  const eventImages = document.getElementById("event-images");
  const eventQuote = document.getElementById("event-quote");

  // 팝업 데이터 설정
  eventTitle.textContent = event.holiday ? "휴방" : event.event;

  // 휴방일이라도 quote가 있으면 표시
  if (event.quote && event.quote !== "") {
    eventQuote.innerHTML = event.quote.replace(/\n/g, "<br>"); // \n을 <br>로 대체
  } else {
    eventQuote.innerHTML = event.holiday
      ? "오늘은 휴방입니다.<br>다음 방송에서 만나요!"
      : event.quote;
  }

  // 이미지 슬라이드 처리
  eventImages.innerHTML = ""; // 기존 이미지 초기화
  const images = event.holiday ? [holidayImage] : event.additionalImages; // 휴방일에는 휴방 이미지만 표시

  if (images.length > 0) {
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider");

    const prevButton = document.createElement("button");
    prevButton.textContent = "◀";
    prevButton.classList.add("slider-btn", "prev");

    const nextButton = document.createElement("button");
    nextButton.textContent = "▶";
    nextButton.classList.add("slider-btn", "next");

    const sliderWrapper = document.createElement("div");
    sliderWrapper.classList.add("slider-wrapper");

    // 유튜브 링크가 있을 경우 첫 번째 슬라이드로 추가
    if (event.youtubeLink) {
      const youtubeIframe = document.createElement("iframe");
      youtubeIframe.src = event.youtubeLink;
      youtubeIframe.width = "100%";
      youtubeIframe.height = "315";
      youtubeIframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      youtubeIframe.allowFullscreen = true;
      youtubeIframe.classList.add("slide", "active"); // 첫 번째 슬라이드로 활성화
      sliderWrapper.appendChild(youtubeIframe);
    }

    images.forEach((imgSrc, index) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.classList.add("slide");
      if (!event.youtubeLink && index === 0) {
        img.classList.add("active"); // 첫 번째 이미지를 기본으로 표시
      }
      sliderWrapper.appendChild(img);
    });

    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(sliderWrapper);
    sliderContainer.appendChild(nextButton);
    eventImages.appendChild(sliderContainer);

    // 슬라이더 동작 로직
    let currentIndex = 0;
    const slides = sliderWrapper.querySelectorAll(".slide");

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
          slide.classList.add("active");
        }
      });
    }

    prevButton.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      showSlide(currentIndex);
    });

    nextButton.addEventListener("click", () => {
      currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
      showSlide(currentIndex);
    });
  }

  popup.style.display = "flex"; // 팝업 열기
}

// 팝업 닫기
const closePopup = document.querySelector(".close");
closePopup.addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

window.addEventListener("click", (event) => {
  const popup = document.getElementById("popup");
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

document.getElementById("save-btn").addEventListener("click", () => {
  const calendarContainer = document.querySelector(".calendar-container");

  html2canvas(calendarContainer, {
    scale: 2, // 고해상도 캡처를 위해 배율을 높임
    useCORS: true, // CORS 문제 방지
    backgroundColor: "#ffffff", // 배경색을 흰색으로 설정
  }).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${currentYear}-${currentMonth}-Calendar.png`; // 파일 이름을 현재 연도와 월로 설정
    link.click();
  });
});

// 초기 로드 시 기본 설정
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("calendar-year").textContent = currentYear + "년";
  initializeSelectors(); // 초기화 함수 실행
  loadScheduleData(); // 일정 데이터 로드
});

// 달력 표시 함수 (기존 로직 유지)
function showMonth(monthId) {
  currentMonth = monthId;
  updateCalendarHeader(monthId); // 월 정보 업데이트
  document.querySelectorAll(".month").forEach((month) => {
    month.style.display = "none";
  });
  document.getElementById(monthId).style.display = "grid";
}

// 월 ID를 월 인덱스로 변환하는 함수 (ex: 'may' -> 4)
Object.prototype.idToMonthIndex = function () {
  const monthMap = {
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };
  return monthMap[this.id];
};
