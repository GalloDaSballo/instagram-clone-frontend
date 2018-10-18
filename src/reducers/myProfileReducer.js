import {FETCH_MY_PROFILE} from '../actions/types'

export default function(state = {userName: 'Loading', bio: 'Loading'}, action){
  switch(action.type){
    case(FETCH_MY_PROFILE):
      return action.payload || false;
    default:
      return state;
  }
}
