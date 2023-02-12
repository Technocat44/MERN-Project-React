import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <Header className='header'>
            <div className='logo'>
                <Link to ='/'>Support Desk</Link>
            </div>
            
        </Header >
    )
}

export default Header
