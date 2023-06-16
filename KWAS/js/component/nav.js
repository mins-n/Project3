const nav = document.querySelector("nav");

fetch("../component/nav.html")
  .then((res) => res.text())
  .then((data) => {
    nav.innerHTML = data;

    const sidebarToggle = document.getElementById("sidebarToggle");
    const layoutSidenav = document.getElementById("layoutSidenav");

    sidebarToggle.addEventListener("click", () => {
      layoutSidenav.classList.toggle("sb-sidenav-toggled");
    });

    axios
      .get("/user/get", {
        params: {},
      })
      .then(function (response) {
        let data = response.data;
        console.log(data);
        user_class = data[0].user_class;
        console.log(user_class);
        study_nav(user_class);
        service_nav(user_class);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

function study_nav(user_class) {
  study_nav = document.getElementById("study_nav");
  study_nav.innerHTML = "";
  if (user_class == 2) {
    study_nav.innerHTML += `
      <a class="nav-link" href="../study/grade.html">성적조회</a>
      <a class="nav-link" href="../study/calendar.html">학사일정</a>
      `;
  } else if (user_class == 1) {
    study_nav.innerHTML += `
      <a class="nav-link" href="../study/professor_lecture.html">성적입력</a>
      <a class="nav-link" href="../study/calendar.html">학사일정</a>
      `;
  }
}

function service_nav(user_class) {
  service_nav = document.getElementById("service_nav");
  service_nav.innerHTML = "";
  if (user_class == 2) {
    service_nav.innerHTML += `
      <a class="nav-link" href="../service/fee.html">등록금조회</a>
        <a class="nav-link" href="../service/scholar.html">장학금조회</a>
        <a class="nav-link" href="../service/rating.html">강의평가</a>
        <a class="nav-link" href="../service/professor.html">교수정보조회</a>
      `;
  } else if (user_class == 1) {
    service_nav.innerHTML += `
      <a class="nav-link" href="../service/rating.html">강의평가</a>
      <a class="nav-link" href="../service/professor.html">교수정보조회</a>
      `;
  }
}
