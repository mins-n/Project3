axios
  .get("/main/header", {})
  .then(function (response) {
    let data = response.data;
    user_id = data[0].user_id;
    user_name = data[0].name;
    initializeHeader(user_id, user_name);
  })
  .catch(function (error) {
    studentId = null;
    name = null;
    initializeHeader(studentId, name);
  });

function initializeHeader(studentId, name) {
  var dynamicHeader = document.getElementById("dynamicHeader");
  fetch("../component/header.html")
    .then((res) => res.text())
    .then((data) => {
      dynamicHeader.innerHTML = data;
      const userNameContainer = document.getElementById("userNameContainer");
      if (userNameContainer) {
        if (studentId && name){  
          userNameContainer.innerHTML = `<a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        <i class="fas fa-user fa-fw"></i> ${studentId} ${name}
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li>
            <a class="dropdown-item" href="#!" id="editLink" onclick="openEditPopup()">회원정보수정</a>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#!">로그아웃</a></li>
        </ul>`;
        }
        // 로그인 버튼 추가
        else
        userNameContainer.innerHTML = `  <div
        class="nav-link "
      >
      <i class="fas fa-user fa-fw"></i>
      <a href="../login_form/login.html" class="text-white text-decoration-none">로그인</a>
      <a href="../login_form/register.html" class="text-white text-decoration-none">회원가입</a>
      </div>
        `;
      }
    });
}

function openEditPopup() {
  document.getElementById("editPopup").style.display = "block";
}

function closeEditPopup() {
  document.getElementById("editPopup").style.display = "none";
}

// Show/hide the link based on certain conditions
const isAdmin = true; // Change this value based on your logic

if (isAdmin) {
  const editLink = document.getElementById("editLink");
  if (editLink) {
    editLink.style.display = "inline";
  }
}
