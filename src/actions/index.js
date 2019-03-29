export const requestMap = () => dispatch => {
	fetch('../data/countries.geojson')
	.then((res) => res.json())
	.then((data) => dispatch({type:'RECIEVE_MAP', payload: data}))
	.catch((err) => dispatch({type:'ERROR_MAP', payload: err}))
}

export const requestData = () => dispatch => {
	fetch('http://127.0.0.1:3001/data?categories=1&year=2018')
	.then((res) => res.json())
	.then((data) => dispatch({type:'RECIEVE_DATA', payload: data}))
	.catch((err) => dispatch({type:'ERROR_DATA', payload: err}))
}