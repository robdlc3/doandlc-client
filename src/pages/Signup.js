// import { useContext, useState } from "react"
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from "../context/auth.context"
// import { LoadingContext } from "../context/loading.context"
// import { post } from "../services/authService"

// const Signup = () => {
//     const { setUser } = useContext(LoadingContext)
//     const { storeToken } = useContext(AuthContext)
//     const [newUser, setNewUser] = useState({
//         email: "",
//         password: "",
//         fullName: ""
//     })

//     const navigate = useNavigate()

//     const handleChange = (e) => {
//         setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         post('/auth/signup', newUser)
//             .then((results) => {
//                 console.log("Signup", results.data)
//                 storeToken(results.data.authToken)
//                 setUser({ ...results.data.user, fullName: '' })
//                 // setUser({ ...results.data.user, fullName: '', location: ''}) removed location
//                 navigate('/profile')
//             })
//             .catch((err) => {
//                 console.log(err)
//             })

//     }

//     return (
//         <div id='auth-landing'>
//             <h1>Signup</h1>
//             <form onSubmit={handleSubmit}>

//                 <label>email</label>
//                 <input type="text" name="email" value={newUser.email} onChange={handleChange} />

//                 <label>password</label>
//                 <input type="password" name="password" value={newUser.password} onChange={handleChange} />


//                 <button type="submit">Signup</button>
//             </form>
//         </div>
//     )
// }

// export default Signup

///working on full name 11A

import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context"
import { LoadingContext } from "../context/loading.context"
import { post } from "../services/authService"

const Signup = () => {
    const { setUser } = useContext(LoadingContext)
    const { storeToken } = useContext(AuthContext)
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        fullName: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/signup', newUser)
            .then((results) => {
                console.log("Signup", results.data)
                storeToken(results.data.authToken)
                setUser({ ...results.data.user })
                navigate('/profile')
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div id='auth-landing'>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>

                <label>Full Name</label>
                <input type="text" name="fullName" value={newUser.fullName} onChange={handleChange} />

                <label>Email</label>
                <input type="text" name="email" value={newUser.email} onChange={handleChange} />

                <label>Password</label>
                <input type="password" name="password" value={newUser.password} onChange={handleChange} />

                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup