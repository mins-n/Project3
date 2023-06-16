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
  
      postInfo.appendChild(authorDate);
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