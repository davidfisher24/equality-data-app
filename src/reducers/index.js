import { combineReducers } from 'redux';

import map from "./mapReducer";
import data from "./dataReducer";

export default combineReducers({
 	map,
 	data
});