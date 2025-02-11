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
