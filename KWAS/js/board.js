var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var postValue = urlParams.get("post_value");
console.log(postValue);
url = "/boards/post/" + postValue;
axios
  .get(url, {})
  .then(function (response) {
    let post_data = response.data.post;
    let comment_data = response.data.comment;
    showPost(post_data);
    addComment(comment_data);
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
    var file_url = data[i].file;
    var file_name = "";

    if (file_url != null) {
      file_name = file_url.split("/").pop();
    }

    var post = document.createElement("div");
    post.className = "post";
    post.style.border = "1px solid #ccc";
    post.style.padding = "10px";
    post.style.marginBottom = "20px";

    var postTitle = document.createElement("h2");
    postTitle.className = "post-title";
    postTitle.textContent = title;

    var postInfo = document.createElement("div");
    postInfo.className = "post-info";

    var authorDate = document.createElement("p");
    authorDate.className = "author-date";

    var authorSpan = document.createElement("span");
    authorSpan.className = "author";
    authorSpan.innerHTML = "<i class='fas fa-user'></i> " + author;

    var dateSpan = document.createElement("span");
    dateSpan.className = "date";
    dateSpan.innerHTML = "<i class='fas fa-calendar-alt'></i> " + date;

    var timeSpan = document.createElement("span");
    timeSpan.className = "time";
    timeSpan.innerHTML = "<i class='fas fa-clock'></i> " + time;

    authorDate.appendChild(authorSpan);
    authorDate.appendChild(dateSpan);
    authorDate.appendChild(timeSpan);

    var viewCountInfo = document.createElement("p");
    viewCountInfo.className = "view-count author-date";
    viewCountInfo.innerHTML = "<i class='fas fa-eye'></i> 조회수: " + viewCount;

    var contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    var postContent = document.createElement("p");
    postContent.className = "card-text";
    postContent.textContent = content;

    contentContainer.appendChild(postContent);

    if (file_url != null) {
      var fileContainer = document.createElement("div");
      fileContainer.className = "file-container";
      fileContainer.className = "author-date";
      var fileIcon = document.createElement("i");
      fileIcon.className = "fas fa-file-download";

      var fileLink = document.createElement("a");
      fileLink.className = "file-link";
      fileLink.href = file_url;
      fileLink.download = file_name;
      fileLink.textContent = file_name;

      fileContainer.appendChild(fileIcon);
      fileContainer.appendChild(fileLink);
    }

    postInfo.appendChild(authorDate);
    if (file_url != null) {
      postInfo.appendChild(fileContainer);
    }
    postInfo.appendChild(viewCountInfo);

    post.appendChild(postTitle);
    post.appendChild(postInfo);
    post.appendChild(contentContainer);

    postContainer.appendChild(post);
  }
}

function addComment(data) {
  var commentsContainer = document.getElementById("comments_container");
  commentsContainer.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    var author = data[i].user_id;
    var date = formatDate(data[i].comment_date);
    var time = formatTime(data[i].comment_date);
    var content = data[i].comment_contents;

    var commentContainer = document.createElement("div");
    commentContainer.className = "comment";
    commentContainer.style.border = "1px solid #ccc";
    commentContainer.style.padding = "10px";
    commentContainer.style.marginBottom = "10px";

    var commentInfo = document.createElement("div");
    commentInfo.className = "comment-info";

    var authorDate = document.createElement("p");
    authorDate.className = "author-date";

    var authorSpan = document.createElement("span");
    authorSpan.className = "author";
    authorSpan.innerHTML = "<i class='fas fa-user'></i> " + author;

    var dateSpan = document.createElement("span");
    dateSpan.className = "date";
    dateSpan.innerHTML = "<i class='fas fa-calendar-alt'></i> " + date;

    var timeSpan = document.createElement("span");
    timeSpan.className = "time";
    timeSpan.innerHTML = "<i class='fas fa-clock'></i> " + time;

    authorDate.appendChild(authorSpan);
    authorDate.appendChild(dateSpan);
    authorDate.appendChild(timeSpan);

    var commentContent = document.createElement("div");
    commentContent.className = "comment-content";

    var commentText = document.createElement("p");
    commentText.textContent = content;

    commentContent.appendChild(commentText);

    commentInfo.appendChild(authorDate);
    commentContainer.appendChild(commentInfo);
    commentContainer.appendChild(commentContent);

    commentsContainer.appendChild(commentContainer);
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

function openWritePopup() {
  document.getElementById("writePopup").style.display = "block";
}

function closeWritePopup() {
  var writePopup = document.getElementById("writePopup");
  writePopup.style.display = "none";
}

window.addEventListener("DOMContentLoaded", function () {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var post_value = urlParams.get("post_value");

  var ratingWriteTable = document.getElementById("rating_write_table");

  // 게시글 작성 폼 생성
  var form = document.createElement("form");
  form.classList.add("p-4", "bg-light");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // 작성된 게시글 내용을 처리하는 함수 호출
    handlePostFormSubmit();
  });

  // 제목 입력 필드
  var titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "제목";
  titleInput.classList.add("form-control", "mb-3");
  form.appendChild(titleInput);

  // 내용 입력 필드
  var contentTextarea = document.createElement("textarea");
  contentTextarea.placeholder = "내용";
  contentTextarea.classList.add("form-control", "mb-3");
  form.appendChild(contentTextarea);

  // 파일 입력 필드
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.classList.add("form-control", "mb-3");
  form.appendChild(fileInput);

  // 작성 버튼
  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "작성";
  submitButton.classList.add("btn", "btn-primary");
  form.appendChild(submitButton);

  ratingWriteTable.appendChild(form);

  function handlePostFormSubmit() {
    var title = titleInput.value;
    var content = contentTextarea.value;
    var file = fileInput.files[0];

    console.log("제목:", title);
    console.log("내용:", content);
    console.log("파일:", file);

    axios
      .post("/boards/post/update", {
        post_code: post_value,
        title: title,
        post_contents: content,
        file: file,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // 게시글 작성 후 팝업안에 값 초기화
    titleInput.value = "";
    contentTextarea.value = "";
    fileInput.value = "";

    closeWritePopup();

    // 재시작
    window.location.reload();
  }
});
