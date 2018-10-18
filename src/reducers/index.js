/**
 *
 */
import {combineReducers} from 'redux' //To exoport all combineReducers
import authReducer from './authReducer'
import picturesReducer from './picturesReducer'
import myProfileReducer from './myProfileReducer'
import likesReducer from './likesReducer'
import {reducer as reduxForm} from 'redux-form'
//renaming reducer from redux-form as reduxForm

export default combineReducers({
  auth: authReducer,
  form: reduxForm, //reduxForm assumes form is the reducer that we hook into
  pictures: picturesReducer,
  myProfile: myProfileReducer,
  likes: likesReducer
})
