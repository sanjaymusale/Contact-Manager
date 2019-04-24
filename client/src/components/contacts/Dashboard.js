import React from 'react';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

const Dashboard = (props) => {
    const { user } = props.user

    return (
        <div>
            <Jumbotron>
                <h1 className="display-3" >Welcome {(user.name).slice(0, 1).toUpperCase() + (user.name).slice(1)}</h1>
                <p className="lead">This is a your Personalized Contacts Manager.</p>
                <hr className="my-2" />
                
                <p className="lead">
                    <Link to='/contacts/new' className="btn btn-primary">Get Started</Link>
                </p>
            </Jumbotron>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}
export default connect(mapStateToProps)(Dashboard);
