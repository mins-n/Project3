axios
  .get("/course_management/schedule", {
    params: {},
  })
  .then(function (response) {
    let data = response.data.semesterList;
    var processedData = [];
    data.forEach(function (item) {
      var lectureData = [item.year, item.semester];
      processedData.push(lectureData);
    });
    console.log(processedData);
    user_year_semester(processedData);
    init_table(processedData);
  })
  .catch(function (error) {});

function user_year_semester(data) {
  const user_select = document.getElementById("user_year_semester");
  user_select.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    option.value = JSON.stringify(data[i]);
    option.text = data[i][0] + "년 " + data[i][1] + "학기";
    if (i == 0) {
      option.setAttribute("selected", "selected");
    }
    user_select.appendChild(option);
  }
}

function init_table(data) {
  const year = data[0][0];
  const semester = data[0][1];
  user_Timetable(year, semester);
}
