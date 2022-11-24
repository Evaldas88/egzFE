import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const EditDarzelis = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        code: ''
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const url ='http://127.0.0.1:8000/api/darzelis/'

    useEffect(() => {
        setLoading(true)

        axios.get( url + id)
        .then(resp => {
            setLoading(false)
            setForm({
                name: resp.data.message[0].name,
                code: resp.data.message[0].code,
            })
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Server dead', status: 'danger'})
            //navigate('/login')
        })
    }, [])

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.put( url + id, form, {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                console.log(resp)
                setMessage({text: 'Country saved', status: 'success'})
                setTimeout(() => navigate('/admin/darzelis'), 2000)
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Server dead', status: 'danger'})
        })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>New School</h2>
                    </div>
                </div>
                <Message value={message} />
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label className='mt-2'>School name:</label>
                        <input type="text" name="name" className="form-control mt-2" onChange={handleFormChange} value={form.name} />
                    </div>
                    <div className="form-group">
                        <label className='mt-2'>School Code:</label>
                        <input type="text" name="code" className="form-control mt-2" onChange={handleFormChange} value={form.code} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mt-3">Enter</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditDarzelis