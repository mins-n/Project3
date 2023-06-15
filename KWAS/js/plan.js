axios.get("/course_management/plan?lecture_code=" + lectureCode)
  .then(function (response) {
    var data = response.data;
    var lectureInfo = data.lectureInfo[0];
    var planList = data.planList;

    // Display lecture information
    var lectureInfoTable = document.getElementById("lectureInfoTable");
    lectureInfoTable.innerHTML = ""; // Clear existing table content

    var lectureInfoRows = "";
    lectureInfoRows += "<tr><th>학정 번호</th><td>" + lectureInfo.lecture_code + "</td></tr>";
    lectureInfoRows += "<tr><th>교과명</th><td>" + lectureInfo.lecture_name + "</td></tr>";
    lectureInfoRows += "<tr><th>이수구분</th><td>" + lectureInfo.lecture_class + "</td></tr>";
    lectureInfoRows += "<tr><th>교과목 개요</th><td>" + lectureInfo.lecture_info + "</td></tr>";
    lectureInfoTable.innerHTML = lectureInfoRows;

    // Display weekly plan
    var planTableBody = document.querySelector("#planTable tbody");
    planTableBody.innerHTML = ""; // Clear existing table rows

    planList.forEach(function (plan) {
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + plan.week + "</td><td>" + plan.plan + "</td>";
      planTableBody.appendChild(row);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
