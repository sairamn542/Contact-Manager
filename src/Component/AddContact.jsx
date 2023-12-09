import { useState } from "react"


export default function AddContact({addContact}) {
    const[contactData,setContactData] = useState({name : '',email : ''});
    function HandleChange(e) {
        if(e.target.name === 'name') {
            setContactData({...contactData,name : e.target.value})
        } else {
            setContactData({...contactData,email : e.target.value})
        }
    }
    function HandleAdd() {
        if(contactData.name === ''|| contactData.email==='') {
            alert('please enter all the details')
        }
        addContact(contactData)
        setContactData({name : '',email : ''})
    }
    return(
        <div className="form-header">
            <div className="add-contact">AddContact</div>
            <form>
                <label htmlFor="name">Name:</label><br/>
                <input type="text" placeholder="Enter Your Name" name="name" value={contactData.name} onChange={HandleChange}/><br/>
                <label htmlFor="email">Email:</label><br/>
                <input type="email" placeholder="Enter your email" name="email" value={contactData.email} onChange={HandleChange}/>
            </form>
            <button onClick={HandleAdd}>Add Contact</button>
        </div>
    )
}