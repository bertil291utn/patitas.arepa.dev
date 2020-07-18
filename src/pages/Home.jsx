import React from 'react';
import useGetPets from '../hooks/';
import PetItem from '../components/PetItem';
import { Link } from 'react-router-dom';

const API = 'https://us-central1-patitas-7c9bb.cloudfunctions.net/api';

const Home = () => {
  const pets = useGetPets(API);
  console.log("This pets",pets);
  return (
    <div className='Home'>
      <div className='Home-container'>
        <div className='Home-items'>
          {pets.map((pet, index) => (
            <Link
              to={{
                pathname: `/mascotas/${index}-${pet.name}`,
                state: { ...pet },
              }}
            >
              <PetItem pet={pet} key={`pet-${index}`} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
