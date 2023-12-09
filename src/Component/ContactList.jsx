

export default function ContactList(props) {
    const {contact,RemoveContact} = props; 
    const contactList = contact.map(val=>{
        return (
            <div className="contacts">
                <div style={{marginLeft : '2px'}}>{val.data.name}</div>
                <div className="email">{val.data.email}</div>
                <span className="bi bi-trash-fill" onClick={()=>RemoveContact(val.id)}></span>
            </div>
        )
    })
    return(
       <div>
         <div className="contacts-header">Contact List</div>
         <div>{contactList}</div>
       </div>
    )
}