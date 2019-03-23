import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { isAuthenticated } = props.user

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to='/'><img src={process.env.PUBLIC_URL + '/icon.png'} height="40px" width="40px" alt="" />{' '}Contact Manager</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        {
                            !isAuthenticated ? <>
                                <Link className="btn btn-primary" to='/user/register' role="button">Register</Link>
                                <Link className="btn btn-primary" to='/user/login' role="button">Login</Link>

                            </>
                                :
                                <>
                                    <ul className="navbar-nav mr-auto">

                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle " to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="text-white">Actions</span>
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link to="/contacts/new" className="dropdown-item">New Contact</Link>
                                                <Link to="/contacts" className="dropdown-item" >View Contacts</Link>

                                            </div>
                                        </li>
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/user">Home <span className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="nav-item">
                                            {/* <Link className="nav-link" href="#">Link</Link> */}
                                        </li>

                                        <li className="nav-item">
                                            {/* <Link className="nav-link disabled" href="#">Disabled</Link> */}
                                        </li>
                                    </ul>

                                    <Link className="btn btn-primary" to='/logout' role="button">LogOut</Link>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Navbar)