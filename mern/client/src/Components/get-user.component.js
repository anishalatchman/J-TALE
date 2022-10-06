import React, { Component } from 'react';
import axios from 'axios';

export default class GetUser extends Component {

    constructor(props) {
        super(props);

        this.state = {users: []};
      }
      
      componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username)
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
        <h3 className='p-2'>Logged Exercises</h3>
        <table className="table">
            <thead className="thead-light">
            <tr>
                <th>Username</th>
            </tr>
            </thead>
            <tbody>
            { 
                this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
            }
            </tbody>
        </table>
        </div>
    )
    }
}
