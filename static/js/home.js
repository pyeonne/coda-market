const initHeader = document.querySelector('header .init');
const searchHeader = document.querySelector('header .search');
const locaSelectBox = document.querySelector('header .init .loca-select');
const locaSelectBoxOptions = document.querySelectorAll(
  'header .init .loca-select option',
);
const searchBtn = document.querySelector('header .init .btn-list .search-btn');
const categoryBtn = document.querySelector(
  'header .init .btn-list .category-btn',
);
const backBtn = document.querySelector('header .search .btn-list .back-btn');
const searchInput = document.querySelector('header .search input');
const postList = document.querySelector('body main ul');
const noResultMsg = document.querySelector('.no-result-message');

searchBtn.addEventListener('click', () => {
  initHeader.classList.toggle('none');
  searchHeader.classList.toggle('none');
});

categoryBtn.addEventListener('click', () => {
  window.location.replace(
    `/category?location=${
      locaSelectBox.options[locaSelectBox.selectedIndex].value
    }`,
  );
});

backBtn.addEventListener('click', () => {
  initHeader.classList.toggle('none');
  searchHeader.classList.toggle('none');

  searchInput.value = '';

  selectLocation();
});

function setLoation(userLoca, isCategory, posts) {
  locaSelectBoxOptions.forEach(optionTag => {
    if (optionTag.value === userLoca) {
      optionTag.setAttribute('selected', 'selected');
    }
  });

  if (!isCategory) {
    reqResHandler(`/posts/search?location=${userLoca}`);
  } else {
    removePostList();
    noResultMsg.classList.add('none');

    if (posts.length > 0) {
      makePostList(posts);
    } else {
      noResultMsg.classList.remove('none');
    }
  }
}

// 지역 설정 selectBox에서 특정 지역 선택 시, 해당 지역의 post들을 가져오는 함수
function selectLocation() {
  locaSelectBoxOptions.forEach(optionTag => {
    if (optionTag.hasAttribute('selected')) {
      optionTag.removeAttribute('selected');
    }
  });

  locaSelectBox.options[locaSelectBox.selectedIndex].setAttribute(
    'selected',
    'selected',
  );

  reqResHandler(`/posts/search?location=${locaSelectBox.value}`);
}

// 검색 input에서 특정 검색어 검색 시, 해당 검색어에 해당하는 post들을 가져오는 함수
function enterkey() {
  if (window.event.keyCode == 13) {
    reqResHandler(
      `/posts/search?location=${locaSelectBox.value}&input=${searchInput.value}`,
    );
  }
}

function reqResHandler(url) {
  axios.get(url).then(res => {
    const posts = res.data.posts;
    removePostList();
    noResultMsg.classList.add('none');

    if (posts.length > 0) {
      makePostList(posts);
    } else {
      noResultMsg.classList.remove('none');
    }
  });
}

// 현재 홈 화면에 띄워진 post들을 모두 지워주는 함수
function removePostList() {
  while (postList.hasChildNodes()) {
    postList.removeChild(postList.firstChild);
  }
}

