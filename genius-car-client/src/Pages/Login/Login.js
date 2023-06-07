import React, { useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/login/login.svg';
import { AuthContext } from '../../AuthProvider/AuthProvider';



const Login = () => {
    const {user,signIn} =useContext(AuthContext);
    const navigate = useNavigate();
    const location =useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin =event  =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
    
        

        signIn(email,password)
        .then(result =>{
            const user=result.user;
            console.log(user);
            const currentUser = {email:user.email};


            ////

            fetch('http://localhost:5000/jwt',{
                    method:'POST',
                    headers: {
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    localStorage.setItem('geniusToken',data.token);
                });
            
                
                // navigate(from, {replace:true})
            
        })
        .catch(error=>console.error(error));
    }
    return (
        <div className="hero min-h-screen bg-light-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-1/2 pr-20">

                    <img src={logo} alt="" />
                </div>
                <div className="card w-1/2  flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin}>
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-center">Login!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" name='password' placeholder="password" className="input input-bordered" />
                                <button className="label-text-alt link link-hover">Don not have a account <Link className='text-orange-400' to='/register'>Sign Up</Link></button>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Login" />

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;