import React from 'react';
import * as R from 'ramda';

export const getViewFields = (entity, viewName) => {
  const viewFields = entity.views[viewName].fields;
  const fieldNames = viewFields.map(R.prop('name'));
  const fieldDefns = entity.fields.filter(fld => fieldNames.includes(fld.name));
  return R.zipWith(R.mergeRight, fieldDefns, viewFields);
};

export const fieldToFormControl = R.curry((register, errors, field) => {
  const {name, label, required} = field;
  const validationSpec = required ? { required: true } : {};
  const errorMsg = `${label} is required`
  return (
    <label key={name}>
      {label}
      <br />
      <input name={name} defaultValue="" ref={register(validationSpec)} />
      {errors[name] && <span>{errorMsg}</span>}
    </label>
  );
});

export const rcdToListItem = R.curry((viewFields, rcd) => {
  const key = rcd.name;
  const fldNames = viewFields.map(R.prop('name'));
  const str = R.props(fldNames, rcd).join(' ');
  return (
    <li key={key}>
      <a href={str}>{str}</a>
    </li>
  );
});
