import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form";
//import TextField from "@material-ui/core/TextField";
import User from '../schema/user';
import {getViewFields, fieldToFormControl} from '../schema/util';

function LoginPane(props) {
  const { register, handleSubmit, errors } = useForm();

  function onSubmitForm(formData) {
    const {username, password} = formData;
    props.attemptLogin(username, password);
  }

  const viewFields = getViewFields(User, 'login');
  const formControls = viewFields.map(fieldToFormControl(register, errors));
  
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {formControls}
      <input type="submit" />
    </form>
  );
}

LoginPane.propTypes = {
	attemptLogin: PropTypes.func.isRequired
};

export default LoginPane;