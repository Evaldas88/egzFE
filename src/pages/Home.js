import Header from '../components/header/Header'
// import HotelList from '../components/hotelList/HotelList'
// import Message from '../components/message/Message'
// import axios from 'axios'
// import { useState, useEffect } from 'react'

const Home = () => {
    // const [loading, setLoading] = useState(true)
    // const [hotels, setHotels] = useState([])
    // const [message, setMessage] = useState({
    //     text: '',
    //     status: ''
    // })
    //  useEffect(() => {
    //      setLoading(true)
    //     axios.get('http://127.0.0.1:8000/api/hotels')
    //     .then(resp => {
    //         setLoading(false)
    //         if(resp.data.success) {
    //             setHotels(resp.data.message)
    //             console.log()
    //         }
    //     })
    //     .catch(err => {
    //         setLoading(false)
    //         if(err.response.data)
    //             setMessage({text: err.response.data.message, status: 'danger'})
    //         else 
    //             setMessage({text: 'Server dead', status: 'danger'})
    //     })
    // }, [])

    return (
        <>
            <Header />
            <div className='container'><h1>veikia</h1></div>
            {/* {loading && ( <div className="loading">Loading...</div> )}
            <div className="container">
                <Message value={message} />
                {hotels ? <HotelList hotels={hotels} /> : (
                    <h2>No hotels</h2>
                )}
            </div> */}
        </>
    )
}

export default Home