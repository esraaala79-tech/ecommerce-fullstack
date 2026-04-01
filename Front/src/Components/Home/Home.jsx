import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mobImage from '../images/Mob1.png';
import dev1IMG from '../images/Dev1.png';
import dev2IMG from '../images/Dev2.png';
import dev3IMG from '../images/Dev3.png';
import dev4IMG from '../images/Dev4.png';


const flashSalesProducts = [
    { id: 1, name: "HAVIT HV-G92 Gamepad", price: 120, oldPrice: 160, img: dev1IMG, discount: "-40%", rating: 88 },
    { id: 2, name: "AK-900 Wired Keyboard", price: 160, oldPrice: 160, img: dev2IMG, discount: "-40%", rating: 75 },
    { id: 3, name: "IPS LCD Gaming Monitor", price: 370, oldPrice: 400, img: dev3IMG, discount: "-30%", rating: 99 },
    { id: 4, name: "S-Series Comfort Chair", price: 375, oldPrice: 400, img: dev4IMG, discount: "-25%", rating: 94 },
    { id: 5, name: "S-Series Coffee Table", price: 375, oldPrice: 400, img: dev1IMG, discount: "-35%", rating: 94 },
    { id: 6, name: "AK-900 Wired Keyboard", price: 160, oldPrice: 160, img: dev2IMG, discount: "-40%", rating: 75 },
];

export const Home = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleWishlistClick = (e) => {
        e.stopPropagation(); 
        navigate('/allproducts', { state: { message: 'Wishlist from here' } });
    };

    const handleViewClick = () => {
        navigate('/allproducts', { state: { message: 'View from here' } });
    };

    return (
        <div className="container-fluid p-0 overflow-hidden">
            {/* Hero Section */}
            <div className="d-flex align-items-center w-75 mx-auto mt-4">
                <div className='d-flex flex-column gap-2 p-3' style={{ width: "20%" }}>
                    {["Woman's Fashion", "Men's Fashion", "Electronics", "Home & Lifestyle", "Medicine", "Sports & Outdoor"].map((cat) => (
                        <div key={cat} className='d-flex justify-content-between align-items-center cursor-pointer'>
                            <button className='border-0 bg-transparent text-start p-1'>{cat}</button>
                            {(cat.includes("Fashion")) && <i className="fa-solid fa-angle-right small"></i>}
                        </div>
                    ))}
                </div>

                <div className="vr mx-3" style={{ height: "350px" }}></div>

                <div className='bg-dark w-100 m-3 rounded position-relative text-white p-5 d-flex justify-content-between align-items-center'>
                    <div>
                        <div className='d-flex align-items-center gap-3 mb-3'>
                            <i className="fa-brands fa-apple fa-4x"></i>
                            <h5 className="mb-0">iPhone 14 Series</h5>
                        </div>
                        <h1 className="display-4 fw-bold mb-4">Up to 10%<br />off Voucher</h1>
                        <a href="#" className="text-white text-decoration-none border-bottom pb-1">Shop Now →</a>
                    </div>
                    <img src={mobImage} className='img-fluid' alt="iPhone" style={{ maxWidth: "300px" }} />
                </div>
            </div>

            <div className="mt-5 mx-auto" style={{ width: "75%" }}>
                <div className='d-flex align-items-center gap-3 mb-4'>
                    <div className='bg-danger rounded' style={{ width: "20px", height: "40px" }}></div>
                    <h5 className='fw-bold text-danger m-0'>Today's</h5>
                </div>

                <div className='d-flex justify-content-between align-items-end mb-4'>
                    <div className='d-flex align-items-end gap-5'>
                        <h1 className='fw-bold mb-0'>Flash Sales</h1>
                        <div className='d-flex gap-3 text-center'>
                            {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
                                <React.Fragment key={label}>
                                    <div>
                                        <small className='fw-bold'>{label}</small>
                                        <h3 className='fw-bold mb-0'>03</h3>
                                    </div>
                                    {index !== 3 && <h3 className='text-danger mb-0'>:</h3>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className='d-flex gap-2'>
                        <button className='btn btn-light rounded-circle shadow-sm' onClick={() => scroll('left')}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button className='btn btn-light rounded-circle shadow-sm' onClick={() => scroll('right')}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Products Scroller */}
                <div
                    ref={scrollRef}
                    className="d-flex gap-4 overflow-auto pb-4 custom-scrollbar"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
                >
                    {flashSalesProducts.map((product) => (
                        <div key={product.id} style={{ flex: "0 0 270px" }}>
                            <div className="card border-0 position-relative group">
                                <div className="bg-light rounded p-3 position-relative" style={{ height: "250px" }}>
                                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">{product.discount}</span>
                                    <div className='position-absolute top-0 end-0 m-2 d-flex flex-column gap-2'>
                                        <button onClick={handleWishlistClick} className="btn btn-white bg-white rounded-circle shadow-sm p-1">
                                            <i className="fa-regular fa-heart"></i>
                                        </button>
                                        <button onClick={handleViewClick} className="btn btn-white bg-white rounded-circle shadow-sm p-1">
                                            <i className="fa-regular fa-eye"></i>
                                        </button>
                                    </div>
                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                        <img src={product.img} alt={product.name} className="img-fluid" style={{ maxHeight: "150px" }} />
                                    </div>
                                    <button className="btn btn-dark w-100 position-absolute bottom-0 start-0 opacity-0 group-hover-visible">Add To Cart</button>
                                </div>
                                <div className="card-body px-0">
                                    <h6 className="fw-bold text-truncate">{product.name}</h6>
                                    <div className="d-flex gap-3">
                                        <span className="text-danger fw-bold">${product.price}</span>
                                        <span className="text-muted text-decoration-line-through">${product.oldPrice}</span>
                                    </div>
                                    <div className="text-warning mt-2 small">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`fa-star ${i < 4 ? 'fa-solid' : 'fa-regular'}`}></i>
                                        ))}
                                        <span className="text-secondary ms-2">({product.rating})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5 mb-5">
                    <button className='btn btn-danger px-5 py-3' onClick={handleViewClick}>View All Products</button>
                </div>
                <hr />
            </div>
        </div>
    );
};