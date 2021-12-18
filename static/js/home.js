const initHeader = document.querySelector('header .init');
const searchHeader = document.querySelector('header .search');
const searchBtn = document.querySelector('header .init .btn-list .search-btn');
const backBtn = document.querySelector('header .search .btn-list .back-btn');
const searchInput = document.querySelector('header .search input');
const postList = document.querySelector('body main ul');

searchBtn.addEventListener('click', () => {
  initHeader.classList.toggle('none');
  searchHeader.classList.toggle('none');
});

backBtn.addEventListener('click', () => {
  initHeader.classList.toggle('none');
  searchHeader.classList.toggle('none');
});

function enterkey() {
  if (window.event.keyCode == 13) {
    const searchWord = searchInput.value;

    axios.post(`search/category/${searchWord}`).then(res => {
      makeList(
        post.id,
        post.title,
        post.location,
        post.updatedAt,
        post.price,
        3, // post.chat_num
        post.like_num,
      );
    });
  }
}

function makeList(link, thumnail, title, loca, date, price, chatNum, likeNum) {
  let posts = res.data.posts;

  posts.forEach(post => {
    let anchor = document.createElement('a');
    anchor.setAttribute('href', `posts/${link}`);
    postList.appendChild(anchor);

    let postInfo = document.createElement('div');
    postInfo.setAttribute('class', 'post-info');
    anchor.appendChild(postInfo);

    let postImg = document.createElement('img');
    postImg.setAttribute('src', `post.${thumnail}`);
    postImg.setAttribute('alt', 'post-image');
    postInfo.appendChild(postImg);

    let description = document.createElement('div');
    description.setAttribute('class', 'description');
    postInfo.appendChild(description);

    let title = document.createElement('h3');
    title.setAttribute('class', 'title');
    title.innerText(post.title);
    description.appendChild(title);

    let locaAndDate = document.createElement('div');
    locaAndDate.setAttribute('class', 'loca-and-date');
    description.appendChild(locaAndDate);

    let loca = document.createElement('span');
    loca.setAttribute('class', 'loca');
    loca.innerText(post.location);
    locaAndDate.appendChild(loca);

    let date = document.createElement('span');
    date.setAttribute('class', 'date');
    loca.innerText(post.updatedAt);
    locaAndDate.appendChild(date);

    let price = document.createElement('span');
    price.setAttribute('class', 'price');
    price.innerText(post.price);
    description.appendChild(price);

    let chatAndLike = document.createElement('div');
    chatAndLike.setAttribute('class', 'chat-and-like');
    anchor.appendChild(chatAndLike);

    let chatNum = document.createElement('div');
    chatNum.setAttribute('class', 'chat-num');
    chatAndLike.appendChild(chatNum);

    let chatIcon = document.createElement('i');
    chatIcon.setAttribute('class', 'far fa-comment-dots');
    chatNum.appendChild(chatIcon);

    let chatSpan = document.createElement('span');
    chatSpan.innerText(post.chat_num);
    chatNum.appendChild(chatSpan);

    let likeNum = document.createElement('div');
    likeNum.setAttribute('class', 'like-num');
    chatAndLike.appendChild(likeNum);

    let likeIcon = document.createElement('i');
    likeIcon.setAttribute('class', 'far fa-heart');
    likeNum.appendChild(likeIcon);

    let likeSpan = document.createElement('span');
    likeSpan.innerText(post.like_num);
    likeNum.appendChild(likeSpan);

    console.log(post);
  });
}
