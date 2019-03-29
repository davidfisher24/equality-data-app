import { combineReducers } from 'redux';

import map from "./mapReducer";
import data from "./dataReducer";
import category from "./categoryReducer";
import criteria from "./criteriaReducer";
import year from "./yearReducer";

export default combineReducers({
 	map,
 	data,
 	category,
 	criteria,
 	year
});