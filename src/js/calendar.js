let currentYear = new Date().getFullYear();
let currentMonth = new Date()
  .toLocaleString("en-US", { month: "short" })
  .toLowerCase();

const availableMonths = [
  { year: 2024, month: "may", label: "2024년 5월" },
  { year: 2024, month: "jun", label: "2024년 6월" },
  { year: 2024, month: "jul", label: "2024년 7월" },
  { year: 2024, month: "aug", label: "2024년 8월" },
  { year: 2024, month: "sep", label: "2024년 9월" },
  { year: 2024, month: "oct", label: "2024년 10월" },
  { year: 2024, month: "nov", label: "2024년 11월" },
  { year: 2024, month: "dec", label: "2024년 12월" },
  { year: 2025, month: "jan", label: "2025년 1월" },
  { year: 2025, month: "feb", label: "2025년 2월" },
  { year: 2025, month: "mar", label: "2025년 3월" },
  { year: 2025, month: "apr", label: "2025년 4월" },
  { year: 2025, month: "may", label: "2025년 5월" },
];

// 연도 및 월 선택 박스 초기화
function initializeSelectors() {
  const yearMonthSelect = document.getElementById("year-month-select");
  yearMonthSelect.innerHTML = ""; // 기존 옵션 초기화

  availableMonths.forEach(({ year, month, label }) => {
    const option = document.createElement("option");
    option.value = `${year}-${month}`;
    option.textContent = label;
    yearMonthSelect.appendChild(option);
  });

  yearMonthSelect.value = `${currentYear}-${currentMonth}`;
  updateCalendarHeader(currentMonth);
  showMonth(currentMonth);
}

// 연도 변경
function changeYear(direction) {
  currentYear += direction;
  document.getElementById("calendar-year").textContent = currentYear + "년";
  initializeSelectors();
  loadScheduleData();
}

// 연도와 월 함께 변경
function changeYearMonth(selectedValue) {
  const [year, month] = selectedValue.split("-");
  currentYear = parseInt(year, 10);
  currentMonth = month;
  document.getElementById("calendar-year").textContent = currentYear + "년";
  updateCalendarHeader(currentMonth);
  showMonth(currentMonth);
  loadScheduleData();
}

// 달력 헤더 업데이트
function updateCalendarHeader(monthId) {
  const monthNames = {
    jan: "1월",
    feb: "2월",
    mar: "3월",
    apr: "4월",
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

// 월별 보기 설정
function showMonth(monthId) {
  currentMonth = monthId;
  updateCalendarHeader(monthId);
  document.querySelectorAll(".month").forEach((month) => {
    month.style.display = "none";
  });
  document.getElementById(monthId).style.display = "grid";
}
function showMonth(monthId) {
  currentMonth = monthId;
  updateCalendarHeader(monthId);

  // 모든 월 숨기고 선택된 월만 표시
  document.querySelectorAll(".month").forEach((month) => {
    month.classList.remove("active");
    month.style.display = "none"; // 기본적으로 숨김
  });

  const selectedMonth = document.getElementById(monthId);
  selectedMonth.classList.add("active");

  // 화면 너비에 따라 다른 display 적용
  if (window.innerWidth <= 1200) {
    selectedMonth.style.display = "flex"; // 리스트 스타일
  } else {
    selectedMonth.style.display = "grid"; // 기존 PC 스타일
  }
}

// 화면 크기 변경 시 반응형 적용
window.addEventListener("resize", () => {
  if (document.querySelector(".month.active")) {
    showMonth(currentMonth);
  }
});
