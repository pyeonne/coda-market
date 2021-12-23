var check1 = ""
const signupBtn = document.querySelector('.signup_btn').firstElementChild;
let checkId = false;
let checkRegexPassword = false;
let checkPassword = false;
let checkEmail = false;

async function signup_check(value, check) {
  const url = '/signup';
  if (check === 'id') {
    const availableId = document.querySelector('.availableId');
    const existedId = document.querySelector('.existedId');
    await fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: value,
      })
    }).then(res => res.json())
      .then(data => {
        checkId = false;
        console.log(data);
        if (value.length === 0) {
          existedId.classList.remove('on');
          availableId.classList.remove('on');
        }
        else if (data.existedUserId) {
          existedId.classList.add('on');
          availableId.classList.remove('on');
        } else {
          existedId.classList.remove('on');
          availableId.classList.add('on');
          checkId = true;
        }
    });
  }

  if (check == 'email'){
    const availableEmail = document.querySelector('.availableEmail');
    const existedEmail = document.querySelector('.existedEmail');
    const unavailableEmail = document.querySelector('.unavailableEmail');
    // const inputId = document.querySelector('#user_id').value;
    await fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id: inputId,
        email: value,
      })
    }).then(res => res.json())
      .then(data => {
        checkEmail = false;
        console.log(data);
        var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (value.length === 0) {
          existedEmail.classList.remove('on');
          availableEmail.classList.remove('on');
          unavailableEmail.classList.remove('on');
        } else if (!emailReg.test(value)) {
          existedEmail.classList.remove('on');
          availableEmail.classList.remove('on');
          unavailableEmail.classList.add('on');
        }
        else if (data.existedUserEmail) {
          existedEmail.classList.add('on');
          availableEmail.classList.remove('on');
          unavailableEmail.classList.remove('on');
        } else {
          existedEmail.classList.remove('on');
          availableEmail.classList.add('on');
          unavailableEmail.classList.remove('on');
          checkEmail = true;
        }
    });
  }
  btn_disabled();
}

function pw1_check(pwd) {
  const unavailablePassword = document.querySelector('.unavailablePassword');
  check1 = pwd
  const regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  if (pwd > 0 && pwd.search(regex) == -1){
    unavailablePassword.classList.add('on');
    checkRegexPassword = false;
  } else {
    unavailablePassword.classList.remove('on');
    checkRegexPassword = true;
  }
}


function pw2_check(pwd) {
  const data1 = document.querySelector(".pw2Check")
  const data2 = document.querySelector(".pw2CheckNo")
  
  if (pwd === check1) {
    data2.style.display = "none"
    data1.style.display = "inline"
    data1.style.right = "250px"
    checkPassword = true;
  } else {
    data1.style.display = "none"
    data2.style.display = "inline"
    data2.style.right = "250px"
    checkPassword = false;
  }
  btn_disabled();
}

function btn_disabled() {
  if (checkId && checkEmail && checkPassword && checkRegexPassword) {
    signupBtn.disabled = false;
  }
  console.log(checkId, checkEmail, checkPassword, checkRegexPassword);
}