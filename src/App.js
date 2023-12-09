import logo from './logo.svg';
import './App.css';
import Header from './Component/Header';
import './Component/AddContact'
import ContactList from './Component/ContactList';
import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import AddContact from './Component/AddContact';
<script src="https://kit.fontawesome.com/b1453024da.js" crossorigin="anonymous"></script>


function App() {
  const localstorageKey = 'contact';
  const[contact,setContact] = useState(()=>{
    return JSON.parse(localStorage.getItem(localstorageKey))
  ||[]})
  const[idcounter,setIdcounter] = useState(1);
  
  useEffect(()=>{
    localStorage.setItem(localstorageKey,JSON.stringify(contact))
  },[contact])
  function addContact(data) {
    setContact([...contact,{id : idcounter, data}])
    setIdcounter(idcounter + 1)
  }
  function RemoveContact(id) {
    const updatedList = contact.filter((val)=>{
      return val.id !== id;
    })
    setContact(updatedList)
  }
  return (
    <div>
      <Header />
      <AddContact addContact={addContact}/>
      <ContactList contact={contact} RemoveContact={RemoveContact}/>
    </div>
  );
}

export default App;
