import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './contactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';

export const App = () => {

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermine Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function addNewContact(data) {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim()
      )
    ) {
      alert(`Contact ${newContact.name} is already exists!`);
      return;
    }

    setContacts(prev => [...prev, newContact]);
  }

  function getFilteredContacts() {
    const normalizedContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedContact)
    );
  }

  function onChangeFilter({ currentTarget: { value } }) {
    setFilter(value);
  }

  function deleteContact(contactId) {
    setContacts(prev => prev.filter(({ id }) => id !== contactId));
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Phonebook</h1>
          <ContactForm addNewContact={addNewContact} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="title">Contacts</h2>

          {contacts.length !== 0 ? (
            <>
              <Filter filter={filter} onChangeFilter={onChangeFilter} />
              <ContactList
                contacts={getFilteredContacts()}
                deleteContact={deleteContact}
              />
            </>
          ) : (
            <>
              <h5>You still haven't any contacts</h5>
            </>
          )}
        </div>
      </section>
    </>
  );
};
