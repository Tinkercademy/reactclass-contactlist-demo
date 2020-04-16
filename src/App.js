import React, { Component } from 'react';
import './App.css';
import CreateContact from './CreateContact';

class App extends Component{
  constructor() {
    super();

    this.state = {
      contacts: [],
      contactID: 0,
      creatingContact: false,
      viewingContact: false,
      contactBeingViewed: [],
    };
    this.addContact = this.addContact.bind(this);
    this.createContact = this.createContact.bind(this);
    this.viewContact = this.viewContact.bind(this);
  }

  addContact(){
    this.setState({
      creatingContact: !this.state.creatingContact
    })
  }

  createContact(ID, name, number, email){
    this.setState({
      contacts: [...this.state.contacts, {ID: ID, name: name, number: number, email: email, favorited: false}],
      creatingContact: !this.state.creatingContact,
    }, () => {
      let newContacts = this.state.contacts
      this.setState({
        contactID: this.state.contactID + 1,
        contacts: newContacts.sort((a,b) => a.name.localeCompare(b.name))
      })
    })
  }

  viewContact(contact){
    this.setState({
      viewingContact: !this.state.viewingContact,
      contactBeingViewed: contact,
    })
  }

  renderContacts(){
    return this.state.contacts.map(contact => {
      return(
        <button className="contact mb-2" onClick = {() => this.viewContact(contact)} key={contact.ID}>
          <h3>{contact.name}</h3>
        </button>
      )
    })
  }

  render(){
      return (
          <div className='App pt-5'>  
              <h1 className="d-flex justify-content-center">Contacts</h1>

              <div className="my-5 d-flex justify-content-center">
                <button className="btn btn-primary mr-3" onClick = {() => this.addContact()}>Add Contact!</button>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4">
                    {this.renderContacts() }              
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>

              {this.state.creatingContact ?  
                <CreateContact
                    closePopup = {this.addContact}
                    createContact = {this.createContact}
                    ID = {this.state.contactID}
                />  
                : null  
              }
          </div>
      );
  }
}

export default App;