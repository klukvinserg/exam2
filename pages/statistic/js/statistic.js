$(document).ready(function () {
  // let obj = [];

  let obj = [
    {
      id: 1,
      name: 'Winnie-the-Pooh',
      author: 'Alan Alexander Milne',
      year: '1999',
      namePublishingHouse: 'Ababa-Gala-Maga',
      qtyOfPages: 120,
      qtyOfBooks: 0,
      rating: 0,
    },
    {
      id: 2,
      name: 'Jeeves and Wooster stories',
      author: 'P.G.Wodehouse',
      year: '2015',
      namePublishingHouse: 'Ababa',
      qtyOfPages: 56,
      qtyOfBooks: 2,
      rating: 0,
    },
    {
      id: 3,
      name: 'Harry Potter and the Philosopher’s Stone',
      author: 'J.K. Rowling',
      year: '2005',
      namePublishingHouse: 'Gala-Maga',
      qtyOfPages: 1200,
      qtyOfBooks: 15,
      rating: 0,
    },
    {
      id: 4,
      name: 'Airport',
      author: 'Arthur Hailey',
      year: '2020',
      namePublishingHouse: 'Maga',
      qtyOfPages: 120,
      qtyOfBooks: 10,
      rating: 0,
    },
    {
      id: 5,
      name: 'The Adventures of Sherlock Holmes',
      author: 'Arthur Conan Doyle',
      year: '1950',
      namePublishingHouse: 'AbabaMaga',
      qtyOfPages: 500,
      qtyOfBooks: 10,
      rating: 0,
    },
  ];

  let objVisitors = [];

  let objCards = [];

  // get data from localstorage
  let getDataFromLocStBooks = JSON.parse(localStorage.getItem('dataOfBooks'));
  let getDataFromLocStCards = JSON.parse(localStorage.getItem('dataOfCards'));
  let getDataFromLocStVisitors = JSON.parse(localStorage.getItem('data'));

  if (getDataFromLocStBooks === null) {
    localStorage.setItem('dataOfBooks', JSON.stringify(obj));
  }

  if (getDataFromLocStCards === null) {
    localStorage.setItem('dataOfCards', JSON.stringify(objCards));
  }

  if (getDataFromLocStVisitors === null) {
    localStorage.setItem('data', JSON.stringify(objVisitors));
  }

  objBooks = JSON.parse(localStorage.getItem('dataOfBooks'));
  objVisitors = JSON.parse(localStorage.getItem('data'));

  let labelBook = 'book';
  let labelVisitor = 'visitor';

  getTop(objBooks, labelBook);

  getTop(objVisitors, labelVisitor);
});

function getTop(obj, label) {
  // let obj = JSON.parse(localStorage.getItem('dataOfBooks'));

  obj.sort(function (a, b) {
    return b.rating - a.rating;
  });

  let setRating = new Set();

  for (let i = 0; i < obj.length; i++) {
    setRating.add(obj[i].rating);
  }

  let ratingArr = [];

  for (let value of setRating) {
    let arr = [];
    for (let i = 0; i < obj.length; i++) {
      if (value === obj[i].rating) {
        arr.push(obj[i]);
      }
    }

    ratingArr.push(arr);
  }

  let count;

  if (ratingArr.length < 5) {
    count = ratingArr.length;
  } else {
    count = 5;
  }

  // if (label === "") {

  // }

  for (let i = 0; i < count; i++) {
    let createH = document.createElement('h4');
    createH.innerHTML = `${i + 1} place`;
    if (label === 'book') {
      $('.top-books').append(createH);
    }

    if (label === 'visitor') {
      $('.top-visitors').append(createH);
    }

    for (let j = 0; j < ratingArr[i].length; j++) {
      let createDiv = document.createElement('div');

      createDiv.innerHTML = `<div><p>${ratingArr[i][j].name} <span>(rating - ${ratingArr[i][j].rating})</span></p></div>`;

      if (label === 'book') {
        $('.top-books').append(createDiv);
      }

      if (label === 'visitor') {
        $('.top-visitors').append(createDiv);
      }
    }
  }
}
