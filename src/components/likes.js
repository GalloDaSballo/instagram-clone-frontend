/**
 * List of all likes
 */
import _ from 'lodash'
import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchLikes} from '../actions'
import {Grid, Feed, Icon} from 'semantic-ui-react'

class Likes extends Component{

  componentDidMount(){
    this.props.fetchLikes()
  }
  /**
   * All Like Data Mappings
   * <Grid columns={3}>
     <Grid.Row>
       <Grid.Column>
         <ul>
           <li><h2>Like Object</h2></li>
           <li>Id {like.like._id}</li>
           <li>Date: {like.like.date}</li>
           <li>User {like.like._user}</li>
           <li>Picture {like.like._picture}</li>
         </ul>
       </Grid.Column>
       <Grid.Column>
         <ul>
           <li><h2>User</h2></li>
           <li>Id {like.user._id}</li>
           <li>UserName: {like.user.userName}</li>
           <li>Picture{like.user.picture}</li>
         </ul>
       </Grid.Column>
       <Grid.Column>
         <h2>Picture</h2>
         <ul>
           <li><h3>Image</h3></li>
           <li>Id {like.picture.image._id}</li>
           <li>URL: {like.picture.image.pictureUrl}</li>
           <li>Likes {like.picture.image.like}</li>
           <li>Desc {like.picture.image.description}</li>
         </ul>
         <ul>
           <li><h3>Profile</h3></li>
           <li>Id{like.picture.profile._id}</li>
           <li>UserName: {like.picture.profile.userName}</li>
           <li>Picture{like.picture.profile.picture}</li>
         </ul>
       </Grid.Column>
     </Grid.Row>
   </Grid>
   */

  /**
   * Shorthand Feed version
   *                 <Feed>
                     <Feed.Event>
                       <Feed.Label image={like.user.picture} />
                       <Feed.Content date={like.like.date} summary={`${like.user.userName} liked ${like.picture.profile.userName}'s picture'`} extraImages={[like.picture.image.pictureUrl]} />
                     </Feed.Event>
                   </Feed>
   */
  renderLikesData(){
    if(!_.isEmpty(this.props.likes)){
      console.log("Likes ", this.props.likes)
      return(
        this.props.likes.map((like) => {
          if(!_.isEmpty(like.user) && !_.isEmpty(like.picture) && !_.isEmpty(like.like)){
              return(
                <div key={like.like._id}>
                  <Feed>
                      <Feed.Event>
                       <Feed.Label image={like.user.picture} />
                       <Feed.Content>
                         <Feed.Summary>
                           {`${like.user.userName} liked ${like.picture.profile.userName}'s picture'`}
                           <Feed.Date>{like.like.date}</Feed.Date>
                         </Feed.Summary>
                         <Feed.Extra images>
                           <a>
                             <img src={like.picture.image.pictureUrl} />
                           </a>
                         </Feed.Extra>
                         <Feed.Meta>
                           <Feed.Like>
                             <Icon name='like' />
                             {like.picture.image.likes} Likes
                           </Feed.Like>
                         </Feed.Meta>
                       </Feed.Content>
                     </Feed.Event>
                   </Feed>
                </div>
               )
             } else {
               console.log("Problem in likes")
               console.log("like.user ",like.user)
               console.log("like.picture ", like.picture)
               console.log("like.like ", like.like)
             }
           })
        )
      }
    }

  render(){
    return(
      <div>
        <h2>Global Likes</h2>
        <div>
          {this.renderLikesData()}
        </div>
      </div>
    )
  }
}
function mapStateToProps({likes}){
  return {likes}
}
export default connect(mapStateToProps, {fetchLikes})(Likes)
