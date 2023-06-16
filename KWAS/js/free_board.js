axios
  .get("/boards/boardList", {
    params: {
      board_name: "자유게시판 ",
    },
  })
  .then(function (response) {
    data = response.data.list;
    board_list = [];
    post_codes = [];
    i = 1;
    data.forEach(function (item) {
      var boardData = [
        i,
        item.title,
        item.post_date.substr(0, 10),
        item.view_count,
      ];
      post_codes.push(item.post_code);
      board_list.push(boardData);
      i++;
    });
    if (board_list.length == 0) {
      alert("게시글이 없습니다.");
      basic_table();
    } else {
      lec_table(board_list, post_codes);
    }
  })
  .catch(function (error) {});

function free_boards() {
  axios
    .get("/boards/boardList", {
      params: {
        board_name: "자유게시판 ",
      },
    })
    .then(function (response) {
      data = response.data.list;
      board_list = [];
      post_codes = [];
      i = 1;
      data.forEach(function (item) {
        var boardData = [
          i,
          item.title,
          "",
          item.post_date.substr(0, 10),
          item.view_count,
        ];
        post_codes.push(item.post_code);
        board_list.push(boardData);
        i++;
      });
      if (board_list.length == 0) {
        alert("해당 과목의 공지가 없습니다.");
        basic_table();
      } else {
        lec_table(board_list, post_codes);
      }
    })
    .catch(function (error) {});
}

function lec_table(data, post_codes) {
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
    var headers = ["번호", "제목", "등록일", "조회수"];

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
        if (index === 0) {
          cell.style.width = "5%";
        }
        // /boards/post/:post_code 링크로 연결
        if (index === 1) {
          var a = document.createElement("a");
          a.href = "/boards/board.html?post_value=" + post_codes[index];
          a.appendChild(document.createTextNode(cellData));
          cell.appendChild(a);
        } else {
          cell.appendChild(document.createTextNode(cellData));
        }
        rowElement.appendChild(cell);
        tbody.appendChild(rowElement);
      });
    });
    table.appendChild(tbody);

    // Add the table to the document body or a specific container
    var lec_table_container = document.getElementById("lec_table_container");
    lec_table_container.innerHTML = ""; // 기존 내용을 초기화
    lec_table_container.appendChild(table);

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

    lec_table_container.appendChild(paginationContainer);
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

// 빈 테이블 생성
function basic_table() {
  var table = document.createElement("table");
  table.className = "table table-hover";
  table.id = "table";

  // Create the table header
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["번호", "제목", "등록일", "조회수"];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.style.width = "10%";
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  var tbody = document.createElement("tbody");
  var rowElement = document.createElement("tr");
  var cell = document.createElement("td");
  cell.appendChild(document.createTextNode("등록된 게시글이 없습니다."));
  cell.colSpan = 5;
  cell.style.textAlign = "center";
  rowElement.appendChild(cell);
  tbody.appendChild(rowElement);
  table.appendChild(tbody);

  // Add the table to the document body or a specific container
  var lec_table_container = document.getElementById("lec_table_container");
  lec_table_container.innerHTML = ""; // 기존 내용을 초기화
  lec_table_container.appendChild(table);
}
