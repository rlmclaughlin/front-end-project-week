import React from 'react'
import './Login.css'
import axios from 'axios'

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    registerUser = (newUser) => {
        axios.post('http://localhost:5566/api/register', newUser)
          .then( res => {
              console.log(res.data)
              localStorage.setItem('jwt', res.data.token)
          })
          .catch( err => { console.log("failed to add user")
        })
    }

    inputHandler = (event) => {
      event.preventDefault(); 
      this.setState({
          [event.target.name]: event.target.value
      })
    }
  
    submitHandler = (event) => {
      event.preventDefault(); 
      this.registerUser(this.state)
      this.setState({
          username: '',
          password: ''
      })
      this.props.history.push('/')
    }

    render(){
        return(
            <div className='login-container'>
                <h2>Sign Up</h2> 
                <form onSubmit={this.submitHandler}> 
                <div>
                    Username: <input value={this.state.username} onChange={this.inputHandler} name='username' type='text' className="username"/>
                </div> 
                <div >
                    Password: <input value={this.state.password} onChange={this.inputHandler} name='password' type='password' className="password"/>
                </div> 
                <button type='submit'>submit</button>
                </form> 
            </div> 
        )
    }
}