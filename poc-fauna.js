const faunadb = require('faunadb')
const q = faunadb.query

//Criando client
const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
})

//CREATE DOCUMENTS
const createContact = data => {
   return client.query(
        q.Create(
            q.Collection('contacts'),
            { data }
        )
    )
}

// createContact({
//     name: "Crystyan",
//     email: "crystyan@gmail.com",
//     title: "Author"
// }).then(ret => {console.log(ret)})

// //LISTANDO DADOS - por ref
const getContactByRef = (ref) => {
    return client.query(
        q.Get(
            q.Ref(q.Collection('contacts'), ref  )
         )
     )
 }

 const getAllContacts = () => {
     return client.query(
         q.Map(
             q.Paginate(
                 //usando meu índice
                 q.Match("allContacts"), 
                 { size: 2}
             ), 
             q.Lambda(x => q.Get(x))
         )
     )
 }

 const getContactByEmail = email => {
    return client.query(
        q.Get(
            q.Match(q.Index("getContactByEmail"), [email])
        )
    )
 }

 getContactByEmail("fernanda@gmail.com").then(email=> console.log(email))

//  getAllContacts().then(all => console.log(all))
// getContactByRef('313191965761995332').then(ret=> console.log(ret))


