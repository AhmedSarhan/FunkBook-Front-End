import React from 'react';
import UnAuthenticated from '../components/auth/UnAuthenticated';
import Page from '../components/HOC/Page';

const Guest = () => {
  return (
    <Page title="Welcome">
      <UnAuthenticated />
    </Page>
  );
};

export default Guest;
