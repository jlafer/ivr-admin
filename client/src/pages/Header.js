import React from 'react'
import PropTypes from 'prop-types';

import LoginPaneContainer from './LoginPaneContainer';
import LogoutPane from './LogoutPane';

const Header = (props) => {
  const {auth, attemptLogout, attemptLogin} = props;
  const paneToShow = (auth.isLoggedIn)
    ? <LogoutPane attemptLogout={attemptLogout} auth={auth} />
    : <LoginPaneContainer attemptLogin={attemptLogin}/>;
  return (
    <div className="hdr-container">
      <div className="hdr-left">
        <h2>IVR Administration</h2>
      </div>
      <div className="hdr-right">
        {paneToShow}
      </div>
    </div>
  )
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  attemptLogin: PropTypes.func.isRequired,
  attemptLogout: PropTypes.func.isRequired
};

export default Header;