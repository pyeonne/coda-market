/**** ACCORDION HISTORIES ****/
const historiesContent = document.querySelectorAll('.histories__content');
const mypage__name = document.querySelector('.mypage__name');
const mypage_img_thumbnail = document.getElementById('mypage_img_thumbnail');

function toggleHistories() {
  this.classList.toggle('histories__open');
}

historiesContent.forEach(element => {
  element.addEventListener('click', toggleHistories);
});

function getMypage() {}
