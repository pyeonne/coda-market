const items = document.querySelectorAll('main .item');
const body = document.querySelector('body');

items.forEach(item => {
  item.addEventListener('click', async () => {
    const category = item.querySelector('span').getAttribute('value');

    await fetch(`/posts/category?category=${category}`, {
      method: 'get',
    });

    window.location.replace(`/posts/category?category=${category}`);

    axios.post(`search/category/${category}`).then(res => {
      console.log(res);
      body.innerHTML += res.data.posts[0].content;
    });
  });
});
