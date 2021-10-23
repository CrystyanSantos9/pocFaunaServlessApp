const { useFormik } = require("formik")
import { useRouter } from "next/router"

const post = async (url, data) =>{
    const res = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
    const result = await res.json()
    return result
}

const Create = () => {
    const router = useRouter()
    const form = useFormik({
        initialValues:{
            name: '',
            email: '',
            title: ''
        },
        onSubmit: async values => {
          const result = await post('/api/contacts', values)
          console.log(result)
          router.push('/')
        }
    })

    return (
        <div>
            <h1>Criar contato</h1>
            <form onSubmit={form.handleSubmit}>
                <input type="text" name="name" onChange={form.handleChange} values={form.values.name}/>
                <input type="text" name="email" onChange={form.handleChange} values={form.values.email}/>
                <input type="text" name="title" onChange={form.handleChange} values={form.values.title}/>
                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}

export default Create;
