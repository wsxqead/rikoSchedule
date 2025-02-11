// 현재 연도와 월 동적 설정
let currentYear = new Date().getFullYear();
let currentMonth = new Date()
  .toLocaleString("en-US", { month: "short" })
  .toLowerCase();

const holidayImage = "images/holiday_image.png"; // 휴방일 이미지 설정

const holidays = {
  "2024-09-16": "추석 연휴",
  "2024-09-17": "추석 연휴",
  "2024-09-18": "추석 연휴",
};

// 연도에 맞는 JSON 데이터 불러오기
async function loadScheduleData() {
  try {
    const response = await fetch(`${currentYear}_schedule.json`); // 연도별로 다른 JSON 파일 사용
    const data = await response.json();
    applyScheduleData(data);
  } catch (error) {
    console.error(`Error loading schedule data for ${currentYear}:`, error);
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

// 슬라이드 전환 로직 최적화
function showSlide(index, slides) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function setupSlider(sliderWrapper) {
  let currentIndex = 0;
  const slides = sliderWrapper.querySelectorAll(".slide");

  if (slides.length === 0) return;

  const prevButton = document.createElement("button");
  prevButton.textContent = "◀";
  prevButton.classList.add("slider-btn", "prev");
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex, slides);
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "▶";
  nextButton.classList.add("slider-btn", "next");
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex, slides);
  });

  sliderWrapper.parentElement.appendChild(prevButton);
  sliderWrapper.parentElement.appendChild(nextButton);
  showSlide(currentIndex, slides);
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

    if (event.chzzkLink) {
      const chzzkSlide = document.createElement("div");
      chzzkSlide.classList.add("chzzk-preview");

      if (event.chzzkImage) {
        const chzzkThumbnail = document.createElement("img");
        chzzkThumbnail.src = event.chzzkImage;
        chzzkSlide.appendChild(chzzkThumbnail);
      }

      const chzzkButton = document.createElement("button");
      chzzkButton.textContent = "치지직 영상 보기";
      chzzkButton.classList.add("chzzk-button");
      chzzkButton.addEventListener("click", () => {
        window.open(event.chzzkLink, "_blank");
      });

      chzzkSlide.appendChild(chzzkButton);

      chzzkSlide.classList.add("slide", "active");

      sliderWrapper.appendChild(chzzkSlide);
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

// 월 ID를 월 인덱스로 변환하는 함수 (ex: 'may' -> 4)
Object.prototype.idToMonthIndex = function () {
  const monthMap = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
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
