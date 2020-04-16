import React, { Component } from 'react';
import './App.css';

class ViewContact extends Component{
  constructor(props) {
  super(props);

  this.state = {
    editing: false,
    name: this.props.contact.name,
    number: this.props.contact.number,
    email: this.props.contact.email,
  };
  this.handleName = this.handleName.bind(this);
  this.handleNumber = this.handleNumber.bind(this);
  this.handleEmail = this.handleEmail.bind(this);
  this.editContact = this.editContact.bind(this);
  this.doneEditing = this.doneEditing.bind(this);
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

    editContact(){
        this.setState({
            editing: !this.state.editing,
        })
    }

    doneEditing(){
        this.editContact();
        this.props.editContact(this.props.contact.ID, this.state.name, this.state.number, this.state.email)
    }

    render(){
        let view
        if(this.state.editing){
            view = 
            <div className="mt-3">
                <h3>Contact Name</h3>
                <input type="text" onChange={this.handleName} defaultValue={this.state.name}/>
                <h3>Contact Number</h3>
                <input type="number" onChange={this.handleNumber} defaultValue={this.state.number}/>
                <h3>Email</h3>
                <input type="email" onChange={this.handleEmail} defaultValue={this.state.email}/>
                <div>
                    <button className="btn btn-primary mt-3" onClick={() => this.doneEditing()}>Done!</button>
                </div>
            </div>
        }else{
            view =
            <div className="mt-3">
                <h3><u>Contact Name</u></h3>
                <h6>{this.state.name}</h6>
                <h3><u>Contact Number</u></h3>
                <h6>{this.state.number}</h6>
                <h3><u>Email</u></h3>
                <h6>{this.state.email}</h6>
                <button className="btn btn-success mt-3" onClick={() => this.editContact()}>Edit</button>
                <button className="btn btn-danger mt-3 ml-3" onClick={() => this.props.deleteContact(this.props.contact.ID)}>Delete</button>
            </div>
        }
        return (
            <div className='popup'>  
                <div className='popupinner pl-4 pt-3'>
                    <button className="closepopup" onClick={() => this.props.closePopup()}>X</button>
                    {view}
                </div>
            </div>
        );
    }
}

export default ViewContact;