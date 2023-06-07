import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/login/login.svg';
import { AuthContext } from '../../AuthProvider/AuthProvider';





const Register = () => {
    const {registerUser,user} =useContext(AuthContext);
    const handleRegister =event  =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        registerUser(email,password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            if(user.uid){
                alert('Registration Successfull');
                form.reset();
            }
        })
        .catch(error=>console.error(error))

    }
    return (
        <div className="hero min-h-screen bg-light-200">
        <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left w-1/2 pr-20">

                <img src={logo} alt="" />
            </div>
            <div className="card w-1/2  flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleRegister}>
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center">Register!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Name" className="input input-bordered" />
                        </div>
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
                            <button  className="label-text-alt link link-hover">Already have an account Please <Link to='/login' className='text-blue-400'>Login</Link></button>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Register" />

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Register;