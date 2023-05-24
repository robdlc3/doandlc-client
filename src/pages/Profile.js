import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingContext } from '../context/loading.context';

const Profile = () => {
    const { user, userPosts, getUserPosts } = useContext(LoadingContext);
    const navigate = useNavigate();

    const handleUpdateProfile = () => {
        navigate('/profile-update'); // Navigate to the ProfileUpdate page
    };

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <div>
                    <img id='profile-image' src={user.profilePic} alt='profile' />
                    <br />
                    {user.visitedRestaurants.length > 0 && (
                        <p>Visited Restaurants: {user.visitedCountries.map((country) => country.commonName).join(", ")}</p>
                    )}
                    <p>Name: {user.fullName}</p>

                    <button onClick={handleUpdateProfile}>Update Profile</button>
                </div>
            )}
            <h4>Posts</h4>
            <Link to='/add-post'>
                <button>Create new post</button>
            </Link>
            {userPosts ? (
                <div>user posts</div>
            ) : (
                <p>No posts yet.</p>
            )}
        </div>
    );
};

export default Profile;
