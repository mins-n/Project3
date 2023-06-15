axios
  .get("/user/score", {
    params: {},
  })
  .then(function (response) {
    let data = response.data;
    var year_semester = [];
    var lec_data_list = [];
    data.forEach(function (item) {
      year_semester.push(item.year + "년 " + item.semester + "학기");
      lec_data = [];
      for (var i = 0; i < item.grade.length; i++) {
        lec_data.push([
          item.grade[i].lecture_code,
          item.grade[i].lecture_name,
          item.grade[i].lecture_class,
          item.grade[i].credit,
          item.grade[i].name,
          get_grade(item.grade[i].grade),
        ]);
      }
      lec_data_list.push(lec_data);
    });
    user_grade_table(year_semester, lec_data_list);
  })
  .catch(function (error) {
    console.log(error);
  });

function get_grade(grade) {
  if (grade == 0) return "F";
  else if (grade == 1) return "D";
  else if (grade == 1.5) return "D+";
  else if (grade == 2) return "C";
  else if (grade == 2.5) return "C+";
  else if (grade == 3) return "B";
  else if (grade == 3.5) return "B+";
  else if (grade == 4) return "A";
  else if (grade == 4.5) return "A+";
  else return "N/A";
}

function user_grade_table(year_semester, lec_data_list) {
  const grade_table_container = document.getElementById(
    "grade_table_container"
  );
  grade_table_container.innerHTML = "";
  for (var i = 0; i < year_semester.length; i++) {
    // 테이블 엘리먼트 생성
    const table = document.createElement("table");
    table.className = "table table-hover";

    // thead 생성
    const thead = document.createElement("thead");
    table.appendChild(thead);

    // thead 내용 추가
    const theadContent = `
        <tr>
            <th colspan="6" class="text-center">
            <h5>${year_semester[i]}</h5>
            </th>
        </tr>
        <tr>
            <th style="width: 15%">학정번호</th>
            <th style="width: 15%">과목명</th>
            <th style="width: 10%">이수구분</th>
            <th style="width: 10%">학점</th>
            <th style="width: 10%">교수명</th>
            <th style="width: 10%">성적</th>
        </tr>
        `;
    thead.innerHTML = theadContent;

    // tbody 생성
    const tbody = document.createElement("tbody");

    table.appendChild(tbody);

    // tbody 내용 추가
    tbody.innerHTML = user_lec_tbody(lec_data_list[i]);

    grade_table_container.appendChild(table);
  }
}

function user_lec_tbody(lec_data) {
  let tbodyContent = "";
  for (var i = 0; i < lec_data.length; i++) {
    console.log(lec_data[i]);
    tbodyContent += `
        <tr>
        <td>${lec_data[i][0]}</td>
        <td>${lec_data[i][1]}</td>
        <td>${lec_data[i][2]}</td>
        <td>${lec_data[i][3]}</td>
        <td>${lec_data[i][4]}</td>
        <td>${lec_data[i][5]}</td>
        </tr>
    `;
  }
  return tbodyContent;
}
