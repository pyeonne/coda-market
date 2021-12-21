const targetImg = document.querySelector('#target_img');
const profileImg = document.querySelector('.img-profile');

targetImg.addEventListener('click', function (e) {
  document.querySelector('#file').click();
  console.log(e);
});

function loadFile(input) {
  let file = input.files[0];
  let newImage = document.querySelector('.img-profile');

  newImage.src = URL.createObjectURL(file);
}

document.getElementById('submit').addEventListener('click', e => {
  let file = document.querySelector('#file').files[0];
  let imgURL = URL.createObjectURL(file);
  let name = document.querySelector('.profile__rename').value;
  let location = document.querySelector('#addressDo2').value;

  let profileData = {
    method: 'POST',
    body: JSON.stringify({
      name,
      location,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // fetch(`profile/edit`, profileData)
  // .catch(err => {
  //   alert('에러');
  // });
});

/*
function changeValue(obj) {
  const fileName = obj.value.match(/[^\\/\n]+$/)[0];
  document.querySelector('.img-profile').src = `img/${fileName}`;
}
*/

function setThumbnail(e) {
  const reader = new FileReader();

  reader.onload = e => {
    profileImg.src = e.target.result;
  };
  console.log('reader');
  reader.readAsDataURL(e.target.files[0]);
}
