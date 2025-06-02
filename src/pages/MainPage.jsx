import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HomeLayout from '../layouts/HomeLayout';
import TripCard from '../components/common/TripCard.jsx';
import Home from '../components/common/Home.jsx';
//메인페이지
function MainPage() {
    return (
        <MainLayout>
            <>
                <div className="min-h-screen text-white bg-white">
                    <Home />
                    <div className="container items-center m-auto mt-12">
                        <div className="flex justify-between items-center pb-[30px]">
                            <span className="text-2xl text-black font-bold">
                                BEST TOP4 여행 코스
                            </span>
                        </div>
                        <div>
                            {/* <TripCard
                key={i}
                title={place.title}
                image={place.image}
                description={place.description}
              /> */}
                        </div>
                    </div>
                </div>
            </>
        </MainLayout>
    );
}

export default MainPage;
