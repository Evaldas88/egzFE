import { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const Darzelis = () => {
    const [darzelis, setDarzelis] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    // const navigate = useNavigate();
    const token = localStorage.getItem('token')
     const url = 'http://127.0.0.1:8000/api/darzelis'
    useEffect(() => {
        setLoading(true)
        axios.get( url, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setDarzelis(resp.data.message)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Server dead', status: 'danger' })
                //navigate('/login')
            })
    }, [reload])

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete( url + '/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((resp) => {
                setLoading(false)
                setReload(true)
                setMessage({ text: resp.data.message, status: 'success' })
                setTimeout(() => setMessage({ text: '', status: '' }), 5000)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Server dead', status: 'danger' })
                //navigate('/login')
            })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                <div className="  mb-5">
                    <h2>School</h2>
                    <div>
                        <Link to="/admin/darzelis/new" className="btn btn-dark ml-auto">New School </Link>
                    </div>
                </div>
                <Message value={message} />
                {darzelis.length > 0 ? (
                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {darzelis.map(school => (
                                <tr key={school.id}>
                                    <td>{school.id}</td>
                                    <td>{school.name}</td>
                                    <td>{school.code}</td>
                                    <td>
                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(school.id)}><i className="bi bi-trash3 me-1"></i>Delete</button>
                                        <Link to={'/admin/darzelis/edit/' + school.id} className="btn btn-primary"><i className="bi bi-pen me-1"></i>Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">No School added</h5>}
            </div>
        </>
    )
}

export default Darzelis