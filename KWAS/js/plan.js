axios.get("/course_management/plan?lecture_code=" + lectureCode)
      .then(function (response) {
        var data = response.data;
        var lectureInfo = data.lectureInfo[0];
        var planList = data.planList;

        // Display lecture information
        var lectureInfoElement = document.getElementById("lectureInfo");
        lectureInfoElement.innerHTML = "<p><strong>Lecture Code:</strong> " + lectureInfo.lecture_code + "</p>" +
          "<p><strong>Lecture Name:</strong> " + lectureInfo.lecture_name + "</p>" +
          "<p><strong>Lecture Class:</strong> " + lectureInfo.lecture_class + "</p>" +
          "<p><strong>Lecture Info:</strong> " + lectureInfo.lecture_info + "</p>";

        // Display weekly plan
        var planTableBody = document.querySelector("#planTable tbody");
        planList.forEach(function (plan) {
          var row = document.createElement("tr");
          row.innerHTML = "<td>" + plan.week + "</td><td>" + plan.plan + "</td>";
          planTableBody.appendChild(row);
        });
      })
      .catch(function (error) {
        console.log(error);
      });