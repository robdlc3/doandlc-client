import './App.css';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddPost from './pages/AddPost';
import ProfileUpdate from './pages/ProfileUpdate';
import AddRestaurant from './pages/AddRestaurant';


function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }


  return (
    <div className="App">

      <Navbar />
      <h1>đồ ăn DLC</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/restaurant/:id' element={<RestaurantDetails />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:id' element={<PostDetails />} />


        <Route element={<NotLoggedIn />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>


        <Route element={<LoggedIn />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:id' element={<ProfileUpdate />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/add-restaurant' element={<AddRestaurant />} />
        </Route>

      </Routes>

      <h2>

      </h2>
    </div>
  );
}

export default App;
