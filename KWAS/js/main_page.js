axios
    .get("/user/get", {
    params: {},
    })
    .then(function (response) {
    let data = response.data;
    console.log(data);
    user_class = data[0].user_class;
    display_adviser(user_class)
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