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

  //   localStorage.setItem('data', JSON.stringify(obj));

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
});

// start - get html
function getHtml() {
  let objData = JSON.parse(localStorage.getItem('dataOfBooks'));

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

      if (key === 'rating') {
        break;
      } else {
        createTd.innerText = objData[i][key];
      }

      $(createTr).append(createTd);
    }

    let createTdEdit = document.createElement('td');
    $(createTr).append(
      $(createTdEdit)
        .addClass('edit')
        .attr('data-toggle', 'modal')
        .attr('data-target', '#exampleModalEdit')
        .html(
          `<img src="https://www.iconfinder.com/data/icons/edition/100/pen_2-512.png" alt="edit" key=${objData[i].id}>`
        )
        .attr('onclick', 'editBook(event)')
        .attr('key', `${objData[i].id}`)
    );

    let createTdRemove = document.createElement('td');
    $(createTr).append(
      $(createTdRemove)
        .addClass('remove')
        .html(
          `<img src="https://www.iconfinder.com/data/icons/flat-icons-web/40/Remove-512.png" alt="edit" key=${objData[i].id}>`
        )
        .attr('onclick', 'deleteBook(event)')
        .attr('key', `${objData[i].id}`)
    );
  }
}
// end - get html

// start - clear inputs in modal-window
function clearInput() {
  let inpt = document.querySelectorAll('input[type=text]');

  for (let i = 0; i < inpt.length; i++) {
    inpt[i].style.border = '1px solid black';
    inpt[i].value = '';
  }
}
// end - clear inputs in modal-window

// start - add new book
function saveBook() {
  let name = $('#title');
  let author = $('#author');
  let year = $('#year');
  let publishingHouse = $('#publishingHouse');
  let qtyOfPages = $('#qtyOfPages');
  let qtyOfBooks = $('#qtyOfBooks');

  if (name.val().length === 0) {
    $('#title').css('border', '1px solid red');
    return false;
  } else {
    $('#title').css('border', '1px solid black');
  }

  if (author.val().length === 0) {
    $('#author').css('border', '1px solid red');
    return false;
  } else {
    $('#author').css('border', '1px solid black');
  }

  if (year.val().length === 0) {
    $('#year').css('border', '1px solid red');
    return false;
  } else {
    $('#year').css('border', '1px solid black');
  }

  if (publishingHouse.val().length === 0) {
    $('#publishingHouse').css('border', '1px solid red');
    return false;
  } else {
    $('#publishingHouse').css('border', '1px solid black');
  }

  if (qtyOfPages.val().length === 0) {
    $('#qtyOfPages').css('border', '1px solid red');
    return false;
  } else {
    $('#qtyOfPages').css('border', '1px solid black');
  }

  if (qtyOfBooks.val().length === 0) {
    $('#qtyOfBooks').css('border', '1px solid red');
    return false;
  } else {
    $('#qtyOfBooks').css('border', '1px solid black');
  }

  let tempObj = JSON.parse(localStorage.getItem('dataOfBooks'));

  let currentId;

  let arrId = [];

  for (let i = 0; i < tempObj.length; i++) {
    arrId.push(tempObj[i].id);
  }

  if (arrId.length === 0) {
    currentId = 1;
  } else {
    currentId = Math.max(...arrId) + 1;
  }

  let tmp = {
    id: currentId,
    name: name.val(),
    author: author.val(),
    year: year.val(),
    namePublishingHouse: publishingHouse.val(),
    qtyOfPages: qtyOfPages.val(),
    qtyOfBooks: qtyOfBooks.val(),
    rating: 0,
  };

  tempObj.push(tmp);

  localStorage.setItem('dataOfBooks', JSON.stringify(tempObj));

  $('#exampleModal').modal('hide');

  getHtml();

  tmp = {};
}
// end - add new book

// start - get value of book from localstorage in modal-window

let tmpObject;

