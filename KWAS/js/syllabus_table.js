var data = [
  ["H020-4-0846-01", "소프트웨어공학", "전선", "3", "이기훈", "02-940-8674"],
  ["H020-4-8483-01", "머신러닝", "전선", "3", "박철수", "02-940-8251"],
];
// Create the table element
var table = document.createElement("table");
table.className = "table table-hover";

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

// Create the table body
var tbody = document.createElement("tbody");

data.forEach(function (row) {
  var rowElement = document.createElement("tr");

  row.forEach(function (cellData) {
    var cell = document.createElement("td");
    cell.appendChild(document.createTextNode(cellData));
    rowElement.appendChild(cell);
  });

  tbody.appendChild(rowElement);
});

table.appendChild(tbody);

// Add the table to the document body
document.body.appendChild(table);

var syllabus_container = document.getElementById("syllabus_container");
syllabus_container.appendChild(table);
