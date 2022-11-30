import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const NewDarzelis = () => {
    const [form, setForm] = useState({
        name: '',
        address:'',
        code: ''
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
     const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.post('http://127.0.0.1:8000/api/school', form, {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'School saved', status: 'success'})
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
                     <div className="col-md-12 d-flex">
                        <h2>New School</h2>
                    </div>
                 <Message value={message} />
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label  className=" mt-2">School name:</label>
                        <input type="text" name="name" className="form-control mt-2" onChange={handleFormChange}   />
                    </div>
                    <div className="form-group">
                        <label  className="  mt-2">Address:</label>
                        <input type="text" name="address" className="form-control mt-2" onChange={handleFormChange}  />
                    </div>
                    <div className="form-group">
                        <label  className="  mt-2">Code:</label>
                        <input type="text" name="code" className="form-control mt-2" onChange={handleFormChange}  />
                    </div>
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-dark">Enter</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewDarzelis