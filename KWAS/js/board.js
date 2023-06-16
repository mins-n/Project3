
showPost();
function showPost() {
var data = [{"board_code":3,"post_code":15,"post_date":"2023-06-15T15:00:00.000Z","user_id":"prof1414","title":"임시 제목","post_contents":"임시 제목","view_count":42,"file":null}];
var postContainer = document.getElementById("post");
postContainer.innerHTML = "";

for (var i = 0; i < data.length; i++) {
var title = data[i].title;
var author = data[i].user_id;
var date = formatDate(data[i].post_date);
var time = formatTime(data[i].post_date);
var content = data[i].post_contents;
var viewCount = data[i].view_count;

var post = `
<div class="card">
  <div class="card-body">
      <h2 class="card-title">${title}</h2>
      <div class="card-text">
          <div class="post-info">
              <p class="author-date">     
                <span class="author">${author}</span>                           
                <span class="date">${date}</span>
                <span class="time">${time}</span>
              </p>
              <p class="view-count author-date">조회수: ${viewCount}</p>
          </div>
          <div class="content-container">
              <p class="card-text">${content}</p>
          </div>
      </div>
  </div>
</div>
`;
postContainer.innerHTML += post;
}
}

function addComment() {
    var comment = document.getElementById("comment").value;
    var commentsContainer = document.getElementById("comments");

    var newComment = "<div class='card'>" +
                     "<div class='card-body'>" +
                     "<p class='card-text'>" + comment + "</p>" +
                     "</div>" +
                     "</div>";
    commentsContainer.innerHTML += newComment;

    // Clear the input field after adding a comment
    document.getElementById("comment").value = "";
}

function formatDate(dateStr) {
    var date = new Date(dateStr);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");

    return year + "-" + month + "-" + day;
}

function formatTime(dateStr) {
    var date = new Date(dateStr);
    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");
    var seconds = date.getSeconds().toString().padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds;
}