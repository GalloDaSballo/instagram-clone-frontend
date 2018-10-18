import {FETCH_LIKES} from '../actions/types'

export default function(state = [], action){
  switch(action.type){
    case(FETCH_LIKES):
      return action.payload || false;
    default:
      return state;
  }
}
