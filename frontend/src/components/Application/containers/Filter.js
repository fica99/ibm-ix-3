import { connect } from 'react-redux';
import {
	addApplication,
	cleanApplication,
	deleteAllApplications,
	updateInput,
	updatePriority,
	updateDate,
} from '../actions';
import Filter from '../components/Filter';

const mapStateToProps = (state) => ({
  applications: state.applications,
});

const mapDispatchToProps = {
	addApplication,
	cleanApplication,
	deleteAllApplications,
	updateInput,
	updatePriority,
	updateDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
