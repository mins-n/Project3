const nav = document.querySelector("nav");

fetch("../component/nav.html")
  .then((res) => res.text())
  .then((data) => {
    // 버튼을 로드하기 전에 내비게이션 사이드바를 로드
    nav.innerHTML = data;

    // 내비게이션 사이드바를 로드한 후에 버튼에 대한 이벤트 리스너를 연결
    const sidebarToggle = document.getElementById("sidebarToggle");
    const layoutSidenav = document.getElementById("layoutSidenav");

    sidebarToggle.addEventListener("click", () => {
      layoutSidenav.classList.toggle("sb-sidenav-toggled");
    });
  });
