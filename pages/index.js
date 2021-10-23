import useSWR from "swr"
import Link from 'next/link'
import {
    Container,
    ConteudoTitulo,
    Titulo,
    Table,
    TextLink,
    TextDanger
 } from "../styles/custom_adm"

const deleteRequest = async url => {
    const res = await fetch(url, {
        method: 'delete',
    })
    const data = await res.json()
    return data 
}

const Index = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, mutate } = useSWR('/api/contacts', fetcher)

    const deleteContact = async (ref) => {
       await deleteRequest('/api/contacts/'+ref)
       mutate()
    }

    //senao chegou os dados ainda
    if(!data){
        return <p>Loanding...</p>
    }
    return (
        <Container>
            <ConteudoTitulo>
                <Titulo>Bem vindo ao teste do FaundaDB</Titulo>
            </ConteudoTitulo>
            <TextLink><Link href='/create'>Criar novo contato</Link></TextLink>
            <Table>
                <thead>
                    <tr>
                        <th>ref</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Título</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
            {
                data.data.map(contact=>{
                    return(
                        <tr key={JSON.stringify(contact.ref['@ref'].id)}>
                           <td>{contact.ref['@ref'].id}</td> 
                           <td>{contact.data.name}</td>
                           <td>{contact.data.email}</td> 
                           <td>{contact.data.title}</td> 
                           <td><button onClick={()=> deleteContact(contact.ref['@ref'].id)}>Remove</button></td> 
                            <hr />
                        </tr>
                    )
                })
            }
            </tbody>
            </Table>
        </Container>
    )
}

export default Index;