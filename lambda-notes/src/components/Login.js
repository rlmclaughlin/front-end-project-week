import React from 'react'
import './Login.css'
import axios from 'axios'


export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }
    }

    registerUser = (name, password) => {
        const newUser = {
            username: name,
            password: password
        }

        axios.post('http://localhost:5566/api/login', newUser)
          .then( res => {
              console.log(res.data)
              localStorage.setItem('jwtKey', res.data.token)
        })
        .catch( err => { console.log("failed to add user")
    })
}

    

    inputHandler = (event) => {
      event.preventDefault(); 
      this.setState({
          [event.target.name]: event.target.value,
          loggedIn: true
      })
    }
  
    submitHandler = (event) => {
      event.preventDefault(); 
      this.registerUser(this.state.username, this.state.password)
      this.props.loggedIn(this.state.loggedIn)
      this.setState({
          username: '',
          password: '',
      })
      console.log(this.state.loggedIn)
      this.props.history.push('/')
    }

    render(){
        return(
            <div className='login-container'>
                <h2>Login</h2> 
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