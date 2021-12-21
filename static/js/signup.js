function id_check(n) {
  let data1 = document.querySelector(".idCheck")
  let data2 = document.querySelector(".idCheckNo")

  var idRegExp = /^[a-z0-9]{1,12}$/;

  if (idRegExp.test(n)) {
    data2.style.display = "none"
    data1.style.display = "inline"
    data1.style.right = "250px"

  } else {
    data1.style.display = "none"
    data2.style.display = "inline"
    data2.style.right = "250px"

  }
}

function pw1_check(n) {
  let data1 = document.querySelector(".pw1Check")
  let data2 = document.querySelector(".pw1CheckNo")

  var idRegExp = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{6,24}$/

  if (idRegExp.test(n)) {
    data2.style.display = "none"
    data1.style.display = "inline"
    data1.style.right = "250px"

  } else {
    data1.style.display = "none"
    data2.style.display = "inline"
    data2.style.right = "250px"

  }
}

function pw2_check(n) {
  let data1 = document.querySelector(".pw2Check")
  let data2 = document.querySelector(".pw2CheckNo")

  var idRegExp = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{6,16}$/


  if (idRegExp.test(n)) {
    data2.style.display = "none"
    data1.style.display = "inline"
    data1.style.right = "250px"

  } else {
    data1.style.display = "none"
    data2.style.display = "inline"
    data2.style.right = "250px"

  }
}