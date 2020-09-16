import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import Organization from '../schema/organization';
import IsLoading from '../components/IsLoading';
import {getViewFields, rcdToListItem} from '../schema/util';

export function OrganizationsList(props) {
  useEffect(
    () => { getOrganizations() },
    []
  );
  const {auth, getOrganizations, organizations} = props;
  const {isLoading, items, errorMessage} = organizations;
  if (isLoading)
    return (<IsLoading />);

  const viewFields = getViewFields(Organization, 'list');
  console.log('viewFields: ', viewFields);
  const listItems = organizations.items.map(rcdToListItem(viewFields));

  return (
    <ul>
      {listItems}
    </ul>
  );
}

OrganizationsList.propTypes = {
  auth: PropTypes.object.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.object.isRequired
};
