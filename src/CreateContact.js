import React, { Component } from 'react';
import './App.css';

class CreateContact extends Component{
  constructor(props) {
  super(props);

  this.state = {
    name: "",
    number: "",
    email: "",
  };
  this.handleName = this.handleName.bind(this);
  this.handleNumber = this.handleNumber.bind(this);
  this.handleEmail = this.handleEmail.bind(this);
}

    handleName(e){
        this.setState({
            name: e.target.value
        })
    }

    handleNumber(e){
        this.setState({
            number: e.target.value
        })
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    render(){
        return (
            <div className='popup'>  
                <div className='popupinner pl-4 pt-3'>
                    <button className="closepopup" onClick={() => this.props.closePopup()}>X</button>
                    <div className="mt-3">
                        <h3>Contact Name</h3>
                        <input type="text" onChange={this.handleName} />
                        <h3>Contact Number</h3>
                        <input type="number" onChange={this.handleNumber}/>
                        <h3>Email</h3>
                        <input type="email" onChange={this.handleEmail}/>
                    </div>
                    <button className="btn btn-success mt-3" onClick={() => this.props.createContact(this.props.ID, this.state.name, this.state.number, this.state.email)}>Create Contact</button>
                </div>
            </div>
        );
    }
}

export default CreateContact;