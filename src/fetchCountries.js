import Notiflix from 'notiflix';

// export { fetchCountries };

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,language`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.failure('Вибачте, збігів немає! Спробуйте ще раз!')
      );
    }
    return response.json();
  });
}
