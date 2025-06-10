import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
    '/images/homeImg1.JPG',
    '/images/homeImg2.JPG',
    '/images/homeImg3.jpg',
    '/images/homeImg4.jpg',
];

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="w-full h-[560px] bg-blue-500 overflow-hidden">
            <Slider {...settings}>
                {images.map((src, i) => (
                    <div key={i} className="w-full h-[560px]">
                        <img
                            src={src}
                            alt={`slide-${i}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Home;
