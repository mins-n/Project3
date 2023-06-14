let user_id = "2018202091";
let year = "2023";
let semester = "1";

axios
  .get("/course_management/syllabus_inquiry", {
    params: {
      user_id: user_id,
    },
  })
  .then(function (response) {
    let data = response.data;
    var processedData = [];

    data.forEach(function (item) {
      index = 1;
      var lectureData = [
        index++,
        item.lecture_code,
        item.lecture_name,
        item.credit.toString(),
        item.name,
        "0",
        getDate(item.lecture_week1) +
          " " +
          item.lectire_time1 +
          ", " +
          getDate(item.lecture_week2) +
          " " +
          item.lectire_time2,
      ];
      processedData.push(lectureData);
    });
    console.log(processedData);
    display(processedData);
  })
  .catch(function (error) {
    console.log(error);
  });

function getDate(week_num) {
  if (week_num == 1) return "월";
  else if (week_num == 2) return "화";
  else if (week_num == 3) return "수";
  else if (week_num == 4) return "목";
  else if (week_num == 5) return "금";
  else return "";
}
function display(data) {
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
}
