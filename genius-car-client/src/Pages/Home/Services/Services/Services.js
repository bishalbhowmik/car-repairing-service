import React, { useEffect, useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';

const Services = () => {
    const [services, setServices] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div>
            <div className='text-center'>
                <p className="text-2xl text-orange-600 font-bold">Services</p>
                <h1 className='text-4xl text-black'>Our Services Area</h1>
                <p className=''>the majority have suffered alteration in some form, by injected   humour, or randomised words which don't <br />look even slightly believable. </p>
            </div>
            <div className='py-5 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid:cols-3'>
                {
                    services?.map(service => <ServiceCard

                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>

        </div>
    );
};

export default Services;