import React from 'react';
import moment from 'moment';

const PetItem = (props) => {
  /**
   * * Uses moment library for datetime
   * * Getting how much times has long since the data passed to now (eg. a year ago)
   */
  moment.locale('es');
  const date = moment(props.pet.date, 'YYYYMMDD').fromNow();
  return (
    <div className='Pets'>
      <div
        className='Pets-cover'
        style={{ background: `url(${props.pet.photo})` }}
      >
        <span>{props.pet.type === 'dog' ? '🐶' : '🐱'}</span>
        {props.pet.adopt && <div className='Pets-type'>Adopci&oacute;n</div>}
      </div>
      <div className='Pets-content'>
        <div className='Pets-head'>
          <h2>{props.pet.name}</h2>
          <i>{props.pet.gender === 'male' ? '\u2642' : '\u2640'}</i>
        </div>
        <p>{props.pet.description}</p>
        <div className='Pets-date'>
          <i className='fas fa-calendar-alt' />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default PetItem;
