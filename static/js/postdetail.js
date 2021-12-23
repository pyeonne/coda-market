let num = document.querySelector('#ds-pice');
num.innerText = num.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

let check_clicked = isClick => {
  let heart = document.querySelector('.menu1-item > button > i');

  if (isClick === 'true') {
    heart.classList.add('save-cart');
  } else {
    heart.classList.remove('save-cart');
  }
};

function change_category(value) {
  let data = '';
  console.log(1);
  switch (value) {
    case 'usedCar':
      data = '중고차';
      break;

    case 'digitalDevice':
      data = '디지털기기';
      break;

    case 'appliance':
      data = '생활가전';
      break;

    case 'furniture':
      data = '가구/인테리어';
      break;

    case 'children':
      data = '유아동';
      break;

    case 'kitchenware':
      data = '생활/가공식품';
      break;

    case 'childrenBook':
      data = '유아도서';
      break;

    case 'sports':
      data = '스포츠/레저';
      break;

    case 'womenGoods':
      data = '여성잡화';
      break;

    case 'womenClothing':
      data = '여성의류';
      break;

    case 'menGoodsAndClothing':
      data = '남성패션/잡화';
      break;

    case 'hobby':
      data = '게임/취미';
      break;

    case 'beauty':
      data = '뷰티/미용';
      break;

    case 'pet':
      data = '반려동물용품';
      break;

    case 'bookAndTicketAndRecord':
      data = '도서/티켓/음반';
      break;

    case 'plant':
      data = '식물';
      break;

    case 'others':
      data = '기타 중고물품';
      break;
  }

  document.querySelector('.category-text').innerText = data;
}

let save_cart = async value => {
  let heart = document.querySelector('.menu1-item > button > i');

  const url = `/cart/${value}`;
  await fetch(url, {
    method: 'post',
  })
    .then(res => res.json())
    .then(data => {
      const isClick = data.isClick;
      if (isClick) {
        heart.classList.add('save-cart');
      } else {
        heart.classList.remove('save-cart');
      }
    });
};
