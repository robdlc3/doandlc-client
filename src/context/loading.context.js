import { createContext, useState } from "react";
import { get } from "../services/authService";
import axios from 'axios'

const LoadingContext = createContext()
const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [restaurant, setRestaurant] = useState(null)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [posts, setPosts] = useState([])
    const [userPosts, setUserPosts] = useState(null)

    const getRestaurants = () => {

        axios.get("https://ih-countries-api.herokuapp.com/countries")
            .then((results) => {
                setRestaurants(results.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const findRestaurant = (id) => {
        console.log("finding")
        let thisRestaurant = restaurants.find((restaurant) => restaurant._id === id)
        console.log("this restaurant", thisRestaurant)
        setRestaurant(thisRestaurant)
    }

    const getPosts = () => {
        get('/posts')
            .then((results) => {
                console.log("retrieved posts", results.data)
                setPosts(results.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getUserPosts = (id) => {
    }

    return (
        <LoadingContext.Provider value={{ restaurants, user, isLoading, setIsLoading, setUser, getRestaurants, findRestaurant, restaurant, getUserPosts, buttonDisabled, setButtonDisabled, posts, setPosts, getPosts }} >
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingContext, LoadingProvider }