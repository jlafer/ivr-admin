import React from 'react';
import PropTypes from 'prop-types';

import {joinStr} from '../util/stringUtil';

const InputText = (
	{
		id, label, value, onChange, txtType = 'text', name, placeholder = '',
		otherClasses = '', otherLabelClasses = '', otherInputClasses = ''
	}
) => {
	let grpClasses = joinStr('form-group', otherClasses);
	let labelClasses = joinStr(null, otherLabelClasses);
	let inputClasses = joinStr('form-control', otherInputClasses);
	return (
		<div className={grpClasses}>
			<label htmlFor={id} className={labelClasses}>{label}</label>
			<input type={txtType} id={id} name={name} value={value}
				className={inputClasses} onChange={onChange} placeholder={placeholder}/>
		</div>
	);
};

InputText.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	txtType: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	otherClasses: PropTypes.string,
	otherLabelClasses: PropTypes.string,
	otherInputClasses: PropTypes.string
};

export default InputText;
