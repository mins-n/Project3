axios
    .get("/user/get", {
    params: {},
    })
    .then(function (response) {
    let data = response.data;
    console.log(data);
    user_class = data[0].user_class;
    display_adviser(user_class)
    display_year_semester_container(user_class)
    display_card_header_container(user_class)
    display_main_container(user_class)
    })
    .catch(function (error) {
    console.log(error);
    });
function display_adviser(user_class){
    console.log(user_class);
    if (user_class== 2) {
    user_adviser_row = document.getElementById("user_adviser_row");
    user_adviser_row.innerHTML = ""
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
function display_year_semester_container(user_class){
    if (user_class == 2){
        const year_semester_container = document.getElementById("year_semester_container");
        year_semester_container.innerHTML = `
        <select class="form-select" aria-label="Default select example" id="user_year_semester">
        </select>
            `
    }
}

function display_card_header_container(user_class){
    if (user_class == 2){
        const card_header_container = document.getElementById("card_header_container");
        card_header_container.innerHTML = `
        <div class="card-header">
        <i class="fas fa-table me-1"></i>
        시간표`
    }else if (user_class == 1){
        const card_header_container = document.getElementById("card_header_container");
        card_header_container.innerHTML = `
        <div class="card-header">
        <i class="fas fa-table me-1"></i>
        강의 목록`
    }
}

function display_main_container(user_class){
    if (user_class == 1){
        const main_container = document.getElementById("timetable-container");
        const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

        axios
        .get("/user/professor/lecture")
        .then(function (response) {
        var lectures = response.data;

        table = document.createElement("table");
        table.className = "table table-hover";
        table.id = "table";

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");

        headerRow.innerHTML = `
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

            var codeCell = row.insertCell();
            var codeLink = document.createElement("a");
            codeLink.href =
                "/course_management/listening_student.html?lecture_code=" +
                lecture.lecture_code;
            codeLink.textContent = lecture.lecture_code;
            codeCell.appendChild(codeLink);

            var nameCell = row.insertCell();
            nameCell.innerHTML = lecture.lecture_name;

            var classCell = row.insertCell();
            classCell.innerHTML = lecture.lecture_class;

            var timeCell = row.insertCell();
            var lectureTime = "";

            if (lecture.lecture_week1 && lecture.lecture_time1) {
                lectureTime += weekdays[lecture.lecture_week1 - 1] + lecture.lecture_time1;
            }

            if (lecture.lecture_week2 && lecture.lecture_time2) {
                lectureTime +=
                " / " + weekdays[lecture.lecture_week2 - 1] + lecture.lecture_time2;
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