import { deleteContact } from "../../../services/contact"

export default async function handler(req, res){
    if(req.method === 'DELETE'){
        await deleteContact(req.query.ref)
        res.json({ Ok: true})
    }
}