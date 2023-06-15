axios
  .get("/user/professor/lecture/" + lectureCode)
  .then(function (response) {
    var students = response.data;

    var lectureInfoTable = document.getElementById("lectureInfoTable");
    lectureInfoTable.innerHTML = ""; // Clear existing table content

    var lectureInfoRows = "";
    students.forEach(function (student) {
      lectureInfoRows += "<tr><td>학생 ID</td><td>" + student.user_id + "</td><td>이름</td><td>" + student.name + "</td><td>학점</td><td><input type='text' name='grade' id='grade_" + student.user_id + "' value='" + student.grade + "'></td><td><button onclick='saveGrade(" + student.user_id + ")'>입력</button></td></tr>";
    });
    lectureInfoTable.innerHTML = lectureInfoRows;

    var planTableBody = document.querySelector("#planTable tbody");
    planTableBody.innerHTML = ""; // Clear existing table rows

    students.forEach(function (student) {
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + student.user_id + "</td><td>" + student.name + "</td><td><input type='text' name='grade' id='grade_" + student.user_id + "' value='" + student.grade + "'></td><td><button onclick='saveGrade(" + student.user_id + ")'>입력</button></td>";
      planTableBody.appendChild(row);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function saveGrade(userId) {
  var gradeInput = document.getElementById("grade_" + userId);
  var gradeValue = gradeInput.value;
  // 여기에서 학점 저장 로직을 구현하세요.
  // 저장 버튼을 클릭했을 때 실행되는 함수입니다.
  // userId와 gradeValue를 활용하여 학점을 저장하는 로직을 작성하세요.
}
