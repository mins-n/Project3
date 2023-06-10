var data = [
  ["H020-4-0846-01", "소프트웨어공학", "전선", "3", "이기훈", "02-940-8674"],
  ["H020-4-8483-01", "머신러닝", "전선", "3", "박철수", "02-940-8251"],
  ["H020-4-8964-01", "한국사", "전선", "3", "박현우", "02-940-8964"],
  ["H020-4-1297-01", "디지털통신", "전선", "3", "김지영", "02-940-1297"],
  ["H020-4-7365-01", "경영학", "전선", "3", "정민주", "02-940-7365"],
  ["H020-4-5241-01", "데이터베이스", "전선", "3", "이승호", "02-940-5241"],
  ["H020-4-3210-01", "프로그래밍언어", "전선", "3", "김영희", "02-940-3210"],
  ["H020-4-7531-01", "알고리즘", "전선", "3", "이동민", "02-940-7531"],
  ["H020-4-9268-01", "통계학", "전선", "3", "장수민", "02-940-9268"],
  ["H020-4-4625-01", "자료구조", "전선", "3", "홍길동", "02-940-4625"],
  ["H020-4-7892-01", "운영체제", "전선", "3", "김태호", "02-940-7892"],
  ["H020-4-1485-01", "네트워크", "전선", "3", "이지수", "02-940-1485"],
  ["H020-4-6027-01", "인공지능", "전선", "3", "신민지", "02-940-6027"],
  ["H020-4-3654-01", "컴퓨터구조", "전선", "3", "박상훈", "02-940-3654"],
  ["H020-4-8873-01", "컴파일러", "전선", "3", "김철민", "02-940-8873"],
  ["H020-4-5214-01", "데이터마이닝", "전선", "3", "정미경", "02-940-5214"],
  ["H020-4-6996-01", "암호학", "전선", "3", "이승연", "02-940-6996"],
  ["H020-4-2369-01", "소프트웨어테스팅", "전선", "3", "박민수", "02-940-2369"],
  ["H020-4-8745-01", "웹개발", "전선", "3", "김지훈", "02-940-8745"],
  ["H020-4-5820-01", "컴퓨터비전", "전선", "3", "이승우", "02-940-5820"],
  ["H020-4-3698-01", "데이터통신", "전선", "3", "정민석", "02-940-3698"],
  ["H020-4-4571-01", "시스템프로그래밍", "전선", "3", "박지원", "02-940-4571"],
  ["H020-4-9304-01", "운영체제실습", "전선", "3", "김민수", "02-940-9304"],
  ["H020-4-5469-01", "컴퓨터그래픽스", "전선", "3", "이영호", "02-940-5469"],
  ["H020-4-7032-01", "빅데이터분석", "전선", "3", "정지원", "02-940-7032"],
  ["H020-4-8347-01", "인터넷프로그래밍", "전선", "3", "김민지", "02-940-8347"],
  ["H020-4-1203-01", "알고리즘실습", "전선", "3", "박지은", "02-940-1203"],
  ["H020-4-7596-01", "임베디드시스템", "전선", "3", "이성준", "02-940-7596"],
  ["H020-4-9241-01", "사물인터넷", "전선", "3", "정민호", "02-940-9241"],
  ["H020-4-5130-01", "소프트웨어보안", "전선", "3", "김태영", "02-940-5130"],
  ["H020-4-6782-01", "시스템해킹", "전선", "3", "박진호", "02-940-6782"],
  ["H020-4-3419-01", "웹보안", "전선", "3", "이현우", "02-940-3419"],
  ["H020-4-9056-01", "정보검색", "전선", "3", "김지민", "02-940-9056"],
  ["H020-4-5274-01", "데이터분석방법론", "전선", "3", "정재민", "02-940-5274"],
];

var itemsPerPage = 10; // 한 페이지에 표시할 항목 수
var currentPage = 1; // 현재 페이지
var totalPages = Math.ceil(data.length / itemsPerPage); // 전체 페이지 수

function renderTable() {
  // 계산된 시작 인덱스와 끝 인덱스를 사용하여 현재 페이지에 표시할 데이터를 가져옵니다.
  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;
  var currentPageData = data.slice(startIndex, endIndex);

  // 기존 테이블 제거
  var oldTable = document.getElementById("table");
  if (oldTable) {
    oldTable.remove();
  }
  // Create the table element
  var table = document.createElement("table");
  table.className = "table table-hover";
  table.id = "table";

  // Create the table header
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["학정번호", "과목명", "이수구분", "학점", "교수명", "연락처"];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.style.width = "10%";
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  var tbody = document.createElement("tbody");

  currentPageData.forEach(function (row) {
    var rowElement = document.createElement("tr");

    row.forEach(function (cellData, index) {
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(cellData));

      // Style the first column as "No."
      if (index === 0) {
        cell.style.width = "5%";
      }

      rowElement.appendChild(cell);
      tbody.appendChild(rowElement);
    });
  });
  table.appendChild(tbody);

  // Add the table to the document body or a specific container
  var syllabus_container = document.getElementById("syllabus_container");
  syllabus_container.innerHTML = ""; // 기존 내용을 초기화
  syllabus_container.appendChild(table);

  // 페이지 네이션 버튼 생성
  var paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination";

  var previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "btn btn-primary previous-button";
  previousButton.appendChild(document.createTextNode("이전"));
  previousButton.addEventListener("click", goToPreviousPage);
  paginationContainer.appendChild(previousButton);

  for (var i = 1; i <= totalPages; i++) {
    var pageButton = document.createElement("button");
    pageButton.type = "button";
    pageButton.className = "btn btn-primary";
    if (i === currentPage) {
      pageButton.className += " current-page";
    }
    pageButton.appendChild(document.createTextNode(i));
    pageButton.addEventListener(
      "click",
      (function (page) {
        return function () {
          goToPage(page);
        };
      })(i)
    ); // 클로저로 현재의 i 값을 캡처하여 사용
    paginationContainer.appendChild(pageButton);
  }

  var nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "btn btn-primary next-button";
  nextButton.appendChild(document.createTextNode("다음"));
  nextButton.addEventListener("click", goToNextPage);
  paginationContainer.appendChild(nextButton);

  syllabus_container.appendChild(paginationContainer);
}

function goToPage(page) {
  // 현재 페이지 갱신
  currentPage = page;

  // 테이블 다시 렌더링
  renderTable();
}

function goToPreviousPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function goToNextPage() {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
}

// 초기 테이블 렌더링
renderTable();
