window.addEventListener('load', () => {
  const menuBtn = document.querySelector('a.menu');
  const menu = document.querySelector('ul.project-items');

  menuBtn.addEventListener('click', () => {
    menu.style.display === 'flex'
      ? (menu.style.display = 'none')
      : (menu.style.display = 'flex');
  });
});
