'use strict';

const input = document.querySelector('.input-country ');
const countriesContainer = document.querySelector('.countries');
const searchBtn = document.querySelector('.searchBtn');

const getCountries = country => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  const renderCountry = (data, className = '') => {
    const html = `        <article class="${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  };

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    const [neighbour] = data.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
searchBtn.addEventListener('click', function () {
  const country = input.value.trim();
  input !== '' ? getCountries(country) : alert('Please enter a country name.');
});

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const country = input.value.trim();
    input !== ''
      ? getCountries(country)
      : alert('Please enter a country name.');
  }
});
