import React from 'react'
import axios from '../config/axios-config';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import isEmail from 'validator/lib/isEmail'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            nameError: '',
            emailError: '',
            passwordError: '',
            failure:false
        }
        //handle this binding in the constructor
        this.emailChange = this.emailChange.bind(this)

    }
    validate = () => {
        let isError = false
        const error = {
            nameError: '',
            emailError: '',
            passwordError: ''

        }
        if (this.state.name.length === 0) {
            isError = true
            error.nameError = 'Please Provide User Name'
        }
        if (this.state.email.length === 0) {
            isError = true
            error.emailError = 'Please Provide email  '
        }
        if(this.state.email.length > 0){
          if(!isEmail(this.state.email)){
            isError = true
            error.emailError = 'Provide valid Email'
          }
        }
        if (this.state.name.length > 0 && this.state.name.length < 3) {
            isError = true
            error.nameError = 'Must contain min 3 Character'
        }


        if (this.state.password.length === 0) {
            isError = true
            error.passwordError = 'Please Provide Password'
        }
        if (this.state.password.length > 0 && this.state.password.length < 6) {
            isError = true
            error.passwordError = 'Must Contain 6 characters'
        }

        this.setState(() => ({
            ...this.state,
            ...error
        }))
        return isError
    }
    //es6 arrow functions for event handlers wher you dont have to bind this keyword
    NameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({ name }))

    }



    //regular method used for event handle
    emailChange(e) {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    passwordChange(e) {
        const password = e.target.value
        this.setState(() => ({ password }))

    }


    submitHandle = (e) => {
        e.preventDefault()
        let err = this.validate()
        if (!err) {
            const formData = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }

            axios.post('/user/register', formData)
                .then((response) => {
                  //console.log(response.data)
                    if(response.data.notice){
                      this.props.history.push('/user/login')
                      this.setState(() => ({
                          name: '',
                          email: '',
                          password: '',
                      }))
                    }else {
                      this.setState(() => ({
                        failure:true
                      }))
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col border border-primary shadow-lg p-3 mb-5 bg-white rounded p-4 m-4">

                        <p className="h3 text-center">Register</p>
                        {this.state.failure && <Alert color="warning">
                          Email already Registered
                        </Alert>}
                        <Form className='form' onSubmit={this.submitHandle} >


                            <Label for="name"></Label>
                            <Input type="text" name="name" value={this.state.name} onChange={this.NameChange} placeholder="Username" />
                            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.nameError}</p>




                            <Label for="email"></Label>
                            <Input type="email" name="email" value={this.state.email} onChange={this.emailChange} placeholder="Email" />
                            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.emailError}</p>




                            <Label for="password"></Label>
                            <Input type="password" name="password" value={this.state.password} onChange={this.passwordChange.bind(this)} placeholder="password" />
                            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.passwordError}</p>
                            <FormGroup></FormGroup>
                            <Col>
                                <p className="text-center"><Button color="primary" size="lg" block>Register</Button></p>
                            </Col>
                        </Form >
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>

        )
    }
}

export default Register
