/**
 * My user profile = edit + bio + pictures I uploaded + link to my likes
 */
import _ from 'lodash'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyProfile} from '../actions'
import axios from 'axios'
import {Button, Modal, Image, Header, Form, Input, Message} from 'semantic-ui-react'

class Me extends Component{
   state = {
     currentUser: {},
     formName:'',
     formBio:'',
     formPic:'',
     formLink:'',
     formMessage: ''
   }

   componentDidMount(){
     this.props.fetchMyProfile()
   }

   renderMyData(){
     const {bio, link, picture, userName, _user} = this.props.myProfile
     return(
       <div style={{maxWidth: '100%'}}>
         <Image size='medium' circular centered src={picture} />
         <h3>{userName}</h3>
         <p>{bio}</p>
         <a href={link}>{link}</a>
       </div>
     )
   }

   formField(label, state){
     return(
       <Form.Field>
         <label>{label}</label>
         <Input
           value={this.state[`form${state}`]}
           onChange={event => this.setState({[`form${state}`]: event.target.value})}
           label={label}
           labelPosition="right" />
       </Form.Field>
     )
   }

   onSubmit = async () => {
     const result = await axios.post(`api/profiles/${this.props.auth._id}`,
       {
         userName: this.state.formName,
         bio: this.state.formBio,
         link: this.state.formLink,
         picture: this.state.formPic
     })
     this.props.fetchMyProfile()
     console.log(result)
   }
   renderEditModal(){
     return(
       <Modal trigger={<Button primary>Edit Profile</Button>}>
        <Modal.Header>Edit your Profile</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
          <Modal.Description>
            <Form onSubmit={this.onSubmit}>
              {this.formField('userName', 'Name')}
              {this.formField('Bio', 'Bio')}
              {this.formField('Picture', 'Pic')}
              {this.formField('Link', 'Link')}
              <Input type="submit" />
              <Message>
                {this.formMessage}
              </Message>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
     )
   }
   render(){
     return(
       <div>
         <h2>My Profile</h2>
         <div style={{textAlign: 'center'}}>
           {this.renderMyData()}
           {this.renderEditModal()}
         </div>
       </div>
     )
   }
 }


 function mapStateToProps({myProfile, auth}){
   return {myProfile, auth}
 }

 export default connect(mapStateToProps, {fetchMyProfile})(Me)
