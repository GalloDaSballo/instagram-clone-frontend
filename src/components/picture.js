import React, {Component} from 'react'
import {Card, Icon, Modal, Button} from 'semantic-ui-react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchPictures} from '../actions'

class Picture extends Component{
  state = {
    showModal: false,
    modalMessage: '',
    fetchPictures: null
  }

  showMyId = () => {
    console.log(this.props.pictureId)
  }

  onDoubleClick = () => {
    console.log("Double click!!!")
    //We can do the like feature here
    this.setState({showModal: true, modalMessage: 'Making Like Request'})
    axios.post('/api/likes/', {pictureId: this.props.pictureId})
      .then((coso) => {
        this.setState({modalMessage: 'Liked!'})
        setTimeout(() => this.closeModal(), 1000)
        this.props.fetchPictures()
      })
      .catch((err) => {
        if(err){
          this.setState({modalMessage: err.message})
        }
      })
  }

  closeModal = () => {
    this.setState({showModal: false, modalMessage: ''})
  }

  render(){
    const extra = (
        <span>
          <Icon name='heart' />
          {this.props.likes} Likes
        </span>
      )
    return(
      <div className="ui fluid card">
        <Card
          onClick={this.showMyId}
          onDoubleClick={this.onDoubleClick}
          fluid
          image={this.props.image}
          header={this.props.author}
          meta={this.props.date}
          description={this.props.description}
          extra={extra}
        />
        <Modal
          basic
          open={this.state.showModal} closeOnDocumentClick={true} onClose={this.closeModal}
          header={this.state.modalMessage}
        />
      </div>
    )
  }
}

export default connect(null, {fetchPictures})(Picture)
