import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../context/loading.context';

const ProfileUpdate = () => {
    const { user, setUser } = useContext(LoadingContext);
    const navigate = useNavigate();

    const [updatedProfile, setUpdatedProfile] = useState({
        fullName: user.fullName,
        
    });

    const handleInputChange = (e) => {
        setUpdatedProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateProfile = () => {
        
        const updatedUser = {
            ...user,
            fullName: updatedProfile.fullName,
        
        };
        setUser(updatedUser);

        console.log('Profile updated:', updatedProfile);
        navigate('/profile'); 
    };

    return (
        <div>
            <h1>Update Profile</h1>
            {user && (
                <form onSubmit={handleUpdateProfile}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={updatedProfile.fullName}
                        onChange={handleInputChange}
                    />
                    {/* Add other fields you want to update */}
                    <button type="submit">Save Changes</button>
                </form>
            )}
        </div>
    );
};

export default ProfileUpdate;