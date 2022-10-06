import React, { Component } from 'react';
import axios from 'axios';

export default class GetTranscript extends Component {

    constructor(props) {
        super(props);

        this.state = {transcript: []};
      }
      
      componentDidMount() {
        axios.get('http://localhost:5000/transcript/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                transcript: response.data.map(transcript => transcript.transcript)
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }

    render() {
    return (
        <div>
        <h3 className='p-2'>Transcript shows here!</h3>
        </div>
    )
    }
}
