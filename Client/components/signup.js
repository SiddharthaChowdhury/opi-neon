import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createUser} from '../src/actions/landing-action';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            password1: "",
            password2: ""
        }
        this.submitRegister = this.submitRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    submitRegister(e){
        e.preventDefault()
        this.props.createUser(this.state)
    }
    render(){
        console.log(this.props.regisAck)
        return(
            <div>
                
                <form onSubmit={this.submitRegister}>
                    <h4>{this.props.regisAck.msg}</h4>
                    <div className="mike"></div>
                    <div>
                        <label htmlFor="name">Name</label><br/>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label><br/>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label><br/>
                        <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br/>
                        <input type="password" name="password1" value={this.state.password1} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br/>
                        <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit">Signup</button>
                    </div>
                </form>
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