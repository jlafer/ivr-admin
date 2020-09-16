import { connect } from 'react-redux';

import {OrganizationsList} from './OrganizationsList';
import {getOrganizations} from '../redux/actions/data';

const mapStateToProps = (state) => ({
    auth: state.auth,
    organizations: state.data.organizations
});

const mapDispatchToProps = {getOrganizations};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsList);
