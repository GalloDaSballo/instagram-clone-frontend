/**
 * Feed of all pics uploaded
 */
import _ from 'lodash'
import React, {Component} from 'react'
import Picture from './picture'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchPictures} from '../actions'

class Feed extends Component{
  state = {
    pictures: {}
  }

  componentDidMount(){
    this.props.fetchPictures()
  }

  renderPics(){
    if(!_.isEmpty(this.props.pictures)){
      return this.props.pictures.map(({image, profile}) => {
        const dateObj = new Date(Date.parse(image.date))
        const date = dateObj.toDateString()
        // console.log("Image ",image)
        // console.log("Profile ", profile)
        return(
          <Picture
            key={image._id}
            pictureId={image._id}
            author={profile.userName}
            image={image.pictureUrl}
            description={image.description}
            likes={image.likes}
            date={date}
          />
        )
      })
    }
  }

  render(){
    return(
      <div>
        <h2>Feed</h2>
        {this.renderPics()}
      </div>
    )
  }
}

function mapStateToProps({pictures}){
  return {pictures}
}

export default connect(mapStateToProps, {fetchPictures})(Feed)
