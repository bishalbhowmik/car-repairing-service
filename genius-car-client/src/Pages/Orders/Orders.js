import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import OrdersRow from './OrdersRow';


const Orders = () => {
    const { user,logOut } = useContext(AuthContext);
    console.log(user);
    
    const [items, setItems] = useState();
    
    console.log(items);
    

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`,{
            headers:{
                authorization: `Bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => {
                if(res.status===401 || res.status===403){
                    return logOut();
                }
                return res.json();
            })
            .then(data => setItems(data));
    }, [user?.email]);

    const handleDelete =id =>{
        fetch(`http://localhost:5000/orders/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data =>{
            if(data.deletedCount>0){
                alert ('Deleted successfully');
                const remaining = items.filter(its =>its._id !== id);
                setItems(remaining);
                
            }

           
        })
    }

    const handleUpdate = id =>{
        fetch(`http://localhost:5000/orders/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({status:'APPROVED'})
        })
        .then(res =>res.json())
        .then(data =>{
            if(data.modifiedCount>0){
                const remaining = items.filter(itr=>itr._id !== id);
                const approved = items.find(itr=>itr._id=== id);
                approved.status = 'APPROV';
                const newItem = [approved, ...remaining ];
                setItems(newItem);
            }
        })
    }

    return (
        <div>
            <h2>Order Page{items?.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        items?.map(item=><OrdersRow
                        key={item._id}
                        item ={item}
                        dele = {handleDelete}
                        update = {handleUpdate}
                        ></OrdersRow>)
                       }
     
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;