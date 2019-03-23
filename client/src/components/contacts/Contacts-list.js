import React from 'react'
import axios from '../config/axios-config';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table, Badge, Spinner } from 'reactstrap';
import SearchBar from '../contacts/Search_bar'


class Contact extends React.Component {
    constructor() {
        super()
        this.state = {
            contacts: [],
            filterData: [],
            isLoaded: false,
            err: {}
        }
    }

    filterByValue = (array, key) => {
        return array.filter(item => item.name.toLowerCase().includes(key.toLowerCase()) || item.mobile.includes(key))
    }

    searchFilter = (e) => {
        const keyword = e.target.value
        const contacts = this.state.contacts
        const filterData = this.filterByValue(contacts, keyword)
        this.setState(() => ({ filterData }))

    }

    componentDidMount() {

        axios.get('/contact', { headers: { 'x-auth': localStorage.getItem('authToken') } })
            .then((response) => {
                const { data } = response
                this.setState(() => ({ contacts: data, filterData: data, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
                this.componentDidMount()
            })


    }
    render() {
        const Tablestyle = {
            background: '#fdfee2'
        }
        const scroll = {
            height: "400px",
            overflowY: "scroll"
        }
        const rowB = {

        }
        console.log('contact', this.props)
        return (

            <Container>
                <br />
                <Row style={rowB}>
                    <Col > <h2> Listing Contacts - <Badge color="info">{this.state.contacts.length}</Badge> </h2></Col>
                    <Col ><SearchBar searchFilter={this.searchFilter} /></Col>
                    <Col > <Link className="btn btn-primary" to='/contacts/new' role="button">New Contact</Link></Col>

                </Row>
                <Row>

                    <Col sm={{ size: 8, order: 3, offset: 1 }} style={scroll}>

                        {!this.state.isLoaded ? <div className='text-center'><Spinner color="danger" style={{ width: '4rem', height: '4rem' }} /></div> :

                            <Table striped bordered size="sm" hover style={Tablestyle} >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filterData.sort(function (a, b) {
                                        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                                        if (nameA < nameB) //sort string ascending
                                            return -1
                                        if (nameA > nameB)
                                            return 1
                                        return 0 //default return value (no sorting)
                                    }).map((contact, index) => {
                                        return <tr key={contact._id}>
                                            <td>{index + 1}</td>
                                            <td><Link to={`/contacts/${contact._id}`} >{contact.name}</Link></td>
                                            <td>{contact.mobile}</td>
                                            <td>{contact.email}</td>

                                        </tr>
                                    })}

                                </tbody>
                            </Table>
                        }

                    </Col>
                </Row>
            </Container >

        )
    }
}

export default Contact