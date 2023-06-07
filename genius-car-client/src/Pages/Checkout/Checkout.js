import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import checkout from '../../assets/images/checkout/checkout.png';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import './Checkout.css';

const Checkout = () => {

    const{user} = useContext(AuthContext);

    const serviceData = useLoaderData();
    const { title,email,_id,price } = serviceData;
  

    const handleCheckout = event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.fname.value} ${form.lname.value}`;
        const phone =form.phone.value;
        const email =form.email.value;
        const message = form.message.value;

        const order ={
            service:_id,
            service_name:title,
            email,
            name: name,
            phone: phone,
            message,
            price
        }

        fetch(`http://localhost:5000/orders`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                alert('Order Added');
                form.reset();
            }
            console.log(data);
        })
        
    }

    return (
        <div>
            <div>
                <img src={checkout} alt="checkout" />
            </div>

            <div className='h-auto bg-slate-50 p-20'>
                <h2 className='text-3xl  text-black mb-4 text-center' >Service Name: {title}  &&    Price: ${price}</h2>
                <form onSubmit={handleCheckout}>
                    <div className='grid  gap-2 grid-cols-1 md:grid-cols-2 mb-3'>
                        <input type="text" name="fname" placeholder="First Name" className="m-3 input input-bordered w-3/4" />
                        <input type="text" name="lname" placeholder="Last Name" className="m-3 input input-bordered w-3/4" />
                        <input type="text" name="phone" placeholder="Phone Number" className="m-3 input input-bordered w-3/4" />
                        <input type="text" name="email" defaultValue={user?.email} placeholder="Email" className="m-3 input input-bordered w-3/4" />
                    </div>
                    <textarea name="message" className="textarea ml-4 text-container " placeholder="Details About Your Order"></textarea>
                    <input className="btn btn-container ml-4 my-4" type="submit" value="Order Confirm" />
                </form>
            </div>
        </div>
    );
};

export default Checkout;