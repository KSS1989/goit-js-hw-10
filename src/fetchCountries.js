const BASE_URL = 'https://restcountries.com/v3.1';
const fields = 'fields=name,capital,languages,population,flags';

export const fetchCountries = async name => {
  const response = await fetch(`${BASE_URL}/name/${name}?${fields}`);
  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error(response.status);
  }
  return response.json();
};
