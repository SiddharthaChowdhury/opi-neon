import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createUser} from '../src/actions/landing-action';

class Signup extends Component{
    constructor(props){
        super(props);
        this.submitRegister = this.submitRegister.bind(this);
    }
    submitRegister(e){
        console.log(e)
    }
    render(){
        return(
            <div>
                Registration form will show up here
            </div>
        )
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    'regisAck' : state.landing.signUpdata
})
export default connect(mapStateToProps, {createUser})(Signup)