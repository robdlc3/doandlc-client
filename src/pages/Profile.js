import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingContext } from '../context/loading.context'


const Profile = () => {
    const { user, userPosts, getUserPosts } = useContext(LoadingContext)
    return (
        <div>
            <h1>Profile</h1>
            {user &&
                <div>
                    <img id='profile-image' src={user.profilePic} alt='profile' />
                    <br />
                    {user.visitedRestaurants.length ? <p>Visited Restaurants: {user.visitedCountries.map((country) => country.commonName).join(", ")}</p>
                        : <p>No restaurant visited</p>
                    }
                    <p>Name: {user.fullName}</p>
                    <p>Age: {user.age}</p>
                    <p>Location: {user.location}</p>
                    <Link to={`/profile/${user._id}`}><button>Update Profile</button></Link>
                </div>
            }
            <h4>Posts</h4>
            <Link to='/add-post' >
                <button>Create new post</button>
            </Link>
            {
                userPosts ?
                    <div>user posts</div>
                    : <p>No posts yet.</p>
            }
        </div>
    )
}
export default Profile