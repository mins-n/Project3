axios
  .get("/main/header", {})
  .then(function (response) {
    let data = response.data;
    user_id = data[0].user_id;
    user_name = data[0].name;
    initializeHeader(user_id, user_name);
  })
  .catch(function (error) {
    console.log(error);
  });

function initializeHeader(studentId, name) {
  var dynamicHeader = document.getElementById("dynamicHeader");
  fetch("../component/header.html")
    .then((res) => res.text())
    .then((data) => {
      dynamicHeader.innerHTML = data;
      const userNameContainer = document.getElementById("navbarDropdown");
      if (userNameContainer) {
        userNameContainer.innerHTML = `<i class="fas fa-user fa-fw"></i> ${studentId} ${name}`;
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
