axios
  .get("/user/scoreAvg", {
    params: {},
  })
  .then(function (response) {
    let data = response.data;
    var avg_grade = [];
    var ge = [];
    var major = [];
    var year_semester = [];
    data.forEach(function (item) {
      avg_grade.push(item.all);
      ge.push(item.ge);
      major.push(item.major);
      year_semester.push([item.year, item.semester]);
    });
    user_grade_graph(avg_grade, ge, major, year_semester);
  })
  .catch(function (error) {
    console.log(error);
  });

function user_grade_graph(avg_grade, ge, major, year_semester) {
  // 거꾸로
  semesterLabels = [];
  for (var i = year_semester.length - 1; i >= 0; i--) {
    semesterLabels.push(
      year_semester[i][0] + "년 " + year_semester[i][1] + "학기"
    );
  }
  // 그래프 생성
  const ctx = document.getElementById("myLineChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: semesterLabels,
      datasets: [
        {
          label: "전체",
          data: avg_grade,
          fill: false,
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 1,
        },
        {
          label: "전공",
          data: major,
          fill: false,
          borderColor: "rgba(0, 255, 0, 1)",
          borderWidth: 1,
        },
        {
          label: "교양",
          data: ge,
          fill: false,
          borderColor: "rgba(0, 0, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 4.5,
          stepSize: 0.5,
        },
      },
    },
  });
}
