import { useState, useEffect } from 'react';
import CourseTabs from '../../components/course/rec-course/CourseTabs';
import {
    CourseCard,
    MyCourseCard,
} from '../../components/course/rec-course/CourseCard';
import { getCourses, deleteCourse } from '../../api/course/tourBackApi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../mypage/atom/userState';
import { myCoursesState } from './atom/courseState';

function ListPage() {
    const [currentTab, setCurrentTab] = useState('best');
    const user = useRecoilValue(userState);
    const [myCourses, setMyCourses] = useRecoilState(myCoursesState);

    const handleDeleteCourse = async (courseId) => {
        const confirmed = window.confirm('정말 이 코스를 삭제하시겠습니까?');
        if (!confirmed) return;

        try {
            await deleteCourse(courseId);
            alert('✅ 코스가 삭제되었습니다.');

            const updatedList = await getCourses(user.id);
            setMyCourses(updatedList); // Recoil 상태 갱신
        } catch (err) {
            console.error('❌ 삭제 실패:', err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    //const [myCourses, setMyCourses] = useState([]);
    useEffect(() => {
        const load = async () => {
            if (!user?.id) return;
            const data = await getCourses(user.id);
            console.log('📦 내 코스 데이터:', data);
            setMyCourses(data); // ✅ Recoil로 상태 설정
        };
        load();
    }, [user?.id]);

    return (
        <div className="w-full flex flex-col items-center">
            {/* 상단 소개 영역 */}
            <section className="w-full bg-purple-100 py-10 px-6 text-center h-[400px]">
                <h2 className="text-2xl font-bold mb-6">
                    여행만들기 메뉴 소개 섹션
                </h2>
                <div className="flex justify-center gap-6">
                    <div className="bg-white p-6 rounded shadow w-60">
                        Quick tips
                    </div>
                    <div className="bg-white p-6 rounded shadow w-60">
                        디자인 이미지 섹션
                    </div>
                </div>
                <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">
                    여행만들기 바로가기
                </button>
            </section>
            <CourseTabs tab={currentTab} setTab={setCurrentTab} />

            {currentTab === 'best' && (
                <section className="w-full max-w-screen-md p-6">
                    {/* {bestCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))} */}
                    <div className="flex justify-center mt-6">
                        <button className="px-4 py-2 text-sm text-blue-500 border rounded hover:bg-blue-50">
                            더보기
                        </button>
                    </div>
                </section>
            )}

            {currentTab === 'my' && (
                <section className="w-full max-w-screen-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6">
                        {myCourses.map((course) => (
                            <MyCourseCard
                                key={course.course_id}
                                course={course}
                                onDelete={() =>
                                    handleDeleteCourse(course.course_id)
                                }
                            />
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="px-4 py-2 text-sm text-blue-500 border rounded hover:bg-blue-50">
                            더보기
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}

export default ListPage;
