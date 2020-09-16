import {connect} from 'react-redux'
import {attemptLogin, attemptLogout} from '../redux/actions/auth';
import Header from '../pages/Header';

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  attemptLogin,
  attemptLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
