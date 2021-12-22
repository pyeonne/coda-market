const items = document.querySelectorAll('main .item');
const body = document.querySelector('body');

items.forEach(item => {
  item.addEventListener('click', async () => {
    const category = item.querySelector('span').getAttribute('value');

    console.log(category);

    window.location.replace(`/posts/category?category=${category}`);

    // axios.get(`/posts/category?category=${category}`).then(res => {
    //   console.log(res);
    //   // body.innerHTML += res.data.posts[0].content;
    // });
  });
});
