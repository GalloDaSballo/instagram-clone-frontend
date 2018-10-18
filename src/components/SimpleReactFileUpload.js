import React from 'react'
import { post } from 'axios';
import {Message} from 'semantic-ui-react'
import { publitioApi } from 'publitio_js_sdk'
import { withRouter } from "react-router-dom";

//Show Image before Upload
//https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file: null,
      description: '',
      status: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault()
    this.setState({status: ''})
    if(!!this.state.file){
      this.fileUpload(this.state.file).then((response)=>{
        console.log(response)
        setTimeout(() => this.props.history.push('/feed'), 300 )

      })
      // console.log("Publitios")
      // publitio.uploadFile(this.state.file, 'file')
      //   .then((data) => { console.log(data) })
      //   .catch((error) => { console.log(error) })
      // console.log("Publitios")
    }
  }

  onFileChange(e) {
    this.setState({status: ''})
    this.setState({file:e.target.files[0]})
  }

  async fileUpload(file){
    this.setState({status: 'Uploading File'})
    if(!!file){
      const url = '/api/upload';
      const formData = new FormData();
      formData.append('imageUpload',file)

      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      const pictureUrlFull = await post(url, formData, config)
      console.log("Ricevuto full picture url")
      const pictureUrl = pictureUrlFull.data
      console.log("Picture url")
      console.log(pictureUrl)
      console.log("Picture url")
      //Now we create the real entry in the DB
      const description = this.state.description
      const result = await post('/api/pictures', {pictureUrl, description})
      console.log("Result SimpelReactFileUpload ", result)
      if(result){
        this.setState({status: 'File Uploaded'})
      } else {
        this.setState({status: 'Error in loading file'})
      }
    }
  }

  renderStatus(){
    if(this.state.status){
      return(
        <Message
          header={this.state.status}
        />
      )
    }
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div>
          <input type="file" onChange={this.onFileChange} />
        </div>
        <div>
          <input value={this.state.description} type="text" onChange={event => this.setState({description: event.target.value})} />
        </div>
        <button type="submit">Upload</button>
        {this.renderStatus()}
      </form>
   )
  }
}



export default withRouter(SimpleReactFileUpload)
