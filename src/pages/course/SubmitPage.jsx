import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import { getCourseDetail } from '../../../src/api/course/tourBackApi';
import MapView from '../../components/course/kokkok-planner/common/MapView';

export default function SubmitPage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCourseDetail(courseId);
                setCourse(data);
            } catch (error) {
                console.error('코스 상세정보 불러오기 실패:', error);
            }
        };
        fetchData();
    }, [courseId]);

    if (!course) return <div className="p-6">로딩 중...</div>;

    const firstPlace = course.contents?.[0];

    return (
        <div className="w-full px-6 py-8">
            {/* 상단: 제목, 일정, 주소 */}
            <div className="mb-4">
                <div className="text-sm bg-gray-200 px-2 py-1 inline-block rounded">
                    {course.schedule || '일정 정보 없음'}
                </div>
                <h1 className="text-3xl font-bold mt-2">
                    {course.course_name}
                </h1>
                <p className="text-gray-500 mt-1">
                    {firstPlace?.addr || '주소 정보 없음'}
                </p>
            </div>

            {/* 지도 */}
            <div className="mb-6">
                <MapView places={course.contents} />
            </div>

            {/* 설명 */}
            <div className="bg-gray-100 p-4 mb-4 rounded text-lg font-medium">
                {Array.isArray(course.description)
                    ? course.description.join('\n')
                    : course.description || '설명이 없습니다.'}
            </div>

            {/* 썸네일 리스트 */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {course.contents.map((place, index) => (
                    <div
                        key={place.contentid}
                        onClick={() => setSelectedIndex(index)}
                        className={`min-w-[100px] p-2 rounded cursor-pointer border ${
                            index === selectedIndex ? 'bg-blue-100' : 'bg-white'
                        }`}
                    >
                        <img
                            src={place.firstimage || '/images/no-image.jpg'}
                            alt={place.title}
                            className="w-full h-20 object-cover rounded"
                        />
                        <p className="text-sm text-center mt-1">
                            {place.title}
                        </p>
                    </div>
                ))}
            </div>

            {/* 선택된 장소 상세 정보 */}
            <div className="border-t pt-4">
                <h2 className="text-xl font-bold mb-2">
                    {selectedIndex + 1}. {course.contents[selectedIndex]?.title}
                </h2>
                <p className="text-gray-500 mb-2">
                    {course.contents[selectedIndex]?.addr}
                </p>

                {/* 이미지 갤러리 자리 (현재는 샘플 박스) */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-200 h-32 flex items-center justify-center text-sm text-gray-600">
                        추가 이미지
                    </div>
                    <div className="bg-gray-200 h-32 flex items-center justify-center text-sm text-gray-600">
                        추가 이미지
                    </div>
                </div>

                <p className="text-gray-700 whitespace-pre-wrap">
                    {course.contents[selectedIndex]?.overview ||
                        '장소에 대한 설명이 없습니다.'}
                </p>
            </div>
        </div>
    );
}
