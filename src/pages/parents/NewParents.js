import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import axios from 'axios'

const NewParents = () => {
    const [form, setForm] = useState({
        name: '',
        lname: '',
        class: '',
        birthday: '',
        personalCode: '',
         darzelis_id: 0
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [darzelis, setDarzelis] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const handleFormChange = (e) => {
        // if(e.target.name === 'image')
            setForm({ ...form, [e.target.name]: e.target.value  })
        // else
        //     setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setLoading(true)

        axios.get('http://127.0.0.1:8000/api/darzelis')
        .then(resp => {
            setLoading(false)
            setDarzelis(resp.data.message)
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

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        let formData = new FormData()
        for(const key of Object.keys(form)) {
            formData.append(key, form[key])
        }

        axios.post('http://127.0.0.1:8000/api/tevai', formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Kid saved', status: 'success'})
                setTimeout(() => navigate('/parents/parents'), 2000)
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
                        <h2>Add Kid</h2>
                    </div>
                </div>
                <Message value={message} />
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label className="mt-2">Kid Name:</label>
                        <input type="text" name="name" className="form-control m-1" onChange={handleFormChange}   />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Kid Surname:</label>
                        <input type="text" name="lname" className="form-control m-1" onChange={handleFormChange}   />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Personal code :</label>
                        <input type="number" name="personalCode" className="form-control mt-1" onChange={handleFormChange}   />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Class :</label>
                        <input type="text" name="class" className="form-control mt-1" onChange={handleFormChange}   />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Birthday :</label>
                        <input type="text" name="birthday" className="form-control mt-1" onChange={handleFormChange}   />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">School:</label>
                        <select name="darzelis_id" className="form-control mt-3" onChange={handleFormChange}>
                            <option value="0">Choose School</option>
                            {darzelis.map(school => <option value={school.id}>{school.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mt-2">Enter</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewParents