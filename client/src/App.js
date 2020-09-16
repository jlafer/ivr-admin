import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import './App.css';
import HeaderContainer from './pages/HeaderContainer';
import Main from './pages/Main';
import Footer from './pages/Footer';
import SignedOutPane from './pages/SignedOutPane';

const App = (props) => {
  let center = props.auth.isLoggedIn ? <Main /> : <SignedOutPane />;
  return (
    <div className="page">
			<div className="header">
  			<HeaderContainer />
      </div>
			<div className="content">
        {center}
      </div>
			<Footer className="footer" />
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  auth: PropTypes.object.isRequired,
}
