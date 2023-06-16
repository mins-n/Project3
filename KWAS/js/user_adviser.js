function user_proffesor(){
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
      user_proffesor(lectureData);
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
