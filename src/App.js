
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails';
import Posts from './pages/Posts';
import { PostDetails } from './pages/PostDetails';

function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/restaurant/:id' element={<RestaurantDetails />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:id' element={<PostDetails />} />


      </Routes>

      <h1>đồ ăn DLC</h1>
      <h2>

      </h2>
    </div>
  );
}

export default App;
