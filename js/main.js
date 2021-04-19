function Finder(status, searchStatus, carouselStatus, carouselStatusOriginal, toggleCounter, dots, alphabetCounter) {
  this.status = 'home-page';
  this.searchStatus = 'date';
  this.carouselStatus = 0;
  this.carouselStatusOriginal = 0;
  this.toggleCounter = 0;
  this.dots = [document.querySelector('.dot-one > i'), document.querySelector('.dot-two > i'), document.querySelector('.dot-three > i'),
    document.querySelector('.dot-four > i'), document.querySelector('.dot-five > i')];
  this.alphabetCounter = 0;
}

var holiday = new Finder();
var d = new Date();

var homePage = document.querySelector('.home-page');
var searchPage = document.querySelector('.search-page');
var resultPage = document.querySelector('.result-page');
var carouselPage = document.querySelector('.carousel-page');
var listPage = document.querySelector('.list-page');

var findButton = document.querySelector('.home-search');
var submit = document.querySelector('.submit');
var switchButton = document.querySelector('.switch');
var dataOutline = document.querySelector('.data-outline');
var back = document.querySelector('.back');
var searchBox = document.querySelector('#search-box');
var inputSearchHeader = document.querySelector('.input-search-header');
var carouselData = document.querySelector('.carousel-data');
var main = document.querySelector('main');
var listContainer = document.querySelector('.list-container');
var listButton = document.querySelector('.home-list');
var listSearch = document.querySelector('.list-search');
var listHoliday = document.querySelector('.list-button');

var carouselButton = document.querySelector('.home-carousel');
var right = document.querySelector('.right');
var left = document.querySelector('.left');

var backHome = ['search-page', 'carousel-page', 'list-page'];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'p', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


Finder.prototype.changePage = function (event) {

  if (event.target !== back && event.target !== findButton && event.target !== carouselButton
    && event.target !== submit && event.target !== listButton && event.target !== listHoliday) {
    return;
  };

  back.classList.remove('hidden');
  homePage.classList.add('hidden');
  searchPage.classList.add('hidden');
  resultPage.classList.add('hidden');
  carouselPage.classList.add('hidden');
  if (event.target === findButton) {
    searchPage.classList.remove('hidden');
    holiday.status = 'search-page';
  } else if (event.target === carouselButton) {
    carouselPage.classList.remove('hidden');
    holiday.status = 'carousel-page';
  } else if (event.target === submit) {
    dataOutline.innerHTML = '';
    holiday.renderResults();
    resultPage.classList.remove('hidden');
    holiday.status = 'result-page';
  } else if(event.target === listButton) {
    holiday.renderList();
    listPage.classList.remove('hidden');
    holiday.status = 'list-page';
  } else if (event.target === back) {
    for (var i = 0; backHome.length > i; i++) {
      if (backHome[i] === holiday.status) {
        listContainer.innerHTML = '';
        homePage.classList.remove('hidden');
        holiday.status = 'home-page';
      }
    }
    if (holiday.status === 'result-page') {
      searchPage.classList.remove('hidden');
      holiday.status = 'search-page';
    }
    if (holiday.status === 'list-search') {
      listSearch.innerHTML = '';
      holiday.renderList();
      holiday.status = 'list-page';
    }
  }
  if (holiday.status === 'home-page') {
    back.classList.add('hidden');
  }
};

Finder.prototype.renderResults = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://holidayapi.com/v1/holidays?pretty&key=c1e47cbf-5b67-44b0-8359-4fe2afc3ae3a&country=US&year=2020');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (holiday.searchStatus === 'name') {
      var addy = 0;
      for (var i = 0; xhr.response.holidays.length > i; i++) {
        if (searchBox.value === xhr.response.holidays[i].name) {
          addy = i;
          break;
        }
      }

      if (addy === 0 && searchBox.value !== "New Year's Day") {
        var data = document.createElement('div');
        data.className = 'data';
        dataOutline.appendChild(data);

        var par = document.createElement('p');
        par.textContent = 'This holiday is unavailable';
        data.appendChild(par);

        par = document.createElement('p');
        par.textContent = 'Please try a different date';
        data.appendChild(par);
      } else {
        data = document.createElement('div');
        data.className = 'data';
        dataOutline.appendChild(data);

        var p = document.createElement('p');
        p.textContent = xhr.response.holidays[addy].name;
        data.appendChild(p);

        p = document.createElement('p');
        p.textContent = xhr.response.holidays[addy].date;
        data.appendChild(p);

        p = document.createElement('p');
        p.textContent = xhr.response.holidays[addy].weekday.date.name;
        data.appendChild(p);

        p = document.createElement('p');
        var pub = '';
        if (xhr.response.holidays[addy].public !== true) {
          pub = 'No';
        } else {
          pub = 'Yes';
        }
        p.textContent = 'Public? ' + pub;
        data.appendChild(p);
      }
    } else {
      addy = [];
      for (i = 0; xhr.response.holidays.length > i; i++) {
        if (searchBox.value === xhr.response.holidays[i].date) {
          addy.push(i);
        }
      }

      if (addy.length !== 0) {
        for (var loc = 0; addy.length > loc; loc++) {
          data = document.createElement('div');
          data.className = 'data';
          dataOutline.appendChild(data);

          p = document.createElement('p');
          p.textContent = xhr.response.holidays[addy[loc]].name;
          data.appendChild(p);

          p = document.createElement('p');
          p.textContent = xhr.response.holidays[addy[loc]].date;
          data.appendChild(p);

          p = document.createElement('p');
          p.textContent = xhr.response.holidays[addy[loc]].weekday.date.name;
          data.appendChild(p);

          p = document.createElement('p');
          pub = '';
          if (xhr.response.holidays[addy[loc]].public !== true) {
            pub = 'No';
          } else {
            pub = 'Yes';
          }
          p.textContent = 'Public? ' + pub;
          data.appendChild(p);
        }
      } else {
        data = document.createElement('div');
        data.className = 'data';
        dataOutline.appendChild(data);

        par = document.createElement('p');
        par.textContent = 'This holiday is unavailable';
        data.appendChild(par);

        par = document.createElement('p');
        par.textContent = 'Please try a different date';
        data.appendChild(par);
      }
    }
  });
  xhr.send();
};

