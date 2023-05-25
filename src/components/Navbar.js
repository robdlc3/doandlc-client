import { Link } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from "../context/auth.context"
const Navbar = () => {

    const { logOutUser } = useContext(AuthContext)
    const getToken = () => {
        return localStorage.getItem('authToken')
    }

    return (
        <nav className="navbar-container">
            <Link to='/'>Home</Link>
            <Link to='/restaurants'>Restaurants</Link>
            {/* <Link to='/posts'>Reviews</Link> */}
            {/* Changed Posts to reviews 10A */}
            {
                getToken() ?
                    <>

                        <Link to='/add-restaurant'>Add Restaurant</Link>
                        <Link to='/profile'>Profile</Link>
                        <button onClick={logOutUser}>Logout</button>
                    </>
                    :
                    <>
                        <Link to='/signup'>Sign Up</Link>
                        <Link to='login'>Login</Link>
                    </>
            }
        </nav>
    )
}
export default Navbar