const items = document.querySelectorAll('main .item');
const body = document.querySelector('body');

items.forEach(item => {
  item.addEventListener('click', async () => {
    const category = item.querySelector('span').getAttribute('value');

    window.location.replace(`/posts`);


  });
});
