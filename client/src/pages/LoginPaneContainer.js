import {connect} from 'react-redux'
import {attemptLogin, attemptLogout} from '../redux/actions/auth';
import LoginPane from './LoginPane';

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  attemptLogin,
  attemptLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPane);
