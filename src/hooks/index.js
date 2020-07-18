import { useState, useEffect } from 'react';
/**
 * useGetPets
 * *Inside UsseEffect function from react hooks fecth the url
 * *Get the response data as json
 * *Save with setPets state all data
 * @param url API url
 */
const useGetPets = (url) => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPets(data));
  }, []);
  return pets;
};

export default useGetPets;