Finder.prototype.upcomingHoliday = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://holidayapi.com/v1/holidays?pretty&key=c1e47cbf-5b67-44b0-8359-4fe2afc3ae3a&country=US&year=2020');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var monthString = d.getMonth() + 1;
    monthString = monthString.toString();
    var dayString = d.getDate();
    dayString = dayString.toString();

    for (var i = 0; xhr.response.holidays.length > i; i++) {
      var holidayDate = xhr.response.holidays[i].date.split('-');
      var singleMonth = holidayDate[1].split('');
      var singleDay = holidayDate[2].split('');

      if (singleMonth[0] === '0') {
        if (singleMonth[1] === monthString) {
          if (singleDay[0] === '0') {
            if ((singleDay[1] - dayString) > 0 || singleDay[1] === dayString) {
              holiday.carouselStatus = i;
              holiday.carouselStatusOriginal = i;
              break;
            }
          } else {
            if ((holidayDate[2] - dayString) > 0 || holidayDate[2] === dayString) {
              holiday.carouselStatus = i;
              holiday.carouselStatusOriginal = i;
              break;
            }
          }
        }
      } else {
        if (holidayDate[1] === monthString) {
          if (singleDay[0] === '0') {
            if ((singleDay[1] - dayString) > 0 || singleDay[1] === dayString) {
              holiday.carouselStatus = i;
              holiday.carouselStatusOriginal = i;
              break;
            }
          } else {
            if ((holidayDate[2] - dayString) > 0 || holidayDate[2] === dayString) {
              holiday.carouselStatus = i;
              holiday.carouselStatusOriginal = i;
              break;
            }
          }
        }
      }
    };
  });
  xhr.send();
}

Finder.prototype.renderCarouselData = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://holidayapi.com/v1/holidays?pretty&key=c1e47cbf-5b67-44b0-8359-4fe2afc3ae3a&country=US&year=2020');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    carouselData.innerHTML = '';

    var p = document.createElement('p');
    p.textContent = xhr.response.holidays[holiday.carouselStatus].name;
    carouselData.appendChild(p);

    p = document.createElement('p');
    p.textContent = xhr.response.holidays[holiday.carouselStatus].date;
    carouselData.appendChild(p);

    p = document.createElement('p');
    p.textContent = xhr.response.holidays[holiday.carouselStatus].weekday.date.name;
    carouselData.appendChild(p);

    p = document.createElement('p');
    var pub = '';
    if (xhr.response.holidays[holiday.carouselStatus].public !== true) {
      pub = 'No';
    } else {
      pub = 'Yes';
    }
    p.textContent = 'Public? ' + pub;
    carouselData.appendChild(p);
  });
  xhr.send();
};

Finder.prototype.toggleCarousel = function (event) {
  if (event.target === right) {
    holiday.carouselStatus++;
    holiday.toggleCounter++;
    holiday.dots[holiday.toggleCounter - 1].classList.remove('fas');
    holiday.dots[holiday.toggleCounter - 1].classList.add('far');
    if (holiday.carouselStatus === (holiday.carouselStatusOriginal + 5)) {
      holiday.carouselStatus = holiday.carouselStatusOriginal;
      holiday.toggleCounter = 0;
      holiday.dots[4].classList.remove('fas');
      holiday.dots[4].classList.add('far');
    }
  } else if (event.target === left) {
    holiday.carouselStatus--;
    holiday.toggleCounter--;
    holiday.dots[holiday.toggleCounter + 1].classList.remove('fas');
    holiday.dots[holiday.toggleCounter + 1].classList.add('far');
    if (holiday.carouselStatus === (holiday.carouselStatusOriginal - 1)) {
      holiday.carouselStatus = holiday.carouselStatusOriginal + 4;
      holiday.toggleCounter = 4
      holiday.dots[0].classList.remove('fas');
      holiday.dots[0].classList.add('far');
    }
  }

  holiday.dots[holiday.toggleCounter].className = 'fas fa-circle';
  holiday.renderCarouselData();
};

