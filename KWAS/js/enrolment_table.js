var data = [
  [1, "H020-4-0846-01", "소프트웨어공학", 3, "이기훈", 10, "월 5, 수 6"],
  [2, "H020-4-8483-01", "머신러닝", 3, "박철수", 20, "월 3, 수 4"],
  [3, "H020-4-1234-01", "알고리즘", 3, "김영희", 15, "화 2, 목 3"],
  [4, "H020-4-5678-01", "데이터베이스", 3, "정성민", 5, "금 4"],
  [5, "H020-4-9012-01", "네트워크", 3, "홍길동", 8, "월 2, 수 3"],
  [6, "H020-4-7890-01", "컴퓨터그래픽스", 3, "이영자", 12, "목 4, 금 5"],
  [7, "H020-4-3456-01", "인공지능", 3, "박지성", 7, "월 6, 화 7"],
  [8, "H020-4-2345-01", "자료구조", 3, "김태호", 9, "화 6, 수 7"],
  [9, "H020-4-7891-01", "웹개발", 3, "이미라", 10, "목 5, 금 6"],
  [10, "H020-4-9013-01", "데이터마이닝", 3, "홍길순", 15, "월 4, 수 5"],
  [11, "H020-4-2468-01", "문학과영화", 3, "최지영", 18, "화 3, 수 4"],
  [12, "H020-4-1357-01", "사회학개론", 3, "박영호", 14, "월 3, 목 4"],
  [13, "H020-4-9753-01", "심리학입문", 3, "김민지", 20, "수 2, 목 3"],
  [14, "H020-4-8024-01", "경제학원론", 3, "이동욱", 16, "화 5, 목 6"],
  [15, "H020-4-6742-01", "미술사", 3, "정다은", 22, "월 4, 수 5"],
  [16, "H020-4-2856-01", "심리학개론", 3, "이지영", 10, "월 6, 수 7"],
  [17, "H020-4-5071-01", "국제경제학", 3, "박동현", 12, "화 4, 목 5"],
  [18, "H020-4-9602-01", "미디어커뮤니케이션", 3, "김하나", 15, "월 2, 수 3"],
  [19, "H020-4-7193-01", "문화인류학", 3, "정민서", 8, "수 4"],
  [20, "H020-4-6379-01", "세계문화사", 3, "홍길영", 6, "화 6, 목 7"],
  [21, "H020-4-8520-01", "프랑스어회화", 3, "김지애", 10, "수 5, 목 6"],
  [22, "H020-4-1438-01", "중국어회화", 3, "이성호", 12, "월 4, 금 5"],
  [23, "H020-4-3769-01", "스페인어회화", 3, "박지수", 9, "화 7, 목 1"],
  [24, "H020-4-5683-01", "일본어회화", 3, "정다희", 8, "화 2, 목 3"],
  [25, "H020-4-9237-01", "경영학원론", 3, "김민석", 15, "월 3, 수 4"],
  [26, "H020-4-7305-01", "마케팅원론", 3, "이지원", 12, "화 5, 목 6"],
  [27, "H020-4-2751-01", "재무관리", 3, "박동훈", 10, "월 4, 수 5"],
  [28, "H020-4-6192-01", "국제무역론", 3, "김지우", 14, "화 3, 목 4"],
  [29, "H020-4-8123-01", "금융공학", 3, "정수민", 9, "월 6, 수 7"],
  [30, "H020-4-9506-01", "호텔경영", 3, "홍길호", 8, "화 4, 목 5"],
  [31, "H020-4-7519-01", "서양음악사", 3, "이승진", 12, "수 2, 목 3"],
  [32, "H020-4-8964-01", "한국사", 3, "박현우", 15, "월 2, 수 3"],
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
  var headers = [
    "No.",
    "학정번호",
    "과목명",
    "학점",
    "교수명",
    "여석",
    "강의시간",
    "수강신청",
  ];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.style.width = "10%";
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
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
    });

    // Add an empty cell for the "수강신청" column
    var enrolButtonCell = document.createElement("td");
    var enrolButton = document.createElement("button");
    enrolButton.type = "button";
    enrolButton.className = "btn btn-primary";
    enrolButton.appendChild(document.createTextNode("수강신청"));
    enrolButtonCell.appendChild(enrolButton);
    rowElement.appendChild(enrolButtonCell);

    tbody.appendChild(rowElement);
  });

  table.appendChild(tbody);

  // Add the table to the document body or a specific container
  var enrolmentContainer = document.getElementById("enrolment_container");
  enrolmentContainer.innerHTML = ""; // 기존 내용을 초기화
  enrolmentContainer.appendChild(table);

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

  enrolmentContainer.appendChild(paginationContainer);
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
