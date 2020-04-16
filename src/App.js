import React, { Component } from 'react';
import './App.css';
import CreateContact from './CreateContact';
import ViewContact from './ViewContact';

class App extends Component{
  constructor() {
    super();

    this.state = {
      contacts: [],
      contactID: 0,
      creatingContact: false,
      viewingContact: false,
      viewingFavorites: false,
      contactBeingViewed: [],
    };
    this.addContact = this.addContact.bind(this);
    this.createContact = this.createContact.bind(this);
    this.viewContact = this.viewContact.bind(this);
    this.closeContact = this.closeContact.bind(this);
    this.editContact = this.editContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.viewFavorites = this.viewFavorites.bind(this);
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

  closeContact(){
    this.setState({
      viewingContact: !this.state.viewingContact,
    })
  }

  editContact(ID, name, number, email){
    this.state.contacts.forEach(contact =>{
      if(contact.ID === ID){
        contact.name = name
        contact.number = number
        contact.email = email
        this.setState({
          contacts: this.state.contacts,
        })
      }
    })
  }

  deleteContact(ID){
    let updatedContacts = []
    this.state.contacts.forEach(contact =>{
      if(contact.ID !== ID){
        updatedContacts = [...updatedContacts, contact]
      }
    })
    this.setState({
      contacts: updatedContacts,
      viewingContact: !this.state.viewingContact
    })
  }

  addToFavorites(ID){
    this.state.contacts.forEach(contact =>{
      if(contact.ID === ID){
        contact.favorited = !contact.favorited
        this.setState({
          contacts: this.state.contacts,
        })
      }
    })
  }

  viewFavorites(){
    this.setState({
      viewingFavorites: !this.state.viewingFavorites,
    })
  }

  renderContacts(){
    return this.state.contacts.map(contact => {
      if(this.state.viewingFavorites){
        if(contact.favorited){
          return(
            <button className="contact mb-2" onClick = {() => this.viewContact(contact)} key={contact.ID}>
              <h3>{contact.name}</h3>
            </button>
          )
        }
      }else{
        return(
          <button className="contact mb-2" onClick = {() => this.viewContact(contact)} key={contact.ID}>
            <h3>{contact.name}</h3>
          </button>
        )
      }
    })
  }

  render(){
    let button
    if(!this.state.viewingFavorites){
      button = <button className="btn btn-warning" onClick={() => this.viewFavorites()}>Favorites</button>
    }else{
      button = <button className="btn btn-success" onClick={() => this.viewFavorites()}>All Contacts</button>
    }
      return (
          <div className='App pt-5'>  
              <h1 className="d-flex justify-content-center">Contacts</h1>

              <div className="my-5 d-flex justify-content-center">
                <button className="btn btn-primary mr-3" onClick = {() => this.addContact()}>Add Contact!</button>
                {button}
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

              {this.state.viewingContact ?  
                <ViewContact
                    closePopup = {this.closeContact}
                    editContact = {this.editContact}
                    deleteContact = {this.deleteContact}
                    favorite = {this.addToFavorites}
                    contact = {this.state.contactBeingViewed}
                />  
                : null  
              }
          </div>
      );
  }
}

export default App;