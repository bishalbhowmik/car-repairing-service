import React from 'react';
import './BannerItem.css';

const BannerItem = ({slide}) => {
    const {image,id,prev,next} =slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='img-gradient'>
                <img src={image} alt='ima' className="w-full rounded-xl" />
            </div>

            <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-3/4">
                <button className="btn btn-active btn-secondary mr-4">Discover More</button>
                <button className="btn btn-outline btn-accent">Latest Project</button>

            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-1/2">
                <p className='text-white'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 left-24 right-5 top-1/4">
                <h1 className='font-bold text-white text-6xl'>Affordable <br /> Price For Car <br /> Servicing</h1>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-4">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;