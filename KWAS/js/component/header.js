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
        if (studentId && name) {
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
          <li><a class="dropdown-item" href="../login_form/login.html">로그아웃</a></li>
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
  write_edit_popup();
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

write_edit_popup();
function write_edit_popup() {
  axios
    .get("/user/get", {
      params: {},
    })
    .then(function (response) {
      let data = response.data;
      id = data[0].user_id;
      password = data[0].password;
      user_name = data[0].name;
      phone = data[0].phone_num;
      email = data[0].email;
      grade = data[0].grade;
      semester = data[0].semester;
      department = data[0].department_code;
      userClass = data[0].user_class;
      academicInfo = data[0].academic_info;
      profile = data[0].profile;

      if (id == null) id = "";
      if (password == null) password = "";
      if (user_name == null) user_name = "";
      if (phone == null) phone = "";
      if (email == null) email = "";
      if (grade == null) grade = "";
      if (semester == null) semester = "";
      if (department == null) department = "";
      if (userClass == null) userClass = "";
      if (academicInfo == null) academicInfo = "";
      if (profile == null) profile = "";

      write_edit_popup_html(id, user_name, email, phone, password);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function write_edit_popup_html(id, user_name, email, phone, password) {
  console.log(id, user_name, email, phone, password);
  const popup_container = document.getElementById("popup_container");
  console.log(popup_container);
  popup_container.innerHTML = `
    <span class="close" onclick="closeEditPopup()">&times;</span>
    <table class="table table-borderless text-center">
      <form>
        <tr>
          <h2 class="text-center">회원정보수정</h2>
        </tr>
        <tr>
          <td><label for="studentId">학번</label></td>
          <td>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value="${id}"
              readonly
              class="input-field"
            />
          </td>
        </tr>
        <tr>
          <td><label for="name">이름</label></td>
          <td>
            <input
              type="text"
              id="name"
              name="name"
              value="${user_name}"
              readonly
              class="input-field"
            />
          </td>
        </tr>
        <tr>
          <td><label for="email">이메일</label></td>
          <td>
            <input type="email" id="email" name="email" value="${email}" class="input-field" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required />
          </td>
        </tr>
        <tr>
          <td><label for="phone">전화번호</label></td>
          <td>
            <input type="tel" id="phone" name="phone" class="input-field" value ="${phone}" />
          </td>
        </tr>
        <tr>
          <td><label for="password">비밀번호 변경</label></td>
          <td>
            <input
              type="password"
              id="password"
              name="password"
              class="input-field"
            />
          </td>
        </tr>
        <tr>
          <td><label for="passwordCheck">비밀번호 확인</label></td>
          <td>
            <input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              class="input-field"
            />
          </td>
        </tr>
        <tr>
          <td><label for="originPassword">원래 비밀번호 확인</label></td>
          <td>
            <input
              type="password"
              id="originPassword"
              name="originPassword"
              class="input-field"
            />
      </form>
    </table>
    <div class="button-group" style="text-align: end;">
    <button type="submit" class="btn-save" style="width: 20%;" onclick="post_edit_user('${password}')">저장</button>
  </div>
    `;
}

function post_edit_user(origin_password) {
  const password = document.getElementById("password").value;
  const passwordCheck = document.getElementById("passwordCheck").value;
  const email = document.getElementById("email").value;
  const phone_num = document.getElementById("phone").value;
  const originPassword = document.getElementById("originPassword").value;
  console.log(password, passwordCheck, email, phone_num);
  axios
    .post("/user/update", {
      password,
      email,
      phone_num,
    })
    .then((res) => {
      if (origin_password == originPassword) {
        if (password != passwordCheck) {
          alert("변경할 비밀번호가 일치하지 않습니다.");
          window.location.reload();
        } else {
          console.log(res);
          alert("정보 변경 성공");
          window.location.reload();
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      alert("수강신청 실패");
      window.location.reload();
    });
}
