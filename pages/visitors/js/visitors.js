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
    name: ' Jeeves and Wooster stories',
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
  let objData = JSON.parse(localStorage.getItem('data'));

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
        .attr('onclick', 'editVisitor(event)')
        .attr('key', `${objData[i].id}`)
    );

    let createTdRemove = document.createElement('td');
    $(createTr).append(
      $(createTdRemove)
        .addClass('remove')
        .html(
          `<img src="https://www.iconfinder.com/data/icons/flat-icons-web/40/Remove-512.png" alt="edit" key=${objData[i].id}>`
        )
        .attr('onclick', 'deleteVisitor(event)')
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

// start - add new visitor
function saveVisitor() {
  let nameUser = $('#name');
  let phoneUser = $('#phone');

  if (nameUser.val().length === 0) {
    $('#name').css('border', '1px solid red');
    return false;
  } else {
    $('#name').css('border', '1px solid black');
  }

  if (phoneUser.val().length === 0) {
    $('#phone').css('border', '1px solid red');
    return false;
  } else {
    $('#phone').css('border', '1px solid black');
  }

  let tempObj = JSON.parse(localStorage.getItem('data'));

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
    name: nameUser.val(),
    phone: phoneUser.val(),
    rating: 0,
  };

  tempObj.push(tmp);

  localStorage.setItem('data', JSON.stringify(tempObj));

  $('#exampleModal').modal('hide');

  getHtml();

  tmp = {};
}
// end - add new visitor

// start - get value of one visitour from localstorage in modal-window

let tmpObject;

function editVisitor(event) {
  let idTarget = Number(event.target.attributes[4].value);

  let dataSt = JSON.parse(localStorage.getItem('data'));

  for (let i = 0; i < dataSt.length; i++) {
    if (dataSt[i].id === idTarget) {
      tmpObject = dataSt[i];
    }
  }

  $('#name_edit').val(tmpObject.name);
  $('#phone_edit').val(tmpObject.phone);
} // end - get value of one visitour from localstorage in modal-window

//start - edit visitor
function saveEditVisitor() {
  let nameUserEdit = $('#name_edit');
  let phoneUserEdit = $('#phone_edit');

  if (nameUserEdit.val().length === 0) {
    $('#name_edit').css('border', '1px solid red');
    return false;
  } else {
    $('#name_edit').css('border', '1px solid black');
  }

  if (phoneUserEdit.val().length === 0) {
    $('#phone_edit').css('border', '1px solid red');
    return false;
  } else {
    $('#phone_edit').css('border', '1px solid black');
  }

  $('#exampleModalEdit').modal('hide');

  let tmpObj = {
    id: tmpObject.id,
    name: nameUserEdit.val(),
    phone: Number(phoneUserEdit.val()),
    rating: tmpObject.rating,
  };

  let data = JSON.parse(localStorage.getItem('data'));

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

  localStorage.setItem('data', JSON.stringify(data));

  getHtml();
} //end - edit visitor

//start - edit visitor
function deleteVisitor() {
  let deleteId = Number(event.target.attributes[2].value);

  let data = JSON.parse(localStorage.getItem('data'));

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

  localStorage.setItem('data', JSON.stringify(data));

  getHtml();
} //delete - edit visitor
