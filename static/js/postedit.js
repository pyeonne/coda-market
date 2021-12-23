function changeSoldOut(value) {
  document.querySelector(".sold_btn").value = value

  if ( value === "false") {
    document.querySelector(".sold_btn").style.color = "green"
  } else {
    document.querySelector(".sold_btn").style.color = "red"
    
  }
}

function changeCategory(value) {
  document.querySelector(".category_btn").value = value

}

function selec_change() {
  let data = document.querySelector(".sold_btn").value
  if (data === "false") {
    document.querySelector(".sold_btn").style.color = "green"
  } else {
    document.querySelector(".sold_btn").style.color = "red"
  }
}