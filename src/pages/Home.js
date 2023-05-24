import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div id='home' className="homeContainer">
            <h1>Welcome!</h1>

            <Link to={'/restaurants'} className="link">
                <h1>Restaurants</h1></Link>

            <Link to={'/posts'}><h1>Reviews</h1></Link>

            {/* changed posts to reviews 10AM */}

        </div>
    )
}

export default Home