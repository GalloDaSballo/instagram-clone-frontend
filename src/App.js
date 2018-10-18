import React, { Component } from 'react';
import './App.css';

import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import NavHead from './components/navHead'
import Likes from './components/likes'
import Feed from './components/feed'
import Me from './components/me'
import Upload from './components/upload'
import { publitioApi } from 'publitio_js_sdk'
import {Container, Header} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actions from './actions'
import axios from 'axios'
window.axios = axios



class App extends Component {
  componentDidMount(){
    //Get loggedin user data
    this.props.fetchUser()
    this.props.fetchLikes()
    this.props.fetchMyProfile()
    this.props.fetchPictures()
  }
  render() {
    return (

      <BrowserRouter>
        <Container text>
          <Header as='h1'>InstaClone</Header>
          <Route path="/" render={(props) => <NavHead {...props} auth={this.props.auth} /> } />
          <Route exact path="/"render={() => (
            (
              <Redirect to="/feed"/>
            )
          )}/>
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/likes" component={Likes} />
          <Route exact path="/me" component={Me} />
          <Route exact path="/upload" component={Upload} />
        </Container>
      </BrowserRouter>
    );
  }
}
function mapStateToProps({auth}){
  return({auth})
}
export default connect(mapStateToProps, actions)(App)
