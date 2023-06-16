axios
  .get("/user/get", {
    params: {},
  })
  .then(function (response) {
    let data = response.data;
    console.log(data);
    user_class = data[0].user_class;
    if (user_class == 2) {
      display_adviser(user_class);
      display_year_semester_container(user_class);
      display_year_semester(user_class);
      user_proffesor();
    } else if (user_class == 1) {
      display_main_container(user_class);
    }
    display_card_header_container(user_class);
  })
  .catch(function (error) {
    console.log(error);
  });
function display_adviser(user_class) {
  console.log(user_class);
  if (user_class == 2) {
    user_adviser_row = document.getElementById("user_adviser_row");
    user_adviser_row.innerHTML = "";
    user_adviser_row.innerHTML = `<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        지도교수
    </div>
    <div class="container" style="width: 100%;">
        <div class="row" id="professor_container">
        <!-- 서버로부터 교수 정보 가져옴 -->
        </div>
    </div>`;
  }
}
function display_year_semester_container(user_class) {
  if (user_class == 2) {
    const year_semester_container = document.getElementById(
      "year_semester_container"
    );
    year_semester_container.innerHTML = `
        <select class="form-select" aria-label="Default select example" id="user_year_semester">
        </select>
            `;
  }
}
function display_year_semester(user_class) {
  if (user_class == 2) {
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
  }
}

function display_card_header_container(user_class) {
  if (user_class == 2) {
    const card_header_container = document.getElementById(
      "card_header_container"
    );
    card_header_container.innerHTML = `
        <div class="card-header">
        <i class="fas fa-table me-1"></i>
        시간표`;
  } else if (user_class == 1) {
    const card_header_container = document.getElementById(
      "card_header_container"
    );
    card_header_container.innerHTML = `
        <div class="card-header">
        <i class="fas fa-table me-1"></i>
        강의 목록`;
  }
}

function display_main_container(user_class) {
  if (user_class == 1) {
    const main_container = document.getElementById("timetable-container");
    const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

    axios
      .get("/user/professor/lecture", {
        params: {
          year: 2023,
          semester: 1,
        },
      })
      .then(function (response) {
        var lectures = response.data;

        table = document.createElement("table");
        table.className = "table table-hover";
        table.id = "table";

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");

        headerRow.innerHTML = `
        <th style="width: 15%">공지 게시판</th>
        <th style="width: 15%">과제 게시판</th>
        <th style="width: 15%">학정 코드</th>
        <th style="width: 15%">강의명</th>
        <th style="width: 15%">강의 분류</th>
        <th style="width: 15%">강의 시간</th>
        <th style="width: 15%">학기</th>
        `;
        thead.appendChild(headerRow);
        table.appendChild(thead);

        lectures.forEach(function (lecture) {
          var row = table.insertRow();

          var notice_link =
            "../boards/pro_announcement.html?lec_code=" +
            lecture.lecture_code +
            "&year=2023" +
            "&semester=1" +
            "&lec_name=" +
            lecture.lecture_name;

          var noticeCell = row.insertCell();
          noticeCell.innerHTML = `<a href="${notice_link}">공지 게시판</a>`;

          var lec_link =
            "../boards/pro_task_board.html?lec_code=" +
            lecture.lecture_code +
            "&year=2023" +
            "&semester=1" +
            "&lec_name=" +
            lecture.lecture_name;

          var lec_cell = row.insertCell();
          lec_cell.innerHTML = `<a href="${lec_link}}">과제 게시판</a>`;

          var codeCell = row.insertCell();
          codeCell.innerHTML = lecture.lecture_code;

          var nameCell = row.insertCell();
          nameCell.innerHTML = lecture.lecture_name;

          var classCell = row.insertCell();
          classCell.innerHTML = lecture.lecture_class;

          var timeCell = row.insertCell();
          var lectureTime = "";

          if (lecture.lecture_week1 && lecture.lecture_time1) {
            lectureTime +=
              weekdays[lecture.lecture_week1 - 1] + lecture.lecture_time1;
          }

          if (lecture.lecture_week2 && lecture.lecture_time2) {
            lectureTime +=
              " / " +
              weekdays[lecture.lecture_week2 - 1] +
              lecture.lecture_time2;
          }

          if (lectureTime === "") {
            lectureTime = "일정 미정";
          }

          timeCell.innerHTML = lectureTime;

          var semesterCell = row.insertCell();
          var semester = lecture.year + "년 " + lecture.semester + "학기";
          semesterCell.innerHTML = semester;
        });
        main_container.appendChild(table);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

function get_lec_link(year, semester, lecture_code) {
  console.log(year, semester, lecture_code);
  axios
    .get("/boards/boardList", {
      params: {
        year: year,
        semester: semester,
        board_name: "과제게시판",
        lecture_code: lecture_code,
      },
    })
    .then(function (response) {
      data = response.data.list;
      board_list = [];
      post_codes = [];
      i = 1;
      data.forEach(function (item) {
        var boardData = [
          i,
          item.title,
          "",
          item.post_date.substr(0, 10),
          item.view_count,
        ];
        post_codes.push(item.post_code);
        board_list.push(boardData);
        i++;
      });
      if (board_list.length == 0) {
        alert("해당 과목의 과제가 없습니다.");
        basic_table();
      } else {
        lec_table(board_list, post_codes);
      }
    })
    .catch(function (error) {});
}

function user_proffesor() {
  axios
    .get("/user/adviser", {
      params: {},
    })
    .then(function (response) {
      let data = response.data;
      data = data[0];
      var lectureData = [
        data.department_name,
        data.name,
        data.spot,
        data.lab,
        data.major,
        data.phone_num,
        data.email,
        data.profile,
      ];
      show_user_proffesor(lectureData);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function show_user_proffesor(lectureData) {
  console.log(lectureData);
  var table = document.createElement("table");
  table.className = "table table-hover";

  // Create the table header
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");

  headerRow.innerHTML = `
    <th style="width: 15%">학과</th>
    <th style="width: 7%">이름</th>
    <th style="width: 7%">직위</th>
    <th style="width: 15%">연구실</th>
    <th style="width: 15%">전공분야</th>
    <th style="width: 10%">연락처</th>
    <th style="width: 15%">이메일</th>
    <th style="width: 15%">홈페이지</th>
                        `;

  thead.appendChild(headerRow);
  table.appendChild(thead);

  var tbody = document.createElement("tbody");

  var rowElement = document.createElement("tr");

  for (var i = 0; i < lectureData.length; i++) {
    var cell = document.createElement("td");
    var cellData = lectureData[i];

    if (i === lectureData.length - 1) {
      // Create a link for the last column
      var link = document.createElement("a");
      link.href = cellData;
      link.textContent = shortenURL(cellData);
      cell.appendChild(link);
    } else {
      cell.appendChild(document.createTextNode(cellData));
    }

    // Style the first column as "No."
    if (i === 0) {
      cell.style.width = "5%";
    }

    rowElement.appendChild(cell);
    tbody.appendChild(rowElement);
  }

  table.appendChild(tbody);

  // Add the table to the document body or a specific container
  var professor_container = document.getElementById("professor_container");
  professor_container.innerHTML = ""; // 기존 내용을 초기화
  professor_container.appendChild(table);
}

function shortenURL(url) {
  var maxLength = 20; // Maximum length of the shortened URL text

  if (url.length <= maxLength) {
    return url; // Return the original URL if it's already within the limit
  } else {
    var shortenedText = url.slice(0, maxLength - 3) + "..."; // Append "..." to indicate it's shortened
    return shortenedText;
  }
}
