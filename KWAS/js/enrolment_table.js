var data = [
  [1, "H020-4-0846-01", "소프트웨어공학", 3, "이기훈", 10, "월 5, 수 6"],
  [2, "H020-4-8483-01", "머신러닝", 3, "박철수", 20, "월 3, 수 4"],
];

// Create the table element
var table = document.createElement("table");
table.className = "table table-hover";

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

data.forEach(function (row) {
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
enrolmentContainer.appendChild(table);
