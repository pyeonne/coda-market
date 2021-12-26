let imageFiles;
const data = document.querySelector('.img_count_text');
const postImg = document.querySelector('.post_img_line');
const pathList = document.querySelector('#pathList');
const form = document.querySelector('#actionForm');
const post_img_btn = document.querySelector('.post_img_btn');
let file_input = document.querySelector('.file_input');

let list = [];

function file_btn() {
  const imageFiles = document.querySelectorAll('.img-box');
  const input = document.querySelector('.file_input');

  input.click();

  for (let i = 0; i < imageFiles.length; i++) {
    imageFiles[i].remove();
  }
  list = [];
  input.value = null;
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

function changeCategory(value) {
  document.querySelector('.category_btn').value = value;
}

// 이미지 로드
function uploadCheck(value) {
  if (!value) return;
  let img_datas = value.split(',');
  console.log(img_datas);
  for (let i = 0; i < img_datas.length; i++) {
    createItem(img_datas[i], 'load');
    list.push(img_datas[i]);
  }

  fileCounting();
}

/* 새로 업로드 */
function change_btn() {
  const input = document.querySelector('.file_input');
  const files = input.files.length;

  for (let i = 0; i < files; i++) {
    createItem(URL.createObjectURL(input.files[i]));
  }
  fileNumberAlert();

  fileCounting();
}

function createItem(path, type) {
  let imgBox = document.createElement('div');
  let div = document.createElement('div');
  let img = document.createElement('img');
  let button = document.createElement('button');
  // let itag = document.createElement('i');
  const postImg = document.querySelector('.post_img_line');

  // itag.classList.add('fas', 'fa-times-circle');
  div.classList.add('img');

  type === 'load' ? (img.src = `/${path}`) : (img.src = `${path}`);

  button.type = 'button';

  imgBox.classList.add('img-box');

  button.classList.add('img-checking');
  button.appendChild(img);
  div.appendChild(button);
  imgBox.appendChild(div);
  postImg.appendChild(imgBox);
}

function fileNumberAlert() {
  const imageFiles = document.querySelectorAll('.img-box');
  const files = document.querySelector('.file_input').files;
  if (files.length > 5) {
    for (let i = 0; i < files.length; i++) {
      if (i > 4) {
        imageFiles[i].remove();
      }
    }
    alert('이미지는 최대 5개까지 첨부할 수 있어요');
  }
}

function fileCounting() {
  const file_counting = document.querySelectorAll('.img-box > .img').length;

  const formData = new FormData();

  pathList.value = list.length ? list : '';

  formData.append('pathList', pathList);

  data.innerText = `${file_counting}/5`;
}

function changeSoldOut(boolean) {
  const selectBtn = document.querySelector('.sold_btn');

  if (boolean === 'true' || boolean === true) {
    selectBtn.style.color = 'red';
  } else {
    selectBtn.style.color = 'green';
  }
  selectBtn.value = boolean;
}