Finder.prototype.switch = function () {
  if (holiday.searchStatus === 'name') {
    holiday.searchStatus = 'date';
    switchButton.textContent = 'Search by Name';
    inputSearchHeader.textContent = 'Search by Date';
    searchBox.type = 'date';
    searchBox.placeholder = '';
  } else {
    holiday.searchStatus = 'name';
    searchBox.value = '';
    switchButton.textContent = 'Search by Date';
    inputSearchHeader.textContent = 'Search by Name';
    searchBox.type = 'text';
    searchBox.placeholder = 'Holiday Name Here';
    searchBox.style.width = '67%';
  }
};

Finder.prototype.carouselRight = function() {
  holiday.carouselStatus++;
  holiday.toggleCounter++;
  holiday.dots[holiday.toggleCounter - 1].classList.remove('fas');
  holiday.dots[holiday.toggleCounter - 1].classList.add('far');
  if (holiday.carouselStatus === (holiday.carouselStatusOriginal + 5)) {
    holiday.carouselStatus = holiday.carouselStatusOriginal;
    holiday.toggleCounter = 0;
    holiday.dots[4].classList.remove('fas');
    holiday.dots[4].classList.add('far');
  }
  holiday.dots[holiday.toggleCounter].className = 'fas fa-circle';
  holiday.renderCarouselData();
}

Finder.prototype.renderList = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://holidayapi.com/v1/holidays?pretty&key=c1e47cbf-5b67-44b0-8359-4fe2afc3ae3a&country=US&year=2020');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var addy = [];

    for(var alphabetCounter = 0; alphabet.length > alphabetCounter; alphabetCounter++) {
      addy = [];

      var con = document.createElement('div');
      con.className = 'section-container';
      listContainer.appendChild(con);

      var p = document.createElement('p');
      p.textContent = alphabet[alphabetCounter];
      con.appendChild(p);

      for (var i = 0; xhr.response.holidays.length > i; i++) {
        var firstLetter = xhr.response.holidays[i].name.split('');
        if (firstLetter[0] === alphabet[alphabetCounter]) {
          addy.push(i);
        }
      }

      if(addy.length === 0) {
        var but = document.createElement('button');
        but.setAttribute('type', 'button');
        but.textContent = 'NONE';
        con.appendChild(but);
        } else {
          for (var renderCounter = 0; addy.length > renderCounter; renderCounter++) {
            but = document.createElement('button');
            but.className = 'list-button';
            but.setAttribute('type', 'button');
            but.textContent = xhr.response.holidays[addy[renderCounter]].name;
            con.appendChild(but);
          }
        }
      }
  });
  xhr.send();
}

Finder.prototype.listSearch = function(event) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://holidayapi.com/v1/holidays?pretty&key=c1e47cbf-5b67-44b0-8359-4fe2afc3ae3a&country=US&year=2020');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (event.target.className === 'list-button') {
      var addy = 0;
      for (var i = 0; xhr.response.holidays.length > i; i++) {
        if(event.target.textContent === xhr.response.holidays[i].name) {
          addy = i;
          break;
        }
      }


      var data = document.createElement('div');
      data.className = 'data';
      listSearch.appendChild(data);

      var p = document.createElement('p');
      p.textContent = xhr.response.holidays[addy].name;
      data.appendChild(p);

      p = document.createElement('p');
      p.textContent = xhr.response.holidays[addy].date;
      data.appendChild(p);

      p = document.createElement('p');
      p.textContent = xhr.response.holidays[addy].weekday.date.name;
      data.appendChild(p);

      p = document.createElement('p');
      var pub = '';
      if (xhr.response.holidays[addy].public !== true) {
        pub = 'No';
      } else {
        pub = 'Yes';
      }
      p.textContent = 'Public? ' + pub;
      data.appendChild(p);
    }
  });
  xhr.send();
}

main.addEventListener('click', function () {
  holiday.changePage(event);
});

switchButton.addEventListener('click', function () {
  holiday.switch();
});

carouselButton.addEventListener('click', function () {
  holiday.upcomingHoliday();
  holiday.renderCarouselData();
  var int = setInterval(function () {
    holiday.carouselRight();
  }, 3000);
});

carouselPage.addEventListener('click', function () {
  clearInterval(int);
  holiday.toggleCarousel(event);
  int = setInterval(function () {
    holiday.carouselRight();
  }, 3000);
});

listContainer.addEventListener('click', function() {
  listContainer.innerHTML = '';
  holiday.listSearch(event);
  holiday.status = 'list-search'
});
