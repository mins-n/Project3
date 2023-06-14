let user_id = "2018202091";
let year = "2023";
let semester = "1";

axios
  .get("/course_management/syllabus_inquiry", {
    params: {
      user_id: user_id,
    },
  })
  .then(function (response) {
    let data = response.data;
    var processedData = [];

    data.forEach(function (item) {
      index = 1;
      var lectureData = [
        item.lecture_name,
        item.lecture_week1,
        item.lecture_week2,
        item.lecture_time1,
        item.lecture_time2,
      ];
      processedData.push(lectureData);
    });
    console.log(processedData);
    Timetable(processedData);
  })
  .catch(function (error) {
    console.log(error);
  });

function Timetable(timetableDataList) {
  // 시간표 데이터 초기화
  const timetable = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  // 강의 데이터를 시간표에 추가
  for (let i = 0; i < timetableDataList.length; i++) {
    timetable[timetableDataList[i][3] - 1][timetableDataList[i][1] - 1] =
      timetableDataList[i][0];
    timetable[timetableDataList[i][4] - 1][timetableDataList[i][2] - 1] =
      timetableDataList[i][0];
  }

  // 시간표 HTML 생성
  const table = document.createElement("table");
  table.classList.add("table", "table-hover");

  const thead = document.createElement("thead");
  const theadRow = document.createElement("tr");
  const weekdays = ["월", "화", "수", "목", "금"];

  // 요일 헤더 추가
  const emptyHeader = document.createElement("th");
  emptyHeader.style.width = "10%";
  theadRow.appendChild(emptyHeader);

  for (let i = 0; i < weekdays.length; i++) {
    const weekdayHeader = document.createElement("th");
    weekdayHeader.style.width = "15%";
    weekdayHeader.textContent = weekdays[i];
    theadRow.appendChild(weekdayHeader);
  }

  thead.appendChild(theadRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.id = "timetable";

  // 시간표 내용 추가
  for (let i = 0; i < timetable.length; i++) {
    const row = document.createElement("tr");
    const timeSlotHeader = document.createElement("th");
    timeSlotHeader.scope = "row";
    timeSlotHeader.textContent = i + 1 + "교시";
    row.appendChild(timeSlotHeader);

    for (let j = 0; j < timetable[i].length; j++) {
      const cell = document.createElement("td");
      cell.textContent = timetable[i][j];
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // 시간표 HTML 추가
  const timetableContainer = document.getElementById("timetable-container");
  timetableContainer.appendChild(table);
}

const timetableDataList = [
  {
    lecture_name: "소프트웨어공학",
    lecture_week1: "1",
    lecture_week2: "3",
    lecture_time1: "5",
    lecture_time2: "6",
  },
  {
    lecture_name: "데이터베이스",
    lecture_week1: "2",
    lecture_week2: "4",
    lecture_time1: "1",
    lecture_time2: "2",
  },
];

tabl_list = [
  ["소프트웨어공학", 1, 2, 4, 5],
  ["데이터베이스", 2, 4, 1, 2],
];
// Timetable(timetableDataList);
