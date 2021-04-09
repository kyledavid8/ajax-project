function Finder(status) {
  this.status = 'home-page';
}

var holiday = new Finder();

var homePage = document.querySelector('.home-page');
var searchPage = document.querySelector('.search-page');
var resultPage = document.querySelector('.result-page');

var findButton = document.querySelector('.home-search');
var submit = document.querySelector('.submit');
var dataOutline = document.querySelector('.data-outline');
var back = document.querySelector('.back');

var searchBox = document.querySelector('#search-box');

var backHome = ['search-page'];

var main = document.querySelector('main');

Finder.prototype.changePage = function (event) {
  if (event.target === back && holiday.status === 'home-page') {
    return;
  }

  if (event.target === searchBox) {
    return;
  }

  homePage.className = 'home-page hidden';
  searchPage.className = 'search-page hidden';
  resultPage.className = 'result-page hidden';
  if (event.target === findButton) {
    searchPage.className = 'search-page';
    holiday.status = 'search-page';
  } else if (event.target === submit) {
    dataOutline.innerHTML = '';
    holiday.renderResults();
    resultPage.className = 'result-page';
    holiday.status = 'result-page';
  } else if (event.target === back) {
    for (var i = 0; backHome.length > i; i++) {
      if (backHome[i] === holiday.status) {
        homePage.className = 'home-page';
        holiday.status = 'home-page';
      }
    }
    if (holiday.status === 'result-page') {
      searchPage.className = 'search-page';
      holiday.status = 'search-page';
    }
  }
};

Finder.prototype.renderResults = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://holidayapi.com/v1/holidays?pretty&key=c1e47cbf-5b67-44b0-8359-4fe2afc3ae3a&country=US&year=2020');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var i = 0;
    var addy = [];
    while (xhr.response.holidays.length > i) {
      if (searchBox.value === xhr.response.holidays[i].date) {
        addy.push(i);
        i++;
      } else {
        i++;
      }
    }

    if (addy.length !== 0) {
      for (var loc = 0; addy.length > loc; loc++) {
        var data = document.createElement('div');
        data.className = 'data';
        dataOutline.appendChild(data);

        var p = document.createElement('p');
        p.textContent = xhr.response.holidays[addy[loc]].name;
        data.appendChild(p);

        p = document.createElement('p');
        p.textContent = xhr.response.holidays[addy[loc]].date;
        data.appendChild(p);

        p = document.createElement('p');
        p.textContent = xhr.response.holidays[addy[loc]].weekday.date.name;
        data.appendChild(p);

        p = document.createElement('p');
        var pub = '';
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

      var par = document.createElement('p');
      par.textContent = 'This holiday is unavailable';
      data.appendChild(par);

      par = document.createElement('p');
      par.textContent = 'Please try a different date';
      data.appendChild(par);
    }
  });
  xhr.send();
};

main.addEventListener('click', function () {
  holiday.changePage(event);
});
