import { getAllContacts,  createContact, deleteContact } from "../../../services/contact"

 //métodos da api 
export default async function handler(req, res){
    if(req.method === 'POST'){
        const contact = await createContact(req.body)
        res.send(contact)
    }else{
        const contacts = await getAllContacts()
        res.json(contacts)
    } 
}