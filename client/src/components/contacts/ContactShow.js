import React from 'react'
import axios from '../config/axios-config';
import { Link } from 'react-router-dom'
import {
    Card, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export default
    class ContactShow extends React.Component {
    constructor() {
        super()
        this.state = {
            contact: {}
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const auth = localStorage.getItem('authToken')

        if (auth) {
            axios.get(`/contact/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken') } })
                .then((response) => {
                    const contact = response.data
                    this.setState(() => ({ contact }))
                })
                .catch((err) => {
                    console.log(err)
                    this.componentDidMount()
                })
        }
        else {
            this.props.history.push('/users/login')
        }
    }
    handleDelete() {
        const confirm = window.confirm('are you sure')
        if (confirm) {
            axios.delete(`/contact/${this.state.contact._id}`, {
                headers: { 'x-auth': localStorage.getItem('authToken') }
            })
                .then((response) => {
                    this.props.history.push('/contacts')
                })
                .catch((err) => {
                    console.log(err)
                    this.handleDelete()
                })
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col-6">
                            <Card>
                                {/* <CardImg top src={process.env.PUBLIC_URL + '/contact-icon.png'} width="200px" height='200px' alt="Card image cap" /> */}
                                <CardBody>
                                    <CardTitle><p className='text-center'><img src={process.env.PUBLIC_URL + '/contact-icon.png'} width="200px" height='200px' alt='' /></p> </CardTitle>
                                    <CardTitle><h4>Name&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.contact.name}</h4></CardTitle>
                                    <CardTitle><h4>Mobile&nbsp;&nbsp;: {this.state.contact.mobile}</h4></CardTitle>
                                    <CardTitle><h4>Email &nbsp;&nbsp;&nbsp;&nbsp;: {this.state.contact.email}</h4></CardTitle>
                                    <CardSubtitle>{' '}</CardSubtitle>
                                    <br />
                                    <Link className="btn btn-primary" to='/contacts'>Back</Link>{' '}
                                    <Link className="btn btn-primary" to={`/contacts/edit/${this.state.contact._id}`}>Edit</Link>{' '}
                                    <Button color='primary' onClick={this.handleDelete}>Delete</Button>
                                </CardBody>
                            </Card>




                        </div>

                        <div className="col">

                        </div>
                    </div>

                </div>


            </div>
        )
    }

}