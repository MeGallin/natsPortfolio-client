import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { fetchContactsInfo } from '../state/contactsInfoSlice';
import './ContactsInformation.css';
import Spinner from './common/Spinner';
import moment from 'moment';
// MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

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
          <Typography variant="h6" gutterBottom>
            Contact Form Information
          </Typography>
          {contacts?.map((contact) => (
            <div key={contact._id}>
              <Box
                my={1}
                mx={1}
                px={1}
                py={0.5}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  height: '100%',
                  border: `1px solid lightGrey`,
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={1}>
                    <Typography variant="subtitle1" gutterBottom>
                      <Typography variant="body2" gutterBottom>
                        <p>
                          <strong>From:</strong> {contact.name}
                        </p>
                      </Typography>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      <Typography variant="body2" gutterBottom>
                        <p>
                          <strong>Email:</strong> {contact.email}
                        </p>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7}>
                    <div className="bg-colour-white">
                      <Typography variant="subtitle1" gutterBottom>
                        <Typography variant="body1" gutterBottom>
                          <p>
                            {' '}
                            <strong>Message:</strong> {contact.message}
                          </p>
                        </Typography>
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      <Typography variant="body2" gutterBottom>
                        <p>
                          <strong>Received:</strong>
                          {moment(contact.createdAt).format(
                            'Do MMMM YYYY, h:mm a',
                          )}
                        </p>
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsInformation;
