function openWritePopup() {
    document.getElementById("writePopup").style.display =
      "block";
  }

function closeWritePopup() {
    var writePopup = document.getElementById('writePopup');
    writePopup.style.display = 'none';
}
  
window.addEventListener('DOMContentLoaded', function() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var year = urlParams.get('year');
    var semester = urlParams.get('semester');
    var lec_name = urlParams.get('lec_name');
    var lec_code = urlParams.get('lec_code');

    var ratingWriteTable = document.getElementById('rating_write_table');

    // 게시글 작성 폼 생성
    var form = document.createElement('form');
    form.classList.add('p-4', 'bg-light');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // 작성된 게시글 내용을 처리하는 함수 호출
      handlePostFormSubmit();
    });

    // 제목 입력 필드
    var titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = '제목';
    titleInput.classList.add('form-control', 'mb-3');
    form.appendChild(titleInput);

    // 내용 입력 필드
    var contentTextarea = document.createElement('textarea');
    contentTextarea.placeholder = '내용';
    contentTextarea.classList.add('form-control', 'mb-3');
    form.appendChild(contentTextarea);

    // 파일 입력 필드
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.classList.add('form-control', 'mb-3');
    form.appendChild(fileInput);

    // 작성 버튼
    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = '작성';
    submitButton.classList.add('btn', 'btn-primary');
    form.appendChild(submitButton);

    ratingWriteTable.appendChild(form);

    function handlePostFormSubmit() {
      var title = titleInput.value;
      var content = contentTextarea.value;
      var file = fileInput.files[0];
      

      console.log('제목:', title);
      console.log('내용:', content);
      console.log('파일:', file);
    
      axios.post('/post/write', {
        board_code : lec_code,
        title: title,
        post_contents: content,
        file: file,
      }).then(function(response) {
        console.log(response);
        }).catch(function(error) {
        console.log(error);
        });
        

      // 게시글 작성 후 팝업 닫기
      closeWritePopup();
    }
  });
  