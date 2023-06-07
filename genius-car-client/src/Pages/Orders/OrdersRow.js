import React, { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';

const OrdersRow = ({item,dele,update}) => {
    const {_id,name,price,service_name,phone,service,status} = item;

   

    const [order, setOrder] = useState({});
    
    useEffect(()=>{
        fetch(`http://localhost:5000/services/${service}`)
        .then(res=>res.json())
        .then(data=>setOrder(data));
    },[service]);



    return (
        <tr>
            <th>
                <label>
                    <Button onClick={()=>dele(_id)} className='btn btn-ghost'>X</Button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">

                        {
                            order?.img &&  <img src={order?.img} alt="Avatar Tailwind CSS Component" />
                        }

                           
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {service_name}
                <br />
                <span className="badge badge-ghost badge-sm">Price ${price}</span>
            </td>
            <td>Purple</td>
            <th>
                <button 
                onClick={()=>update(_id)}
                className="btn btn-ghost btn-xs">{
                    status ? status : 'Pending'
                }</button>
            </th>
        </tr>

    );
};

export default OrdersRow;