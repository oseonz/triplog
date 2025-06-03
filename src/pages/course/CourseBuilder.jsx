import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { courseDataState } from '../course/atom/courseState';
import {
    fetchTourPlaces,
    fetchDetailIntro,
} from '../../api/course/tourSearchApi.js';
import { getLikes } from '../../api/course/placeLikes.jsx';
import TripCreator from '../../components/course/kokkok-planner/trip-creator/TripCreator.jsx';
import { checkLike } from '../../api/course/placeLikes.jsx';
import { getFavorites } from '../../api/course/favoritesApi.jsx';
import { userState } from '../mypage/atom/userState.js';

const init = [
    {
        user: [
            {
                username: '한성용',
                userid: 2,
                useremail: 'test@naver.com',
            },
        ],

        typeOneList: [],
        typeTwoList: [],
    },
];

function CourseBuilder() {
    const [currentTab, setCurrentTab] = useState('여행만들기'); // ✅ 상태 선언 추가!
    const setCourseData = useSetRecoilState(courseDataState);
    const { id } = useRecoilValue(userState);

    function tourData(type) {
        fetchTourPlaces(type).then((data) => {
            console.log(data);
            Promise.all(
                data.map((item) =>
                    Promise.all([
                        getLikes(item.contentid),
                        fetchDetailIntro(item.contentid, item.contenttypeid),
                        checkLike(id, item.contentid),
                        getFavorites(id, item.contentid),
                    ]).then(([like, detail, mylike, favorite]) => {
                        console.log('##########' + mylike.my_check);
                        const firstFavorite = Array.isArray(favorite)
                            ? favorite[0]
                            : null;
                        return {
                            ...item,
                            likes_count: like,
                            detail: detail,
                            mylike: mylike.my_check,
                            favorite: firstFavorite?.favorites_id ?? null,
                        };
                    }),
                ),
            ).then((dataWithLikesAndDetail) => {
                if (type == 12) {
                    setCourseData((prevData) => ({
                        ...prevData,
                        typeOneList: dataWithLikesAndDetail,
                    }));
                } else {
                    setCourseData((prevData) => ({
                        ...prevData,
                        typeTwoList: dataWithLikesAndDetail,
                    }));
                }
            });
        });
    }

    useEffect(() => {
        tourData(12);
        tourData(39);
    }, []);

    useEffect(() => {
        checkLike('1', '126273').then((res) => {
            console.log('test' + res);
        });
    }, []);

    useEffect(() => {
        getFavorites(id, '12').then((res) => {
            console.log('✅ favorite 응답값:', res);
            console.log('✅ JSON형태로 보기:', JSON.stringify(res));
            res.forEach((item) => {
                console.log('❤️ 찜한 장소:', item.title, item.contentid);
            });
        });
    }, []);

    return <TripCreator />;
}

export default CourseBuilder;
