document.addEventListener("DOMContentLoaded", function () {
  initializeSelectors(); // 연도 및 월 셀렉트 박스 초기화
  loadScheduleData(); // 일정 데이터 로드
  document.getElementById("calendar-year").textContent = currentYear + "년";

  // 팝업 닫기 이벤트
  const closePopup = document.querySelector(".close");
  closePopup.addEventListener("click", closePopupModal);

  window.addEventListener("click", (event) => {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
      closePopupModal();
    }
  });
});
