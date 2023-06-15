axios
.get("/course_management/syllabus_inquiry", {})
.then(function (response) {
  let data = response.data;
  var processedData = [];

  data.forEach(function (item) {
    var lectureData = [
      item.lecture_code,
      item.name,
      item.lecture_name,
      item.lecture_class,
      item.credit.toString(),
      item.phone_num,
    ];
    processedData.push(lectureData);
  });
  console.log(processedData);
  display(processedData);
})
.catch(function (error) {
  console.log(error);
});

function loadTable(name) {
    axios
        .get("/course_management/syllabus_inquiry", {
            params: {
                professor_name: name,
            },
        })
        .then(function (response) {
            let data = response.data;
            var processedData = [];

            data.forEach(function (item) {
                var lectureData = [
                    item.lecture_code,
                    item.name,
                    item.lecture_name,
                    item.lecture_class,
                    item.credit.toString(),
                    item.phone_num,
                ];
                processedData.push(lectureData);
            });
            display(processedData);
        }
        )
        .catch(function (error) {
            console.log(error);
        }
        );
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
        "재직학과",
        "이름",
        "직위",
        "연구실",
        "위치",
        "전공분야",
        "전화번호",
        "연락처",
      ];
  
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
      var professor_container = document.getElementById("professor_container");
      professor_container.innerHTML = ""; // 기존 내용을 초기화
      professor_container.appendChild(table);
  
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
  
      professor_container.appendChild(paginationContainer);
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