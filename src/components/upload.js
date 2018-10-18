/**
 * Upload picture and edit bio, done via publitio
 */
import React, {Component} from 'react'
import SimpleReactFileUpload from './SimpleReactFileUpload'

class Upload extends Component{
  render(){
   return(
     <div>
       <h2>File Upload</h2>
       <SimpleReactFileUpload />
     </div>
   )
 }
}

export default Upload
