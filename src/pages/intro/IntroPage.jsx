import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Home from '../../components/common/Home';
//소개 페이지
function IntroPage() {
    return (
        <MainLayout>
            <div className="relative min-h-screen">
                <div className="w-full h-[560px] bg-blue-500 overflow-hidden relative mb-5">
                    {/* 이미지 레이어 */}
                    <img
                        src="/images/homeImg1.JPG"
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                    />

                    {/* 텍스트 오버레이 */}
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                        <span className="text-white text-[96px] font-semibold text-center">
                            트립로그 =<br />
                            Trip (여행) + Log (기록)
                        </span>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full mb-5">
                    <div className="container flex flex-col items-start">
                        <p className="text-4xl font-bold">
                            <span className="text-blue-500">나만의</span> 여행을
                            기록하고 발견하는 곳
                        </p>
                        <p className="text-4xl font-bold">
                            누구보다{' '}
                            <span className="text-blue-500">쉽고 특별하게</span>{' '}
                            만드는 여행,{' '}
                            <span className="text-blue-500">트립로그</span>와
                            함께 하세요.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full">
                    <div className="w-[1200px] h-[300px] overflow-hidden relative">
                        <img
                            src="/images/introImg.jpg"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center w-full mb-5 mt-5">
                    <div className="container flex flex-col items-start">
                        <p className="text-4xl font-bold">
                            감탄을 부르는{' '}
                            <span className="text-blue-500">여행 코스</span>를
                            둘러보고,
                        </p>
                        <p className="text-4xl font-bold">
                            나만의 맞춤 여행 코스를{' '}
                            <span className="text-blue-500">직접 설계</span>할
                            수 있습니다.{' '}
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default IntroPage;
