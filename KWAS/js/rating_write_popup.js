axios
  .get("/course_management/user_evaluation", {})
  .then(function (response) {
    let data = response.data;
    var processedData = [];

    data.forEach(function (item) {
      var lectureData = [
        item.professor_name,
        item.lecture_name,
        item.lecture_code,
      ];
      processedData.push(lectureData);
    });
    console.log(processedData);
    rating_write_table_popup(processedData);
  })
  .catch(function (error) {
    rating_write_table_popup();
    console.log(error);
  });

function rating_write_table_popup(lectureData) {
  var user_lecture = document.getElementById("rating_write_table");

  const lectureSelect = document.createElement("select");
  lectureSelect.setAttribute("class", "form-select");
  lectureSelect.setAttribute("aria-label", "Default select example");
  lectureSelect.setAttribute("id", "user_lecture");
  lectureSelect.style.width = "100%";
  for (let i = 0; i < lectureData.length; i++) {
    const professor = lectureData[i][0];
    const lecture = lectureData[i][1];
    const lecture_code = lectureData[i][2];

    const lectureOption = document.createElement("option");
    lectureOption.setAttribute("value", lecture_code);
    lectureOption.textContent = `${professor} - ${lecture}`;

    lectureSelect.appendChild(lectureOption);
  }

  const ratingSelect = document.createElement("select");
  ratingSelect.setAttribute("class", "form-select");
  ratingSelect.setAttribute("aria-label", "Default select example");
  ratingSelect.setAttribute("id", "rating");
  ratingSelect.style.width = "70%";
  for (let i = 1; i <= 10; i++) {
    const ratingOption = document.createElement("option");
    ratingOption.setAttribute("value", i);
    ratingOption.textContent = i;
    if (i === 10) {
      ratingOption.setAttribute("selected", "selected");
    }
    ratingSelect.appendChild(ratingOption);
  }

  const table = document.createElement("table");
  table.className = "table table-hover my-3";
  table.style.tableLayout = "fixed";
  table.style.borderSpacing = "10px"; // Adjust the spacing value as needed

  const tableRow = document.createElement("tr");

  const lectureLabelCell = document.createElement("td");
  lectureLabelCell.textContent = "강의명";
  const lectureDataCell = document.createElement("td");
  lectureDataCell.style.width = "32%";
  lectureDataCell.appendChild(lectureSelect);

  const ratingLabelCell = document.createElement("td");
  ratingLabelCell.textContent = "평점";
  const ratingDataCell = document.createElement("td");
  ratingDataCell.appendChild(ratingSelect);

  tableRow.appendChild(lectureLabelCell);
  tableRow.appendChild(lectureDataCell);
  tableRow.appendChild(ratingLabelCell);
  tableRow.appendChild(ratingDataCell);

  const tableRow2 = document.createElement("tr");
  const commentLabelCell = document.createElement("td");
  commentLabelCell.textContent = "한줄평";
  const commentCell = document.createElement("td");
  commentCell.colSpan = "3";
  const commentDiv = document.createElement("div");
  commentDiv.setAttribute("class", "input-group mb-3");
  commentDiv.style.marginBottom = "10px"; // 간격 조정을 위한 스타일 추가
  commentDiv.style.width = "90%";

  const commentInput = document.createElement("input");
  commentInput.setAttribute("type", "text");
  commentInput.setAttribute("class", "form-control");
  commentInput.setAttribute("placeholder", "한줄평");
  commentInput.setAttribute("aria-label", "한줄평");
  commentInput.setAttribute("aria-describedby", "basic-addon1");
  commentInput.setAttribute("id", "comment");
  commentInput.style.width = "100%";
  commentDiv.appendChild(commentInput);
  commentCell.appendChild(commentDiv);
  tableRow2.appendChild(commentLabelCell);
  tableRow2.appendChild(commentCell);

  table.appendChild(tableRow);
  table.appendChild(tableRow2);

  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute(
    "class",
    "d-grid gap-2 d-md-flex justify-content-md-end align-items-start my-3"
  );
  const modifyButton = document.createElement("button");
  modifyButton.setAttribute("type", "button");
  modifyButton.setAttribute("class", "btn btn-primary");
  modifyButton.style.backgroundColor = "#0d6efd";
  modifyButton.textContent = "작성";
  modifyButton.addEventListener("click", post_rating); // 작성 버튼 클릭 이벤트에 post_rating 함수 연결
  buttonDiv.appendChild(modifyButton);

  const buttonRow = document.createElement("tr");
  const buttonCell = document.createElement("td");
  buttonCell.colSpan = "4";
  buttonCell.appendChild(buttonDiv);
  buttonRow.appendChild(buttonCell);

  table.appendChild(buttonRow);

  user_lecture.appendChild(table);
}

function post_rating() {
  const lecture_code = document.getElementById("user_lecture").value;
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;

  axios
    .post("/course_management/evaluation", {
      lecture_code: lecture_code,
      evaluation: comment,
      evaluation_score: rating,
    })
    .then(function (response) {
      alert("평가가 완료되었습니다.");
      window.close();
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
      window.close();
      window.location.reload();
    });
}
