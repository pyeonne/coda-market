var check1 = '';
const signupBtn = document.querySelector('.signup_btn').firstElementChild;
let checkId = false;
let checkRegexPassword = false;
let checkPassword = false;
let checkEmail = false;
let idData = '';
let emailData = '';

async function signup_check(value, check) {
  const url = '/signup';
  if (check === 'id') {
    await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: value,
      }),
    })
      .then(res => res.json())
      .then(data => {
        idData = data;
        idCheck(value);
      });
  }

  if (check == 'email') {
    await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: value,
      }),
    })
      .then(res => res.json())
      .then(data => {
        emailData = data;
        emailCheck(value);
      });
  }
}

function idCheck(id) {
  const availableId = document.querySelector('.availableId');
  const existedId = document.querySelector('.existedId');
  const blankId = document.querySelector('.blankId');
  checkId = false;
  if (id.length === 0) {
    existedId.classList.remove('on');
    availableId.classList.remove('on');
    blankId.classList.add('on');
  } else if (idData.existedUserId) {
    existedId.classList.add('on');
    availableId.classList.remove('on');
    blankId.classList.remove('on');
  } else {
    existedId.classList.remove('on');
    availableId.classList.add('on');
    blankId.classList.remove('on');
    checkId = true;
  }
}

function emailCheck(email) {
  const availableEmail = document.querySelector('.availableEmail');
  const existedEmail = document.querySelector('.existedEmail');
  const unavailableEmail = document.querySelector('.unavailableEmail');
  const blankEmail = document.querySelector('.blankEmail');
  checkEmail = false;
  var emailReg = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  );

  if (email.length === 0) {
    existedEmail.classList.remove('on');
    availableEmail.classList.remove('on');
    unavailableEmail.classList.remove('on');
    blankEmail.classList.add('on');
  } else if (!emailReg.test(email)) {
    existedEmail.classList.remove('on');
    availableEmail.classList.remove('on');
    unavailableEmail.classList.add('on');
    blankEmail.classList.remove('on');
  } else if (emailData.existedUserEmail) {
    existedEmail.classList.add('on');
    availableEmail.classList.remove('on');
    unavailableEmail.classList.remove('on');
    blankEmail.classList.remove('on');
  } else {
    existedEmail.classList.remove('on');
    availableEmail.classList.add('on');
    unavailableEmail.classList.remove('on');
    blankEmail.classList.remove('on');
    checkEmail = true;
  }
}

function pw1_check(pwd) {
  const unavailablePassword = document.querySelector('.unavailablePassword');
  check1 = pwd;
  const pwdReg = new RegExp(
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
  );
  if (!pwdReg.test(pwd)) {
    unavailablePassword.classList.add('on');
    checkRegexPassword = false;
  } else {
    unavailablePassword.classList.remove('on');
    checkRegexPassword = true;
  }
}

function pw2_check(pwd) {
  const data1 = document.querySelector('.pw2Check');
  const data2 = document.querySelector('.pw2CheckNo');

  if (pwd === check1) {
    data2.style.display = 'none';
    data1.style.display = 'inline';
    data1.style.right = '250px';
    checkPassword = true;
  } else {
    data1.style.display = 'none';
    data2.style.display = 'inline';
    data2.style.right = '250px';
    checkPassword = false;
  }
}

function locationCheck() {
  const location_box = document.querySelector('.location_box');
  const blankLocation = document.querySelector('.blankLocation');

  if (location_box.value === '1') {
    blankLocation.classList.add('on');
    return true;
  } else {
    blankLocation.classList.remove('on');
  }
  return false;
}

function nicknameCheck() {
  const nickname = document.querySelector('#nickname').value;
  const blankNickname = document.querySelector('.blankNickname');

  if (nickname.length === 0) {
    blankNickname.classList.add('on');
    return true;
  } else {
    blankNickname.classList.remove('on');
  }
  return false;
}

function check_signup(e) {
  let checkPrevent = false;

  locationCheck();
  nicknameCheck();

  if (!checkId || !checkEmail || !checkPassword || !checkRegexPassword) {
    checkPrevent = true;
    if (!checkId) {
      const id = document.querySelector('#user_id').value;
      idCheck(id);
    }
    if (!checkEmail) {
      const email = document.querySelector('#email').value;
      emailCheck(email);
    }
    if (!checkPassword) {
      const password = document.querySelector('#password').value;
      pw1_check(password);
    }
  }

  if (checkPrevent) {
    e.preventDefault();
  }
}
