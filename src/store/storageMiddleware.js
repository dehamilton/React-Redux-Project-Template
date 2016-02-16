import { FORMS_FORM_EDITOR_FORMS_REGISTERED_TRIGGER } from '../actions/actionConstants';
import { registerFormsOpen } from '../actions/';
import { pluck, indexOf } from 'lodash';
import browserStorage from '../utils/storage';

const storageMiddleware = store => next => action => {
	let result = next(action);
	
	let formsObject = browserStorage.getJson('forms');
	if (action.type === FORMS_FORM_EDITOR_FORMS_REGISTERED_TRIGGER) {
		if (formsObject !== null) {
			let forms = formsObject.formsSelected;
			store.dispatch(registerFormsOpen(forms));
		}
    
    formsObject = { formsSelected: [] }; // clear out when finished
	}
  
	browserStorage.setJson('forms', formsObject);
	
	return result;
};

export default storageMiddleware;