export const requestMap = () => dispatch => {
	fetch('../data/countries.geojson')
	.then((res) => res.json())
	.then((data) => {
		data.features = data.features.filter(f => f.properties.ISO_A3 !== "-99")
		dispatch({type:'RECIEVE_MAP', payload: data})
	})
	.catch((err) => dispatch({type:'ERROR_MAP', payload: err}))
}

export const requestData = (obj) => dispatch => {
	let url = 'http://127.0.0.1:3001/data?';
	if (obj.category) url += `categories=${obj.category}&`;
	if (obj.year) url += `year=${obj.year}&`;
	fetch(url).then((res) => res.json())
	.then((data) => {
		dispatch({type:'RECIEVE_DATA', payload: data})
		dispatch({type:'UPDATE_COROPLETH', payload: data})
	})
	.catch((err) => dispatch({type:'ERROR_DATA', payload: err}))
}

export const requestCategories = () => dispatch => {
	let url = 'http://127.0.0.1:3001/category' 
	fetch(url).then((res) => res.json())
	.then((data) => dispatch({type:'RECIEVE_CATEGORY', payload: data}))
	.catch((err) => dispatch({type:'ERROR_CATEGORY', payload: err}))
}

export const selectCategory = (val) => dispatch => dispatch({type:'SELECT_CATEGORY', payload: val})
export const unselectCategory = () => dispatch => dispatch({type:'UNSELECT_CATEGORY'})

export const requestYears = () => dispatch => dispatch({type: 'REQUEST_YEARS'})

export const selectYear = (val) => dispatch => dispatch({type:'SELECT_YEAR', payload: val})
export const unselectYear = () => dispatch => dispatch({type:'UNSELECT_YEAR'})


export const requestCriteria = ({criteria}) => dispatch => {
	let url = criteria ? 
			'http://127.0.0.1:3001/criteria' :
			`'http://127.0.0.1:3001/criteria/${criteria}'`

	fetch(url).then((res) => res.json())
	.then((data) => dispatch({type:'RECIEVE_CRITERIA', payload: data}))
	.catch((err) => dispatch({type:'ERROR_CRITERIA', payload: err}))
}
