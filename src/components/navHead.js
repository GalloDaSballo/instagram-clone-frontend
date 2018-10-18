/**
 * Home = page to debug stuff
 */
import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'

export default (props) => {
  /**
   * Show either login or logout option based on redux state passed by App.js
   */
  let authButton
  if(!!props.auth){
    authButton = (
      <Menu.Item position="right">
        <a href="/api/logout">
        <Icon name="log out" />
          Logout
        </a>
      </Menu.Item>

    )
  } else {
    authButton = (
      <Menu.Item position="right">
        <a href="/auth/google">
        <Icon name="google" />
          Login
        </a>
      </Menu.Item>
    )
  }

  return(
    <Menu stackable icon="labeled">
      <Menu.Item>
        <Link to="/feed">
          <Icon name="feed" />
          Feed
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/likes">
          <Icon name="heart" />
          Likes
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/me">
          <Icon name="user circle outline" />
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/upload">
        <Icon name="upload" />
          Upload
        </Link>
      </Menu.Item>
      {authButton}
    </Menu>
  )
}
