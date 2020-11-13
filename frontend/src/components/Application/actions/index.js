import * as types from '../constants/ActionTypes';

export const addApplication = (initValue) => ({
	type: types.ADD_APPLICATION,
	payload: initValue,
});

export const cleanApplication = (id) => ({
	type: types.CLEAN_APPLICATION,
	payload: id,
});

export const deleteAllApplications = () => ({
	type: types.DELETE_ALL_APPLICATIONS,
});

export const updateInput = (name, value, id) => ({
	type: types.UPDATE_INPUT,
	payload: {
		name,
		value,
		id,
	}
});

export const updatePriority = (name, value, id) => ({
	type: types.UPDATE_PRIORITY,
	payload: {
		name,
		value,
		id,
	}
});

export const updateDate = (name, value, id) => ({
	type: types.UPDATE_DATE,
	payload: {
		name,
		value,
		id,
	}
});
