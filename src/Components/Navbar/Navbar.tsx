import './Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='nav-main'>
      <NavLink className='title-link' to={'/'}>
        <h1 className='site-title'>Backcountry Bookings</h1>
      </NavLink>
    </nav>
  )
}
export default Navbar;