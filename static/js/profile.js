const targetImg = document.querySelector('#target_img');
const profileImg = document.querySelector('.img-profile');

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

  fetch(profile / edit, profileData).catch(err => {
    alert('에러');
  });
}
