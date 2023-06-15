axios
  .get("/course_management/list", {
    params: {},
  })
  .then(function (response) {
    let data = response.data;
    var processedData = [];
    data.forEach(function (item) {
      var lectureData = [
        item.lecture_code,
        item.lecture_name,
        item.credit.toString(),
        item.professor_name,
        getDate(item.lecture_week1) +
          " " +
          item.lecture_time1 +
          ", " +
          getDate(item.lecture_week2) +
          " " +
          item.lecture_time2,
      ];
      processedData.push(lectureData);
    });
    console.log(processedData);
    user_enrolment_table(processedData);
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

function user_enrolment_table(data) {
  // Create the table element
  var table = document.createElement("table");
  table.className = "table table-hover";
  table.id = "table";

  // Create the table header
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = [
    "학정번호",
    "과목명",
    "학점",
    "교수명",
    "강의시간",
    "수강취소",
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

    var enrolButtonCell = document.createElement("td");
    var enrolButton = document.createElement("button");
    enrolButton.type = "button";
    enrolButton.className = "btn btn-primary";
    enrolButton.appendChild(document.createTextNode("수강취소"));
    enrolButton.addEventListener("click", function () {
      post_enrolment(row[0]); // Pass the lecture code to the post_enrolment function
    });
    enrolButtonCell.appendChild(enrolButton);
    rowElement.appendChild(enrolButtonCell);

    tbody.appendChild(rowElement);
  });

  table.appendChild(tbody);

  // Add the table to the document body or a specific container
  var user_enrolmentContainer = document.getElementById(
    "user_enrolment_container"
  );
  user_enrolmentContainer.innerHTML = ""; // Clear the container contents
  user_enrolmentContainer.appendChild(table);
}

function post_enrolment(lecture_code) {
  console.log(lecture_code);
  axios
    .post("/course_management/enrolment", { lecture_code })
    .then((res) => {
      console.log(res);
      alert("수강삭제 성공");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      alert("수강삭제 실패");
      window.location.reload();
    });
}
