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
