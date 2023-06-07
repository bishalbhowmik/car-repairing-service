import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Header = () => {

    const {logOut,user} =useContext(AuthContext);

    const handleSingout=() =>{
        logOut()
        .then(result=>{})
        .catch(error=>console.error(error));
    }

    const menuItem = <>
       <li> <Link className='font-semibold mr-4' to='/'>Home</Link></li>
        
        {
            user?.email ? 
           <> <li><Link className='font-semibold ml-4' onClick={handleSingout}>Log Out</Link></li>
            <li><Link className='font-semibold ml-4'to ='/orders'>Orders</Link></li> </>:
            <li><Link className='font-semibold' to='/login'>Login</Link></li>

        }
        
    </>
    return (
        <div className="navbar bg-light-300 h-20 mb-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <Link to='/'><img src={logo} alt="" /></Link>
            </div>
            <p>{user?.email}</p>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItem}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-outline">Apointment</button>
            </div>
        </div>
    );
};

export default Header;