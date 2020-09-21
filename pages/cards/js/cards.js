$(document).ready(function () {
  let obj = [];

  // let obj = [
  //   {
  //     id: 1,
  //     name: 'Winnie-the-Pooh',
  //     author: 'Alan Alexander Milne',
  //     year: '1999',
  //     namePublishingHouse: 'Ababa-Gala-Maga',
  //     qtyOfPages: 120,
  //     qtyOfBooks: 0,
  //     rating: 0,
  //   },
  //   {
  //     id: 2,
  //     name: ' Jeeves and Wooster stories',
  //     author: 'P.G.Wodehouse',
  //     year: '2015',
  //     namePublishingHouse: 'Ababa',
  //     qtyOfPages: 56,
  //     qtyOfBooks: 2,
  //     rating: 0,
  //   },
  //   {
  //     id: 3,
  //     name: 'Harry Potter and the Philosopher’s Stone',
  //     author: 'J.K. Rowling',
  //     year: '2005',
  //     namePublishingHouse: 'Gala-Maga',
  //     qtyOfPages: 1200,
  //     qtyOfBooks: 15,
  //     rating: 0,
  //   },
  //   {
  //     id: 4,
  //     name: 'Airport',
  //     author: 'Arthur Hailey',
  //     year: '2020',
  //     namePublishingHouse: 'Maga',
  //     qtyOfPages: 120,
  //     qtyOfBooks: 10,
  //     rating: 0,
  //   },
  //   {
  //     id: 5,
  //     name: 'The Adventures of Sherlock Holmes',
  //     author: 'Arthur Conan Doyle',
  //     year: '1950',
  //     namePublishingHouse: 'AbabaMaga',
  //     qtyOfPages: 500,
  //     qtyOfBooks: 10,
  //     rating: 0,
  //   },
  // ];

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

  getHtml();

  $("#myInput").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    $("#my_table .tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

// start - get html
function getHtml() {
  let objData = JSON.parse(localStorage.getItem('dataOfCards'));
  let objVisitors = JSON.parse(localStorage.getItem('data'));
  let objBooks = JSON.parse(localStorage.getItem('dataOfBooks'));
  let elementRemove = document.querySelectorAll('.option');

  elementRemove.forEach((e) => e.remove());

  for (let i = 0; i < objVisitors.length; i++) {
    $('.form-control-visitor').append(
      `<option key="${objVisitors[i].id}" class="option">${objVisitors[i].name}</option>`
    );
  }

  for (let i = 0; i < objBooks.length; i++) {
    // if (objBooks[i].qtyOfBooks > 0) {
    //   $('.form-control-book').append(
    //     `<option key="${objBooks[i].id}" class="option">${objBooks[i].name}</option>`
    //   );
    // }

    $('.form-control-book').append(
      `<option key="${objBooks[i].id}" class="option option-book">${objBooks[i].name}</option>`
    );

    if (objBooks[i].qtyOfBooks === 0) {
      $('.option-book').css('display', 'none');
    }
  }

  if (objData === null || objData.length === 0) {
    return false;
  }

  let element = document.getElementById('table_body');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  for (let i = 0; i < objData.length; i++) {
    let createTr = document.createElement('tr');

    $('#table_body').append(createTr);

    for (const key in objData[i]) {
      let createTd = document.createElement('td');

      if (key === 'returnDate' && objData[i].returnDate === false) {
        $(createTd)
          .addClass('return')
          .attr('onclick', 'returnBook(event)')
          .attr('key', `${objData[i].id}`)
          .attr('value', `${objData[i].idBook}`)
          .html(
            `<img src="https://www.iconfinder.com/data/icons/navigation-set-arrows-part-two/32/Arrow_Left-512.png" alt="edit" key=${objData[i].id} value=${objData[i].idBook} class="return">`
          );
      } else if (key === 'idBook') {
        continue;
      } else {
        $(createTd).text(objData[i][key]);
      }

      $(createTr).addClass('tr').append(createTd);
    }
  }
}
// end - get html

// start - return book
function returnBook(event) {
  let idTarget = Number(event.target.attributes[2].value);

  let objData = JSON.parse(localStorage.getItem('dataOfCards'));
  let objBooks = JSON.parse(localStorage.getItem('dataOfBooks'));

  for (let i = 0; i < objData.length; i++) {
    if (objData[i].id === idTarget) {
      objData[i].returnDate = getData();
    }
  }

  let choise = Number(event.target.attributes[3].value);

  for (let i = 0; i < objBooks.length; i++) {
    if (objBooks[i].id === choise) {
      objBooks[i].qtyOfBooks++;
    }
  }

  localStorage.setItem('dataOfCards', JSON.stringify(objData));
  localStorage.setItem('dataOfBooks', JSON.stringify(objBooks));

  getHtml();
} // end - return book

function getData() {
  let currentDay = new Date().getDate();

  if (currentDay < 10) {
    currentDay = '0' + currentDay;
  }

  let currentMonth = new Date().getMonth() + 1;

  if (currentMonth < 10) {
    currentMonth = '0' + currentMonth;
  }

  let currentYear = new Date().getFullYear();

  return `${currentDay}/${currentMonth}/${currentYear}`;
}

// start - save card
function saveCard() {
  let objVisitors = JSON.parse(localStorage.getItem('data'));
  let objBooks = JSON.parse(localStorage.getItem('dataOfBooks'));
  let objCards = JSON.parse(localStorage.getItem('dataOfCards'));

  let choiseIndexVisitor = $('.form-control-visitor')[0].parentElement
    .children[1].options.selectedIndex;
  let choiseIndexBook = $('.form-control-book')[0].parentElement.children[1]
    .options.selectedIndex;

  if (choiseIndexVisitor === 0) {
    $('.form-control-visitor').css('border', '1px solid red');
    return false;
  } else {
    $('.form-control-visitor').css('border', '1px solid black');
  }

  if (choiseIndexBook === 0) {
    $('.form-control-book').css('border', '1px solid red');
    return false;
  } else {
    $('.form-control-book').css('border', '1px solid black');
  }

  let allIdCard = [];

  for (let i = 0; i < objCards.length; i++) {
    allIdCard.push(objCards[i].id);
  }

  let currentId;

  if (allIdCard.length === 0) {
    currentId = 1;
  } else {
    currentId = Math.max(...allIdCard) + 1;
  }

  let allIdVisitors = [];

  for (let i = 0; i < objVisitors.length; i++) {
    allIdVisitors.push(objVisitors[i].id);
  }

  objVisitors.forEach((el) => {
    if (el.id === allIdVisitors[choiseIndexVisitor - 1]) {
      el.rating++;
    }
  });

  let allIdBooks = [];

  for (let i = 0; i < objBooks.length; i++) {
    allIdBooks.push(objBooks[i].id);
  }

  let bookId;

  objBooks.forEach((el) => {
    if (el.id === allIdBooks[choiseIndexBook - 1]) {
      el.rating++;
      el.qtyOfBooks--;
      bookId = el.id;
    }
  });

  let tmpObj = {
    id: currentId,
    visitor: selectOption(choiseIndexVisitor, objVisitors),
    book: selectOption(choiseIndexBook, objBooks),
    idBook: bookId,
    borrowDate: getData(),
    returnDate: false,
  };

  objCards.push(tmpObj);

  localStorage.setItem('data', JSON.stringify(objVisitors));
  localStorage.setItem('dataOfCards', JSON.stringify(objCards));
  localStorage.setItem('dataOfBooks', JSON.stringify(objBooks));

  getHtml();

  $('#exampleModal').modal('hide');
} // end - add new card

/// start - number of selection
function selectOption(index, obj) {
  let idArr = [];

  for (let i = 0; i < obj.length; i++) {
    idArr.push(obj[i].id);
  }

  let nameId = idArr[index - 1];

  let value;

  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id === nameId) {
      value = obj[i].name;
    }
  }

  return value;
} /// end - number of selection

function inputStyle() {
  $('.form-control-book').css('border', '1px solid black');
  $('.form-control-visitor').css('border', '1px solid black');

  let selectboxVisitor = $('.form-control-visitor');
  selectboxVisitor.prop('selectedIndex', 0);

  let selectboxBook = $('.form-control-book');
  selectboxBook.prop('selectedIndex', 0);
}


function sortTable(event) {
  let n = $('.form-control-sort')[0].options.selectedIndex;

  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById('my_table');
  switching = true;
  //Set the sorting direction to ascending:
  dir = 'asc';
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}
