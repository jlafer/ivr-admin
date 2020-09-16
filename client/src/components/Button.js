import React from 'react';
import PropTypes from 'prop-types';
//import { Button } from '@material-ui/core';

import {joinStr} from '../util/stringUtil';

//TODO change to use material button
//return <Button color="primary">Hello World</Button>;

const Button = ({name, onClick, otherClasses, disabled, value, ...other}) => {
	const btnProps = {type: "button"};
	btnProps.className = joinStr('btn', otherClasses);
	btnProps.name = name ? name : undefined;
	btnProps.value = value ? value : undefined;
	btnProps.disabled = disabled ? true : false;
	return (
		<button onClick={onClick} {...btnProps} {...other} />
	);
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	otherClasses: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	disabled: PropTypes.bool
};

export default Button;
