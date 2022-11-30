import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import axios from 'axios'

const Parents = () => {
 
    const [parents, setParents] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const url = 'http://127.0.0.1:8000/api/parents'
    const [orders, setOrders] = useState([])


    useEffect(() => {
        setLoading(true)
        axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setReload(false)
                setParents(resp.data.message)
                console.log(resp.data.message)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'server dead', status: 'danger' })
                //navigate('/login')
            })
    }, [reload])

    const handleDelete = (id) => {
        console.log(id)
        setLoading(true)
        axios.delete(url +'/' + id, {
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
                console.log(err)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'server dead', status: 'danger' })
                //navigate('/login')
            })
    }

    
    const handleOrder = (id) => {
 
        setLoading(true)

        axios.post('http://127.0.0.1:8000/api/orders', {
            parents_id: id
        }, 
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                console.log(resp)

                setMessage({text: 'Request success', status: 'success'})
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Server deat', status: 'danger'})
        })
    }
  

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container " >
                <div className="row mb-5">
                    <div  >
                        <h2>Kids information</h2>
                        <div>
                            <Link to="/parents/parents/new" className="btn btn-dark ml-auto">Add kids information</Link>
                        </div>
                    </div>
                </div>
                <Message value={message} />
                {parents.length > 0 ? (
                    <table className="table bg-light table-bordered text-center " >
                        <thead>
                            <tr>
                                <th>#</th>
                                 <th>Name</th>
                                 <th>Surname</th>
                                <th>Class</th>
                                <th>Personal Code</th>
                                <th>Birthday</th>
                                <th>School</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {parents.map(kid => (
                                <tr key={kid.id} className="text-center">
                                    <td className="text-center">{kid.id}</td>
                                     <td>{kid.name}</td>
                                     <td>{kid.lname}</td>
                                    <td>{kid.class}</td>
                                    <td>{kid.personalCode}</td>
                                    <td>{kid.birthday}</td>
                                    <td>{kid.school}</td>
                                    <td className="text-alling-center">
                                        <button className="btn btn-danger text-center me-2" onClick={() => handleDelete(kid.id)}><i className="bi bi-trash3 me-1"></i>Delete</button>
                                        <Link to={'/parents/parents/edit/' + kid.id} className="btn btn-primary me-1"> <i className="bi bi-pen me-1"></i>Edit</Link>
                                        <button className="btn btn-dark" onClick={() => handleOrder(kid.id)}>Request</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                ) : <h5 className="mt-4">No Kids information yet</h5>}
            </div>
        </>
    )
}

export default Parents