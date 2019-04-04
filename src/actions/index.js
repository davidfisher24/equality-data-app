import { booleanPointInPolygon as Tinside, point as Tpoint } from '@turf/turf';

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
	let url = `http://127.0.0.1:3001/data?year=${getState().year.selected}`
	if (obj.type !== 'index') {
		url += `&${obj.type}=${
			obj.type === 'categories' ? 
			obj.category :
			obj.criteria
		}`
	}
	fetch(url).then((res) => res.json())
	.then((data) => {
		dispatch({type:'RECIEVE_DATA', payload: data})
		obj.type === 'criteria'  ? 
		dispatch({type:'UPDATE_BOOLEAN_DATA', payload: data}) :
		dispatch({type:'UPDATE_COROPLETH', payload: data})
	})
	.catch((err) => dispatch({type:'ERROR_DATA', payload: err}))
}

export const requestExperiences = () => dispatch => {
	let url = 'http://127.0.0.1:3001/experience';
	fetch(url).then((res) => res.json())
	.then((data) => {
		dispatch({type:'RECIEVE_EXPERIENCE', payload: data})
		dispatch({type:'UPDATE_MARKERS', payload: data})
	})
	.catch((err) => dispatch({type:'ERROR_MARKERS', payload: err}))
}

export const requestExperienceTypes = () => dispatch => {
	let url = 'http://127.0.0.1:3001/experience-type';
	fetch(url).then((res) => res.json())
	.then((data) => {
		dispatch({type:'RECIEVE_EXPERIENCE_TYPES', payload: data})
	})
	.catch((err) => dispatch({type:'ERROR_EXPERIENCE', payload: err}))
}

export const removeExperiences = () => dispatch => {
	dispatch({type:'REMOVE_MARKERS'})
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
}
export const unselectCategory = () => dispatch => dispatch({type:'UNSELECT_CATEGORY'})

export const requestYears = () => dispatch => dispatch({type: 'REQUEST_YEARS'})
export const selectYear = (val) => (dispatch,getState) => {
	dispatch({type:'SELECT_YEAR', payload: val})
}

export const requestCriteria = (obj) => (dispatch) => {
	let url = `http://127.0.0.1:3001/criteria?CategoryId=${obj.category}`
	fetch(url).then((res) => res.json())
	.then((data) => dispatch({type:'RECIEVE_CRITERIA', payload: data}))
	.catch((err) => dispatch({type:'ERROR_CRITERIA', payload: err}))
}
export const selectCriteria = (val) => (dispatch,getState) => {
	dispatch({type:'SELECT_CRITERIA', payload: val})
}
export const unselectCriteria = () => dispatch => dispatch({type:'UNSELECT_CRITERIA'})

export const openModal = (type) => dispatch => dispatch({type:'OPEN_MODAL', payload: type})
export const closeModal = () => dispatch => dispatch({type:'CLOSE_MODAL'})

export const buildExperience = (obj) => dispatch => dispatch({type:'BUILD_EXPERIENCE', payload: obj})
export const emptyExperience = (obj) => dispatch => dispatch({type:'EMPTY_EXPERIENCE'})
export const startAddingExperience = () => dispatch => {
	dispatch({type:'START_ADDING_EXPERIENCE'})
	dispatch({type:'CLOSE_MODAL'})
}

export const submitExperience = (latlng) => (dispatch,getState) => {
	const point = Tpoint([latlng.lat,latlng.lng]);
    let country = getState().map.geojson.features.find(feat => Tinside(point,feat));
    let payload = {
      latitude: latlng.lat,
      longitude: latlng.lng,
    }
    if (country) payload.isocode = country.properties.ISO_A3
	dispatch({type:'ADD_EXPERIENCE_POINT', payload: payload})

	console.log('Submitting')
	console.log(getState().experience.building)
	fetch(`http://127.0.0.1:3001/experience`, {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(getState().experience.building)
	})

	dispatch({type:'STOP_ADDING_EXPERIENCE'})
	dispatch({type:'EMPTY_EXPERIENCE'})
}

export const clearMap = () => dispatch => dispatch({type:'CLEAR_MAP'})
export const openDataDrawer = () => dispatch => dispatch({type: 'OPEN_DATA_DRAWER'})
export const closeDataDrawer = () => dispatch => dispatch({type: 'CLOSE_DATA_DRAWER'})