import React from 'react'
import PropTypes from 'prop-types';

import Button from '../components/Button';

const LogoutPane = (props) => {
	const {auth, attemptLogout} = props;

	const handleClick = (event) => {
		event.preventDefault();
		attemptLogout(auth.user.username);
	}

	const height60 = {height: '60%'};
	const height40 = {height: '40%'};
	let greeting = auth.user.email;
	let logoutTxt = 'Logout';
	return (
		<div >
			<form className="form-horizontal">
				<div className="form-group p-2" style={height60}>
					<div className="col-sm-12">
						<label>Welcome {greeting}</label>
					</div>
				</div>
				<div className="form-group p-2" style={height40}>
					<div className="col-sm-offset-6 col-sm-6">
						<Button name="logout" onClick={handleClick} otherClasses="btn-primary">
							{logoutTxt}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

LogoutPane.propTypes = {
	auth: PropTypes.object.isRequired,
	attemptLogout: PropTypes.func.isRequired
};

export default LogoutPane;