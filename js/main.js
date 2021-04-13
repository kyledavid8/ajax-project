function Finder(status, searchStatus) {
  this.status = 'home-page';
  this.searchStatus = 'date';
}

var holiday = new Finder();

var homePage = document.querySelector('.home-page');
var searchPage = document.querySelector('.search-page');
var resultPage = document.querySelector('.result-page');

var findButton = document.querySelector('.home-search');
var submit = document.querySelector('.submit');
var switchButton = document.querySelector('.switch');
var switchSubmitContainer = document.querySelector('.switch-submit');
var dataOutline = document.querySelector('.data-outline');
var back = document.querySelector('.back');
var searchBox = document.querySelector('#search-box');
var inputSearchHeader = document.querySelector('.input-search-header');
var main = document.querySelector('main');

var backHome = ['search-page'];

Finder.prototype.changePage = function (event) {
  if (event.target === searchBox || event.target === switchButton || event.target === switchSubmitContainer) {
    return;
  }

  back.classList.remove('hidden');
  homePage.classList.add('hidden');
  searchPage.classList.add('hidden');
  resultPage.classList.add('hidden');
  if (event.target === findButton) {
    searchPage.classList.remove('hidden');
    holiday.status = 'search-page';
  } else if (event.target === submit) {
    dataOutline.innerHTML = '';
    holiday.renderResults();
    resultPage.classList.remove('hidden');
    holiday.status = 'result-page';
  } else if (event.target === back) {
    for (var i = 0; backHome.length > i; i++) {
      if (backHome[i] === holiday.status) {
        homePage.classList.remove('hidden');
        holiday.status = 'home-page';
      }
    }
    if (holiday.status === 'result-page') {
      searchPage.classList.remove('hidden');
      holiday.status = 'search-page';
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

main.addEventListener('click', function () {
  holiday.changePage(event);
});

switchButton.addEventListener('click', function () {
  holiday.switch();
});
