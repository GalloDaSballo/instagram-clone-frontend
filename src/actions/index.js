import axios from 'axios'
import {FETCH_USER, FETCH_LIKES, FETCH_MY_PROFILE, FETCH_PICTURES} from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchLikes = () => async dispatch => {
    const res = await axios.get('/api/likes');
    dispatch({type: FETCH_LIKES, payload: res.data})
}

export const fetchMyProfile = () => async dispatch => {
  const res = await axios.get('api/current_user')

  const currentUser = res.data._id
  console.log("Current User", currentUser)
  if(currentUser){
    const reqU = await axios.get(`api/profiles/${currentUser}`)
    dispatch({type: FETCH_MY_PROFILE, payload: reqU.data})
  } else {
    dispatch({type: FETCH_MY_PROFILE, payload: {userName: 'You need to login'}})
  }
}

export const fetchPictures = () => async dispatch => {
  const res = await axios.get('/api/pictures')
  dispatch({type: FETCH_PICTURES, payload: res.data})
}

export const myPics = () => async dispatch => {
  const res = await axios.get('/api/pictures/my')
  dispatch({type: FETCH_PICTURES, payload: res.data})
}
