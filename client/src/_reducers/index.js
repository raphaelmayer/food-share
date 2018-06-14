import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';

import { auth } from './auth.reducer';
import { client } from './client.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
	auth,
	client,
	alert
})

export default rootReducer;