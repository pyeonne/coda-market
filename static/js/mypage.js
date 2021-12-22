// import { userJoin } from '../../utils/users';

/**** ACCORDION HISTORIES ****/
const historiesContent = document.querySelectorAll('.histories__content');

async function toggleHistories() {
  this.classList.toggle('histories__open');

  if ($(this).hasClass('histories__open')) {
    if (
      $(this).hasClass('transaction-list') &&
      document.querySelector('.histories__list').innerHTML === ''
    ) {
      await fetch(`/profile/tranactions`, {
        method: 'get',
      })
        .then(res => res.json())
        .then(data => {
          for (let i = 0; i < Object.keys(data.list).length; i++) {
            console.log(data.list[i]);
            if (data.list[i].isSoldOut === false) {
              data.list[i].isSoldOut = '판매중';
            } else {
              data.list[i].isSoldOut = '판매완료';
            }

            document.querySelector('.histories__list').innerHTML += `
                <a href="/posts/${
                  data.list[i].shortId
                }" class="histories__data">
                <div class="histories__titles">
                  <img
                    src="${data.list[i].thumbnail}"
                    alt=""
                    class="histories__img"
                  />
                  <div>
                    <h3 class="histories__name">
                      ${data.list[i].title}
                    </h3>
                    <span class="histories__time">${
                      data.list[i].location
                    } · ${timeForToday(data.list[i].updatedAt)}</span>
                    <div class="histories__info">
                      <div class="button histories__status progress">
                        ${data.list[i].isSoldOut}
                      </div>
                      <h3 class="histories__price">${data.list[i].price}원</h3>
                    </div>
                  </div>
                </div>
              </a>
            `;
          }
        });
    }

    if ($(this).hasClass('purchased-list')) {
      await fetch(`/profile/purchases`, {
        method: 'get',
      })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    if ($(this).hasClass('cart-list')) {
      await fetch(`/profile/carts`, {
        method: 'get',
      })
        .then(res => res.json())
        .then(data => console.log(data));
    }
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
  window.location.href = '/edit';
});

// 모달창 X 아이콘 클릭 시
modalCloses.addEventListener('click', () => {
  modalViews.classList.remove('active-modal');
});

// 모달 밖 클릭 시
window.addEventListener('click', e => {
  e.target === modalViews ? modalViews.classList.remove('active-modal') : false;
});

// 날짜 계산
function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

function logout() {
  const f = document.logout;
  f.action = '/logout';
  f.method = 'post';
  f.submit();
}
