axios.get("/user/professor/lecture/" + lectureCode)
  .then(function (response) {
    var students = response.data;

    var lectureInfoTable = document.getElementById("lectureInfoTable");
    lectureInfoTable.innerHTML = ""; // Clear existing table content

    var lectureInfoRows = "";
    students.forEach(function (student) {
      lectureInfoRows += "<tr><td>학생 ID</td><td>" + student.user_id + "</td><td>이름</td><td>" + student.name + "</td><td>학점</td><td><input type='text' name='grade' id='grade_" + student.user_id + "' value='" + student.grade + "'></td><td><button onclick='saveGrade(" + JSON.stringify(student.user_id) + ", " + JSON.stringify(lectureCode) + ")'>입력</button></td></tr>";
    });
    lectureInfoTable.innerHTML = lectureInfoRows;

    var planTableBody = document.querySelector("#planTable tbody");
    planTableBody.innerHTML = ""; // Clear existing table rows

    students.forEach(function (student) {
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + student.user_id + "</td><td>" + student.name + "</td><td><input type='text' name='grade' id='grade_" + student.user_id + "' value='" + student.grade + "'></td><td><button onclick='saveGrade(" + JSON.stringify(student.user_id) + ", " + JSON.stringify(lectureCode) + ")'>입력</button></td>";
      planTableBody.appendChild(row);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function saveGrade(userId, lectureCode) {
  var gradeInput = document.getElementById("grade_" + userId);
  var gradeValue = gradeInput.value;

  // Prepare data to send
  var data = {
    user_id: userId,
    lecture_code: lectureCode,
    grade: gradeValue
  };
  console.log(data);
  // Send data to the server using Axios
  axios.post("/user/professor/lecture/score", data)
    .then(function (response) {
      // Handle the response from the server if needed
      console.log(response.data);
    })
    .catch(function (error) {
      // Handle errors if any
      console.log(error);
    });
}
