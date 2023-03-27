import './Dashboard.css'
import campfire from '../../Assets/campfire.gif'

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div>
                <h1 className='title'>Backcountry Bookings</h1>
            </div>
            <div>
                <form>
                    <input type='text' placeholder='Search by name, city or zip code' className='search'>
                    </input>
                </form>
                <br />
                <button className='search-button'>
                    Search
                </button>
            </div>
            <br />
            <div>
                <h2 className='fav-campgrounds-title'>Your Favorite Campgrounds</h2>
                <img className='campfire' src={campfire} alt='A campfire'></img>
            </div>
        </div>
    )
}


export default Dashboard