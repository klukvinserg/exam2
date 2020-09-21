$(document).ready(function () {
  let obj = [];

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

  for (let i = 0; i < count; i++) {
    let createH = document.createElement('h4');
    if (ratingArr[i][0].rating !== 0) {
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
}
