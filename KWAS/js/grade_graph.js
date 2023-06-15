axios
  .get("/course_management/list", {
    params: {},
  })
  .then(function (response) {
    let data = response.data;
    var processedData = [];
    data.forEach(function (item) {
      var lectureData = [
        item.lecture_code,
        item.lecture_name,
        item.credit.toString(),
        item.professor_name,
        getDate(item.lecture_week1) +
          " " +
          item.lecture_time1 +
          ", " +
          getDate(item.lecture_week2) +
          " " +
          item.lecture_time2,
      ];
      processedData.push(lectureData);
    });
    console.log(processedData);
    user_enrolment_table(processedData);
  })
  .catch(function (error) {
    console.log(error);
  });
