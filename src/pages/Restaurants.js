import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingContext } from '../context/loading.context'


// import { getImage } from '../services/restaurants'
// removed getImage 10A Wednesday. Add back?

const Restaurants = () => {
    const { restaurants, getRestaurants } = useContext(LoadingContext);
    const [searchTerm, setSearchTerm] = useState('')

    const sort = (array) => {
        return array.sort((a, b) => a.name.common.localeCompare(b.name.common))
    }
    let searched = (array) => {
        return searchTerm ?
            array.filter((element) => element.name.common.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

            :

            array
    }
    useEffect(() => {
        if (!restaurants.length) {
            getRestaurants()

        }
        console.log(restaurants)
    }, [])

    return (
        <div>
            <h1>Restaurants</h1>

            <div id='restaurant-search'>
                <label>Find Restaurant</label>
                <input type='text' name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            </div>

            <Link to="/add-restaurant">
                <button>Add New Restaurant</button>
            </Link>
            {
                restaurants.length ?
                    <>
                        {/* { searched(sort(restaurants)) */}
                        {restaurants.map((restaurant) => {
                            return (
                                <Link to={`/restaurant/${restaurant?._id}`} key={restaurant._id}>
                                    <p>{restaurant.restaurantName}</p>
                                </Link>
                            )
                        })
                        }
                    </>
                    :
                    <p>Loading...</p>
            }
        </div>
    )
}

export default Restaurants