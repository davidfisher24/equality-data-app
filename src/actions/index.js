export const requestMap = () => dispatch => {
	fetch('../data/countries.geojson')
	.then((res) => res.json())
	.then((data) => {
		data.features = data.features.filter(f => f.properties.ISO_A3 !== "-99")
		dispatch({type:'RECIEVE_MAP', payload: data})
	})
	.catch((err) => dispatch({type:'ERROR_MAP', payload: err}))
}

export const requestData = (obj) => (dispatch,getState) => {
	let url = 'http://127.0.0.1:3001/data?';
	url += `${obj.type}=${
		obj.type === 'categories' ? 
		obj.category :
		obj.criteria
	}&year=${obj.year}`;
	fetch(url).then((res) => res.json())
	.then((data) => {
		dispatch({type:'RECIEVE_DATA', payload: data})
		obj.type === 'categories' ? 
		dispatch({type:'UPDATE_COROPLETH', payload: data}) :
		dispatch({type:'UPDATE_BOOLEAN_DATA', payload: data})
	})
	.catch((err) => dispatch({type:'ERROR_DATA', payload: err}))
}

export const requestExperiences = () => dispatch => {
	let url = 'http://127.0.0.1:3001/experience';
	fetch(url).then((res) => res.json())
	.then((data) => {
		dispatch({type:'RECIEVE_EXPERIENCES', payload: data})
		dispatch({type:'UPDATE_MARKERS', payload: data})
	})
	.catch((err) => dispatch({type:'ERROR_MARKERS', payload: err}))
}

export const requestCategories = () => dispatch => {
	let url = 'http://127.0.0.1:3001/category' 
	fetch(url).then((res) => res.json())
	.then((data) => dispatch({type:'RECIEVE_CATEGORY', payload: data}))
	.catch((err) => dispatch({type:'ERROR_CATEGORY', payload: err}))
}
export const selectCategory = (val) => (dispatch,getState) => {
	dispatch({type:'SELECT_CATEGORY', payload: val})
	dispatch({type:'UNSELECT_CRITERIA', payload: val})
	dispatch({type:'EMPTY_CRITERIA'})
	dispatch(requestData({
		type: 'categories',
		category: val,
		year: getState().year.selected
	}))
}
export const unselectCategory = () => dispatch => dispatch({type:'UNSELECT_CATEGORY'})

export const requestYears = () => dispatch => dispatch({type: 'REQUEST_YEARS'})
export const selectYear = (val) => (dispatch,getState) => {
	dispatch({type:'SELECT_YEAR', payload: val})

	if (getState().map.displayed === 'coropleth') dispatch(requestData({
		type: 'categories',
		category: getState().category.selected,
		year: val,
	}))

	if (getState().map.displayed === 'boolean') dispatch(requestData({
		type: 'criteria',
		criteria: getState().criteria.selected,
		year: val,
	}))
}

export const requestCriteria = (obj) => (dispatch) => {
	let url = `http://127.0.0.1:3001/criteria?CategoryId=${obj.category}`
	fetch(url).then((res) => res.json())
	.then((data) => dispatch({type:'RECIEVE_CRITERIA', payload: data}))
	.catch((err) => dispatch({type:'ERROR_CRITERIA', payload: err}))
}
export const selectCriteria = (val) => (dispatch,getState) => {
	dispatch({type:'SELECT_CRITERIA', payload: val})
	dispatch(requestData({
		type: 'criteria',
		criteria: val,
		year: getState().year.selected
	}))
}
export const unselectCriteria = () => dispatch => dispatch({type:'UNSELECT_CRITERIA'})

