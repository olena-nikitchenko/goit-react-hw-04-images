import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [inputData, setInputData] = useState('');

  const onChangeInput = e => {
    setInputData(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    }
    onSubmit(inputData);
    setInputData(prevInputData => prevInputData);
  };

  return (
    <header className={css.Header}>
      <form className={css.Form} onSubmit={handleSubmit}>
        <button type="submit" className={css.Button}>
          <ImSearch size={25} fill={'var( --bg-text-primary-color)'} />
        </button>

        <input
          className={css.Input}
          name="inputData"
          value={inputData}
          onChange={onChangeInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
