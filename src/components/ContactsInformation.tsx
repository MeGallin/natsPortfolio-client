import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { fetchContactsInfo } from '../state/contactsInfoSlice';
import './ContactsInformation.css';
import Spinner from './common/Spinner';

const ContactsInformation = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { contacts, status, error } = useSelector(
    (state: RootState) => state.contacts,
  );

  useEffect(() => {
    dispatch(fetchContactsInfo());
  }, [dispatch]);

  return (
    <div className="contacts-info-wrapper">
      {status === 'loading' && <Spinner />}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <div>
          <h3>Contact Form Info</h3>
          {contacts?.map((contact) => (
            <div key={contact._id}>
              <div>{contact.name}</div>
              <div>{contact.email}</div>
              <div>{contact.message}</div>
              <div>{contact.createdAt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsInformation;