// DB에서 받아온 post들을 홈 화면에 띄워주는 함수
function makePostList(posts) {
  posts.forEach(post => {
    const li = document.createElement('li');
    postList.appendChild(li);

    const anchor = document.createElement('a');
    anchor.setAttribute('href', `/posts/${post.shortId}`);
    li.appendChild(anchor);

    const postInfo = document.createElement('div');
    postInfo.setAttribute('class', 'post-info');
    anchor.appendChild(postInfo);

    const postImg = document.createElement('img');
    postImg.setAttribute('src', `${post.thumbnail}`);
    postImg.setAttribute('alt', 'post-image');
    postInfo.appendChild(postImg);

    const description = document.createElement('div');
    description.setAttribute('class', 'description');
    postInfo.appendChild(description);

    const title = document.createElement('h3');
    title.setAttribute('class', 'title');
    title.innerText = post.title;
    description.appendChild(title);

    const locaAndDate = document.createElement('div');
    locaAndDate.setAttribute('class', 'loca-and-date');
    description.appendChild(locaAndDate);

    const loca = document.createElement('span');
    loca.setAttribute('class', 'loca');
    loca.innerText = `${post.location} · `;
    locaAndDate.appendChild(loca);

    const date = document.createElement('span');
    date.setAttribute('class', 'date');
    date.innerText = `${getTimeDiff(toDate(post.updatedAt))} 전`;
    locaAndDate.appendChild(date);

    const price = document.createElement('span');
    price.setAttribute('class', 'price');
    price.innerText = `${post.price}원`;
    description.appendChild(price);

    const chatAndLike = document.createElement('div');
    chatAndLike.setAttribute('class', 'chat-and-like');
    anchor.appendChild(chatAndLike);

    const chatNum = document.createElement('div');
    chatNum.setAttribute('class', 'chat-num');
    chatAndLike.appendChild(chatNum);

    const chatIcon = document.createElement('i');
    chatIcon.setAttribute('class', 'far fa-comment-dots');
    chatNum.appendChild(chatIcon);

    const chatSpan = document.createElement('span');
    chatSpan.innerText = 3;
    // chatSpan.innerText = post.chat_num; => DB 수정 후 윗줄 삭제 및 주석 제거
    chatNum.appendChild(chatSpan);

    const likeNum = document.createElement('div');
    likeNum.setAttribute('class', 'like-num');
    chatAndLike.appendChild(likeNum);

    const likeIcon = document.createElement('i');
    likeIcon.setAttribute('class', 'far fa-heart');
    likeNum.appendChild(likeIcon);

    const likeSpan = document.createElement('span');
    likeSpan.innerText = 3;
    // likeSpan.innerText = post.like_num; => DB 수정 후 윗줄 삭제 및 주석 제거
    likeNum.appendChild(likeSpan);
  });
}

// String 타입의 Date를 Date 타입의 Date로 변환해주는 함수
function toDate(date_str) {
  const yyyyMMddhhmmss = String(date_str);

  const sYear = yyyyMMddhhmmss.substring(0, 4);
  const sMonth = yyyyMMddhhmmss.substring(5, 7);
  const sDate = yyyyMMddhhmmss.substring(8, 10);
  const sHour = yyyyMMddhhmmss.substring(11, 13);
  const sMinute = yyyyMMddhhmmss.substring(14, 16);
  const sSecond = yyyyMMddhhmmss.substring(17, 19);

  return new Date(
    Number(sYear),
    Number(sMonth) - 1,
    Number(sDate),
    Number(sHour),
    Number(sMinute),
    Number(sSecond),
  );
}

// (현재 시간 - Post의 마지막 업데이트 시간)을 리턴해주는 함수
// 년, 월, 일, 시, 분, 초 중 하나를 리턴
function getTimeDiff(updatedTime) {
  const currTime = new Date();

  if (currTime.getFullYear() !== updatedTime.getFullYear()) {
    return `${currTime.getFullYear() - updatedTime.getFullYear()}년`;
  }

  if (currTime.getMonth() !== updatedTime.getMonth()) {
    return `${currTime.getMonth() - updatedTime.getMonth()}개월`;
  }

  if (currTime.getDate() !== updatedTime.getDate()) {
    return `${currTime.getDate() - updatedTime.getDate()}일`;
  }

  if (currTime.getHours() !== updatedTime.getHours()) {
    return `${currTime.getHours() - updatedTime.getHours()}시간`;
  }

  if (currTime.getMinutes() !== updatedTime.getMinutes()) {
    return `${currTime.getMinutes() - updatedTime.getMinutes()}분`;
  }

  if (currTime.getSeconds() !== updatedTime.getSeconds()) {
    return `${currTime.getSeconds() - updatedTime.getSeconds()}초`;
  }
}
