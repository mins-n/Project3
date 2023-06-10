// JavaScript code to load content dynamically into the second section
var dynamicHeader = document.getElementById("dynamicHeader");
fetch("../component/header.html")
  .then((res) => res.text())
  .then((data) => {
    dynamicHeader.innerHTML = data;
    initializeHeader();
  });

function initializeHeader() {
  const userNameContainer = document.getElementById("navbarDropdown");
  if (userNameContainer) {
    const studentId = 2018202000;
    const name = "김이름";
    userNameContainer.innerHTML = `<i class="fas fa-user fa-fw"></i> ${studentId} ${name}`;
  }
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
