import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from '../pages/Login';

const PetInfo = (props) => {
  const [adopt, setAdopt] = useState(false);
  return (
    <div className='PetInfo'>
      <div className='PetInfo-container'>
        <div className='PetInfo-content'>
          <div className='PetInfo-avatar'>
            <img src={props.pet.photo} alt={props.pet.name} />
          </div>
          <div className='PetInfo-profile'>
            <h2>{props.pet.name}</h2>
            <span>{props.pet.type === 'dog' ? '🐶' : '🐱'}</span>
            <p>
              {props.pet.description}
              <i>{props.pet.gender === 'male' ? '\u2642' : '\u2640'}</i>
            </p>

            <div className='PetInfo-type'>
              <button className='PetInfo-btn' onClick={() => setAdopt(!adopt)}>
                Adoptar
              </button>
            </div>
            <div className='PetInfo-profile-adopt'>
              {adopt && (
                <div>
                  {props.login ? (
                    <div className='PetInfo-item'>
                      <h3>Datos de contacto:</h3>
                      <img
                        src={props.pet.profilePic}
                        alt={props.pet.userName}
                      />
                      <span>Dueno:</span>
                      <h4>{props.pet.userName}</h4>
                      <span>Correo:</span>
                      <h4>{props.pet.userContact}</h4>
                    </div>
                  ) : (
                    <Login />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(PetInfo);
