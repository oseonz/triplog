// 📌 일반 코스 카드 (세로형)
import { useNavigate } from 'react-router-dom';

export function CourseCard({ course }) {
    return (
        <div className="flex border p-4 mb-4 rounded shadow bg-white">
            <img
                src={course.image || '/images/no_img.jpg'}
                alt={course.title}
                className="w-24 h-24 rounded object-cover mr-4"
            />
            <div className="flex-1">
                <p className="font-bold">{course.title}</p>
                <p className="text-sm text-gray-500">{course.address}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-700">
                    <span>❤️ {course.likes}개수</span>
                    <button className="ml-auto">📚 내 코스에 담기</button>
                </div>
            </div>
        </div>
    );
}

// 📌 마이 코스 카드 (그리드형)
export function MyCourseCard({ course, onDelete }) {
    const thumbnail = course.contents?.[0]?.firstimage || '/images/no_img.jpg';
    const navigate = useNavigate();

    return (
        <div
            className="bg-white rounded-[20px] shadow-lg overflow-hidden w-70 min-w-10 relative h-[270px] mb-3"
            onClick={() => navigate(`/course/detail/${course.course_id}`)}
        >
            <div className="relative">
                <img
                    src={thumbnail}
                    onError={(e) => {
                        e.target.src = '/images/no_img.jpg';
                    }}
                    alt={course.course_name}
                    className="w-[281px] h-[150px] object-cover"
                />
                {/* <img
                    src="/images/i_trash.png"
                    className="absolute top-2 right-3 p-2 cursor-pointer transition w-[40px]"
                    alt="bookmark icon"
                /> */}
            </div>
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-[18px] text-black truncate">
                        {course.course_name}
                    </h3>
                    <p className="text-sm text-blue-500 truncate">
                        {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <img
                            src="/images/heart-o.png"
                            className="w-[23px]"
                            alt=""
                        />
                        <img
                            src="/images/i_trash.png"
                            className=" p-2 cursor-pointer transition w-[40px]"
                            alt="bookmark icon"
                            onClick={onDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