function editBook(event) {
  console.log(event);

  let idTarget = Number(event.target.attributes[4].value);

  let dataSt = JSON.parse(localStorage.getItem('dataOfBooks'));

  console.log(dataSt);

  for (let i = 0; i < dataSt.length; i++) {
    if (dataSt[i].id === idTarget) {
      tmpObject = dataSt[i];
    }
  }

  $('#title_edit').val(tmpObject.name);
  $('#author_edit').val(tmpObject.author);
  $('#year_edit').val(tmpObject.year);
  $('#author_edit').val(tmpObject.author);
  $('#publishingHouse_edit').val(tmpObject.namePublishingHouse);
  $('#qtyOfPages_edit').val(tmpObject.qtyOfPages);
  $('#qtyOfBooks_edit').val(tmpObject.qtyOfBooks);
} // end - get value of book from localstorage in modal-window

//start - edit visitor
function saveEditBook() {
  let name_edit = $('#title_edit');
  let author_edit = $('#author_edit');
  let year_edit = $('#year_edit');
  let publishingHouse_edit = $('#publishingHouse_edit');
  let qtyOfPages_edit = $('#qtyOfPages_edit');
  let qtyOfBooks_edit = $('#qtyOfBooks_edit');

  if (name_edit.val().length === 0) {
    $('#title_edit').css('border', '1px solid red');
    return false;
  } else {
    $('#title_edit').css('border', '1px solid black');
  }

  if (author_edit.val().length === 0) {
    $('#author_edit').css('border', '1px solid red');
    return false;
  } else {
    $('#author_edit').css('border', '1px solid black');
  }

  if (year_edit.val().length === 0) {
    $('#year_edit').css('border', '1px solid red');
    return false;
  } else {
    $('#year_edit').css('border', '1px solid black');
  }

  if (publishingHouse_edit.val().length === 0) {
    $('#publishingHouse_edit').css('border', '1px solid red');
    return false;
  } else {
    $('#publishingHouse_edit').css('border', '1px solid black');
  }

  if (qtyOfPages_edit.val().length === 0) {
    $('#qtyOfPages_edit').css('border', '1px solid red');
    return false;
  } else {
    $('#qtyOfPages_edit').css('border', '1px solid black');
  }

  if (qtyOfBooks_edit.val().length === 0) {
    $('#qtyOfBooks_edit').css('border', '1px solid red');
    return false;
  } else {
    $('#qtyOfBooks_edit').css('border', '1px solid black');
  }

  $('#exampleModalEdit').modal('hide');

  let tmpObj = {
    id: tmpObject.id,
    name: title_edit.val(),
    author: author_edit.val(),
    year: year_edit.val(),
    namePublishingHouse: publishingHouse_edit.val(),
    qtyOfPages: qtyOfPages_edit.val(),
    qtyOfBooks: qtyOfBooks_edit.val(),
    rating: 0,
  };

  let data = JSON.parse(localStorage.getItem('dataOfBooks'));

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === tmpObject.id) {
      if (i > 0) {
        data.splice(i, 1, tmpObj);
      } else if (i === 0) {
        data.shift();
        data.unshift(tmpObj);
      }
    }
  }

  localStorage.setItem('dataOfBooks', JSON.stringify(data));

  getHtml();
} //end - edit book

//start -  delete book
function deleteBook(event) {
  let deleteId = Number(event.target.attributes[2].value);

  let data = JSON.parse(localStorage.getItem('dataOfBooks'));

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === deleteId && data.length !== 1) {
      data.splice(i, 1);
    } else if (data[i].id === deleteId && data.length === 1) {
      data.splice(i, 1);
      let delElement = document.getElementById('table_body');

      while (delElement.firstChild) {
        delElement.removeChild(delElement.firstChild);
      }
    }
  }

  localStorage.setItem('dataOfBooks', JSON.stringify(data));

  getHtml();
} //end - delete book
