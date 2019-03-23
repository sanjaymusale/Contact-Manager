import React from 'react'
import axios from '../config/axios-config';
import { connect } from 'react-redux'
import { setUser } from '../../actions/users'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedToken: localStorage.getItem('authToken')
        }
    }

    componentDidMount() {
        console.log('compon logout')
        axios.delete('/user/logout', { headers: { 'x-auth': localStorage.getItem('authToken') } })
            .then((response) => {
                console.log(response)
                this.props.dispatch(setUser({}))
                localStorage.removeItem('authToken')

                this.props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
            })

    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default connect()(Logout)