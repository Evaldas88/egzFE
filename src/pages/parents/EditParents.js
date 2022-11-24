import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import axios from 'axios'

const EditParents = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        lname: '',
        class: '',
        personalCode: '',
        birthday: '',
        darzelis_id: 0
    })
    const [image, setImage] = useState('')
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [school, setSchool] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const handleFormChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })

    }

    useEffect(() => {
        setLoading(true)

        axios.get('http://127.0.0.1:8000/api/darzelis')
            .then(resp => {
                setLoading(false)
                setSchool(resp.data.message)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Server dead', status: 'danger' })
                //navigate('/login')
            })

        axios.get('http://127.0.0.1:8000/api/tevai/' + id)
            .then(resp => {
                setLoading(false)
                setForm({
                    lname: resp.data.message[0].lname,
                    name: resp.data.message[0].name,
                    class: resp.data.message[0].class,
                    personalCode: resp.data.message[0].personalCode,
                    birthday: resp.data.message[0].birthday,
                    darzelis_id: resp.data.message[0].darzelis_id || ''

                })
                console.log(resp);
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Server dead', status: 'danger' })
                //navigate('/login')
            })
    }, [id])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        let formData = new FormData()
        for (const key of Object.keys(form)) {
            formData.append(key, form[key])
        }

        axios.post('http://127.0.0.1:8000/api/tevai/' + id, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(resp => {
                if (resp.status === 200) {
                    setLoading(false)
                    setMessage({ text: 'Kid saved', status: 'success' })
                    setTimeout(() => navigate('/parents/parents'), 2000)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Server dead', status: 'danger' })
            })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>Edit Kid</h2>
                    </div>
                </div>
                <Message value={message} />
                <form className=" " onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label className=" mt-3">Kid name:</label>
                        <input type="text" name="name" className="form-control  mt-2" onChange={handleFormChange} value={form.name} />
                    </div>
                    <div className="form-group">
                        <label className=" mt-3">Kid Surname:</label>
                        <input type="text" name="lname" className="form-control  mt-2" onChange={handleFormChange} value={form.lname} />
                    </div>
                    <div className="form-group">
                        <label className=" mt-3">Class:</label>
                        <input type="number" name="class" className="form-control  mt-2" onChange={handleFormChange} value={form.class} />
                    </div>
                    <div className="form-group">
                        <label className=" mt-3">Personal code:</label>
                        <input type="text" name="personalCode" className="form-control mt-2" onChange={handleFormChange} value={form.personalCode} />
                    </div>
                    <div className="form-group">
                        <label className=" mt-3">Birthday:</label>
                        <input type="text" name="birthday" className="form-control mt-2" onChange={handleFormChange} value={form.birthday} />
                    </div>

                    <div className="form-group">
                        <label className=" mt-3">School:</label>
                        <select name="darzelis_id" className="form-control mt-2" onChange={handleFormChange} value={form.darzelis_id}>
                            <option value="0">Choose School</option>
                            {school.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-dark">Enter</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditParents