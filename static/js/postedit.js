function changeSoldOut(value) {
  document.querySelector('.sold_btn').value = value;

  if (value === 'false') {
    document.querySelector('.sold_btn').style.color = 'green';
  } else {
    document.querySelector('.sold_btn').style.color = 'red';
  }
}

function changeCategory(value) {
  document.querySelector('.category_btn').value = value;
}

function selec_change() {
  let data = document.querySelector('.sold_btn').value;
  if (data === 'false') {
    document.querySelector('.sold_btn').style.color = 'green';
  } else {
    document.querySelector('.sold_btn').style.color = 'red';
  }
}

function uploadCheck(value, port) {
  console.log(value, port);
  let data = document.querySelector('.img_count_text');
  let input = document.querySelector('.file_input');
  let fileName = document.querySelector('.file_input').files;
  let files = document.querySelector('.file_input').files.length;
  let postImg = document.querySelector('.post_img_line');

  let imgBox = document.createElement('div');
  imgBox.classList.add('img-box');
  let file_count = document.querySelectorAll('.img-box > .img ').length;

  let img_datas = value.split(',');

  

  imgBox.innerHTML = ``;
  for (let i = 0; i < value.split(',').length; i++) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let button = document.createElement('button');
    let itag = document.createElement("i")
    itag.classList.add("fas", "fa-times-circle")
    div.classList.add('img');
    img.src = `http://localhost:${port}/${img_datas[i]}`;
    // img.src = URL.createObjectURL(input.files[i]);
    
    button.type = "button"

    button.classList.add('img-cheking');

    button.appendChild(img)
    div.appendChild(button);
    imgBox.appendChild(div);
    imgBox.appendChild(itag);

   
  }

  postImg.appendChild(imgBox);

  let file_counting = document.querySelectorAll('.img-box > .img').length;

  data.innerText = `${file_counting}/5`;

  imgBox.onclick = () => {
    imgBox.parentNode.removeChild(imgBox);
    
    let file_counting = document.querySelectorAll('.img-box > .img').length;
    data.innerText = `${file_counting}/5`;

  }
}
