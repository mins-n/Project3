function register() {
    var form = document.querySelector('form');
    var formData = new FormData(form);

    axios.get('/login_form/forget_id', {
        params:{
      name: formData.get('name'),
      telephone: formData.get('telephone')
        }
    })
      .then(function(response) {
        if (response.status === 200) {
          alert("아이디는 "+response.data.user_id+" 입니다");
          window.location.href = "login.html";
        } else if (response.status === 400) {
          alert("해당하는 회원정보가 없습니다.");
          window.location.href = "forget_id.html";
        } else {
          alert("오류가 발생했습니다.");
        }
      })
      .catch(function(error) {
        if (error.response.status === 400) {
            alert("해당하는 회원정보가 없습니다.");
            window.location.href = "forget_id.html";
          } else {
            console.log("오류:", error);
          }
      });
  }