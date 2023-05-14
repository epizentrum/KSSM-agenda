const thursdayButton = document.querySelector('.thursday');
const fridayButton = document.querySelector('.friday');
const thursdayCards = document.querySelectorAll('.card[data-day="thursday"]');
const fridayCards = document.querySelectorAll('.card[data-day="friday"]');
let currentCards = 'thursday';

thursdayButton.addEventListener('click', () => {
  if (currentCards !== 'thursday') { // check which tiles are displayed
    // hide current tiles
    document.querySelectorAll(`.card[data-day="${currentCards}"]`)
      .forEach(card => card.style.display = 'none');

    // show thursday tiles
    thursdayCards.forEach(card => card.style.display = 'block');
    currentCards = 'thursday';
  }
});

fridayButton.addEventListener('click', () => {
  if (currentCards !== 'friday') { // check which tiles are displayed
    // hide current tiles
    document.querySelectorAll(`.card[data-day="${currentCards}"]`)
      .forEach(card => card.style.display = 'none');

    // show friday tiles
    fridayCards.forEach(card => card.style.display = 'block');
    currentCards = 'friday';
  }
});
