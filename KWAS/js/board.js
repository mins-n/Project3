var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var postValue = urlParams.get('post_value');
console.log(postValue);
url = "/boards/post/" + postValue;
axios
  .get(url, {})
  .then(function (response) {
    let post_data = response.data.post;
    let comment_data = response.data.comment;
    showPost(post_data);
    
  })
  .catch(function (error) {
    console.log(error);
  });

function showPost(data) {
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

function addComment(data) {
    data =[{"post_code":2,"comment_code":1,"comment_date":"2023-06-14T15:00:00.000Z","user_id":"2018202091","comment_contents":"넵"},{"post_code":2,"comment_code":2,"comment_date":"2023-06-05T15:00:00.000Z","user_id":"shine8917","comment_contents":"항상 감사합니다"},{"post_code":2,"comment_code":3,"comment_date":"2023-06-05T15:00:00.000Z","user_id":"akashine","comment_contents":"F는 좀;;;"},{"post_code":2,"comment_code":4,"comment_date":"2023-06-06T15:00:00.000Z","user_id":"shine8917","comment_contents":"아 ㅋㅋ"}]
    var commentsContainer = document.getElementById("comments_container");
    commentsContainer.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var author = data[i].user_id;
        var date = formatDate(data[i].comment_date);
        var time = formatTime(data[i].comment_date);
        var content = data[i].comment_contents;

        var comment = `
        <div class="comment">
            <div class="comment-info">
                <p class="author-date">
                    <span class="author">${author}</span>
                    <span class="date">${date}</span>
                    <span class="time">${time}</span>
                </p>
            </div>
            <div class="comment-content">
                <p>${content}</p>
            </div>
        </div>
        `;
        commentsContainer.innerHTML += comment;
    }
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