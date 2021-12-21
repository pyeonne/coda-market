// import { userJoin } from '../../utils/users';

/**** ACCORDION HISTORIES ****/
const historiesContent = document.querySelectorAll('.histories__content');

async function toggleHistories() {
  this.classList.toggle('histories__open');

  if ($(this).hasClass('transaction-list')) {
    await fetch(`/profile/tranaction-list`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  if ($(this).hasClass('purchased-list')) {
    await fetch(`/profile/purchased-list`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  if ($(this).hasClass('cart-list')) {
    await fetch(`/profile/cart-list`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }
}

historiesContent.forEach(element => {
  element.addEventListener('click', toggleHistories);
});

/*** Modal ***/
const modalViews = document.querySelector('.services__modal');
const modalCloses = document.querySelector('.services__modal-close');

let modal = function () {
  modalViews.classList.add('active-modal');
};

document.querySelector('#edit__button').addEventListener('click', () => {
  modal();
});

document.querySelector('#pwd__form').addEventListener('submit', () => {
  window.location.href = '/profile';
});

// 모달창 X 아이콘 클릭 시
modalCloses.addEventListener('click', () => {
  modalViews.classList.remove('active-modal');
});

// 모달 밖 클릭 시
window.addEventListener('click', e => {
  e.target === modalViews ? modalViews.classList.remove('active-modal') : false;
});
