/**
 * Reducer responsible for the authorization mechanism in our app
 */
import {FETCH_USER} from '../actions/types'

export default function(state = [], action){
  switch(action.type){
    case(FETCH_USER):
      return action.payload || false; //if the object is an empty string we return false
    default:
      return state;
  }
}
