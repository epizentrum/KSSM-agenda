document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.tabs-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btns.forEach(btn => {
        btn.classList.remove('active');
      })
      btn.classList.add('active');
      const dayType = btn.dataset.day;
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.style.display = (card.dataset.day == dayType) ? 'block' : 'none';
      })
    })
  });
})