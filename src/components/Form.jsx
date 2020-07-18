import React, { useState } from 'react';
import { connect } from 'react-redux';
import { storage, database } from '../utils/firebase';

const Form = (props) => {
  const [petPhoto, setPetPhoto] = useState('');
  const [sendForm, setSendForm] = useState(false);

  /**
   * onChange
   * * Name variable = parse the date to int and concat with the file name
   * *Save in storage ref function child used to pass name and put the file
   * *Checks uploaded file from snapshot.ref getting the downloaded url to save in database
   * @param event From the image input
   */

  const onChange = (event) => {
    const file = event.target.files[0];
    const name = +new Date() + '-' + file.name;
    const storageRef = storage.ref();
    const uploadFile = storageRef.child(name).put(file);

    uploadFile.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((downloadUrl) => setPetPhoto(downloadUrl));
    });
  };

  /**
   * handleSubmit
   * *Avoiding propagation and reload web page and also dont sent data through url
   * *Getting form values
   * *Creating a new object in data variable, also assigning petphoto state in photo variable
   * *Saving in database push
   * *Saving in firebase database
   * @param event Get the event form the HTMLform
   */

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const newDate = new Date().toISOString();

    const data = {
      adopt: form.get('adopt') == 'true' ? true : false,
      date: newDate,
      description: form.get('description'),
      gender: form.get('gender'),
      name: form.get('name'),
      photo: petPhoto,
      profilePic: props.user.photoURL,
      type: form.get('type'),
      userContact: props.user.email,
      userName: props.user.displayName,
    };

    database
      .ref('/pets')
      .push(data)
      .then(() => setSendForm(true))
      .catch(() => setSendForm(false));
  };

  /**
   * Validations
   * *If sendform is true show save message and hide form
   */
  return (
    <div className='Form'>
      <div className='Form-head'>
        <h2>Dar en adopcion</h2>
      </div>
      {sendForm && (
        <div className='Form-send'>
          <span>Guardado con exito!</span>
        </div>
      )}

      {!sendForm && (
        <div className='Form-item'>
          <form onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='Nombre de tu mascota' />
            <input
              type='text'
              name='description'
              placeholder='Describe tu mascota'
            />
            <select name='type'>
              <option disabled selected>
                Selecionar
              </option>
              <option value='cat'>Gato</option>
              <option value='dog'>Perro</option>
            </select>

            <select name='gender'>
              <option disabled selected>
                Selecionar
              </option>
              <option value='male'>Masculino</option>
              <option value='female'>Femenino</option>
            </select>

            <select name='adopt'>
              <option disabled selected>
                Selecionar
              </option>
              <option value='true'>Dar en adopcion</option>
              <option value='false'>Cuidar</option>
            </select>
            <input type='file' onChange={onChange} name='photo' />
            <button>Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Form);
