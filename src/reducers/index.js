import { combineReducers } from 'redux';

import map from "./mapReducer";
import data from "./dataReducer";
import category from "./categoryReducer";
import criteria from "./criteriaReducer";
import year from "./yearReducer";
import experience from "./experienceReducer";
import modal from './modalReducer';

export default combineReducers({
 	map,
 	data,
 	category,
 	criteria,
 	year,
 	experience,
 	modal
});