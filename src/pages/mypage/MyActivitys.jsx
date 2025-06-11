import React, { useState, useEffect } from 'react';
import WhitePageLayout from '../../layouts/WhitePageLayout';
import MainLayout from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import TripCard from '../../components/common/TripCard.jsx';
import { userState } from '../mypage/atom/userState';
import { useRecoilValue } from 'recoil';
import { myRemarks } from '../../api/common/remarksApi.js';

const TABS = ['댓글', '좋아요'];

function MyActivitys() {

    const [myRemarksData, setMyRemarksData] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const { id } = useRecoilValue(userState); // 유저id
    const [user_id, setUser_id] = useState(id);


  useEffect(() => {
    myRemarks(id).then((data) => {
        console.log('받은 응답:', data);
        if (data && Array.isArray(data?.items)) {
            setMyRemarksData(data.items);
            setTotalPages(data.items.totalPages || 1);
            console.log(data.items);
        } else {
            console.error('❌ 댓글 목록이 없음', data);
            setMyRemarksData([]);
        }
    });
  },[currentPage]);


    return (
        <MainLayout>
            <WhitePageLayout />
            <div className="min-h-screen bg-[#F3F5F6] flex justify-center">
                <div className="container">
                    <div className="pt-7">

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {Array.isArray(myRemarksData) && myRemarksData.map((item, i) => (
                            <div key={i} className='mb-5'>
                                <p>{item.user_nickname}</p>
                                <div className='flex justify-between'>
                                    <div>
                                        {item.comment.split('\n').map((line, idx) => (
                                        <p key={idx}>{line}</p>
                                        ))}
                                    </div>
                                    <div>{user_id == item.user_id ? <button>X</button> : null }</div>
                                </div>
                            </div>
                        ))} 



                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default MyActivitys;
