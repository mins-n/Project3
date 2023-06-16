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

    study_nav();
  });


  function study_nav(){
    axios
    .get("/user/get", {
    params: {},
    })
    .then(function (response) {
    let data = response.data;
    console.log(data);
    user_class = data[0].user_class;
    console.log(user_class);
    study_nav = document.getElementById("study_nav");
    study_nav.innerHTML = "";
    if (user_class == 2) {
      study_nav.innerHTML += `
      <a class="nav-link" href="../study/grade.html">성적조회</a>
      <a class="nav-link" href="#.html">학사일정</a>
      `;
    }else if(user_class == 1){
      study_nav.innerHTML += `
      <a class="nav-link" href="../study/listening_student.html">성적입력</a>
      <a class="nav-link" href="#.html">학사일정</a>
      `;
    }
    })
    .catch(function (error) {
    console.log(error);
    });
  }