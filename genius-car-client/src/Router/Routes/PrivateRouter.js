import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(user){
        return children;
    }
    if(loading) {
        return <h1 className='text-5xl'>Loading</h1>
    }


    return <Navigate to="/login" state={{from:location}} replace> </Navigate>
};

export default PrivateRouter;