import React from 'react';
import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';

const About = () => {
    return (

        <div className="hero min-h-screen bg-light-300">
            <div className="hero-content flex-col lg:flex-row">
                <div className='w-1/2 relative '>
                    <img src={person}  alt='imag'className="max-w-sm rounded-lg shadow-2xl h-auto" />
                    <img src={parts} alt='imag' className="max-w-sm rounded-lg shadow-2xl w-3/5 absolute right-3 top-1/2 border-8" />

                </div>

                <div className='w-1/2'>
                    <p className= 'text-orange-500'>About us</p>
                    <h1 className="text-4xl font-bold py-3">We are qualified <br /> & of experience <br /> in this field</h1>
                    <p className="py-6 w-4/5">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <button className="btn btn-secondary">Get More Info</button>
                </div>
            </div>
        </div>

    );
};

export default About;