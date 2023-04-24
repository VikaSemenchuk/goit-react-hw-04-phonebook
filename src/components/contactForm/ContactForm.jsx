import { useState } from 'react';

import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default function ContactForm({ addNewContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid();
  const numberId = nanoid();
  const formInfo = { name, number };

  const handleNameChange = ({ currentTarget: { name, value } }) => {
    setName(() => value);
  };

  const handleNumberChange = ({ currentTarget: { name, value } }) => {
    setNumber(() => value);
  };

  const reset = () => {
    setName(() => '');
    setNumber(() => '');
  };

  const handleSubmit = e => {
    e.preventDefault();
    addNewContact(formInfo);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor={nameId} className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id={nameId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={numberId} className="form-label">
          Number
        </label>
        <input
          type="tel"
          name="number"
          className="form-control"
          id={numberId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleNumberChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};
