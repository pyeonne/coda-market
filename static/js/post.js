function file_btn() {
  let data = document.querySelector('.file_input').click();
}

/* 세자리 마다 숫자 찍기 펑션 */
function getNumber(obj) {
  var num01;
  var num02;
  num01 = obj.value;
  num02 = num01.replace(/\D/g, '');

  num01 = setComma(num02);
  obj.value = num01;
}
function setComma(n) {
  var reg = /(^[+-]?\d+)(\d{3})/;
  n += '';
  while (reg.test(n)) {
    n = n.replace(reg, '$1' + ',' + '$2');
  }
  return n;
}

function getblur(n) {
  n.value = `${n.value} 원`;
}

function getfocus(n) {
  let data = n.value;
  n.value = data.replace(' 원', '');
}

/* 업로드 펑션 */
function change_btn() {
  let data = document.querySelector('.img_count_text');
  let input = document.querySelector('.file_input');
  let fileName = document.querySelector('.file_input').files;
  let files = document.querySelector('.file_input').files.length;
  let postImg = document.querySelector('.post_img_line');

  let imgBox = document.createElement('div');
  imgBox.classList.add('img-box');

  let file_count = document.querySelectorAll('.img-box > .img > img').length;

  if (file_count < 5) {
    imgBox.innerHTML = ``;
    for (let i = 0; i < files; i++) {
      let div = document.createElement('div');
      let img = document.createElement('img');
      let button = document.createElement('button');
      div.classList.add('img');
      img.src = URL.createObjectURL(input.files[i]);
      button.type = "button"
      
      button.classList.add('img-cheking');
      button.appendChild(img)
      div.appendChild(button);
      imgBox.appendChild(div);
      console.log(URL.createObjectURL(input.files[i]));
    }
    postImg.appendChild(imgBox);

    let file_counting = document.querySelectorAll(
      '.img-box > .img > img',
    ).length;

    data.innerText = `${file_counting}/5`;
  } else {
    alert('이미지는 최대 5개까지 첨부할 수 있어요');
  }
}
