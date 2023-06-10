const nav = document.querySelector("nav");

fetch("../component/nav.html")
  .then((res) => res.text())
  .then((data) => {
    // ��ư�� �ε��ϱ� ���� ������̼� ���̵�ٸ� �ε�
    nav.innerHTML = data;

    // ������̼� ���̵�ٸ� �ε��� �Ŀ� ��ư�� ���� �̺�Ʈ �����ʸ� ����
    const sidebarToggle = document.getElementById("sidebarToggle");
    const layoutSidenav = document.getElementById("layoutSidenav");

    sidebarToggle.addEventListener("click", () => {
      layoutSidenav.classList.toggle("sb-sidenav-toggled");
    });
  });
