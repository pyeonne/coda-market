const targetImg = document.querySelector('#target_img');
const profileImg = document.querySelector('.img-profile');
const selectbox = document.querySelectorAll('.select option');

targetImg.addEventListener('click', function (e) {
  document.querySelector('#file').click();
});

function loadFile(input) {
  let file = input.files[0];
  let newImage = document.querySelector('.img-profile');

  newImage.src = URL.createObjectURL(file);
}

function setThumbnail(e) {
  const reader = new FileReader();

  reader.onload = e => {
    profileImg.src = e.target.result;
  };
}

function setLoation(userLoca) {
  console.log(selectbox);
  selectbox.forEach(optionTag => {
    if (optionTag.value === userLoca) {
      optionTag.setAttribute('selected', 'selected');
    }
  });
}

async function loadThumbnail(e) {
  await fetch('/posts/p', { method: 'get' }).then(res => console.log(res));
}
