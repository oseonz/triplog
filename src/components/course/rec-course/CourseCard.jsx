// 📌 일반 코스 카드 (세로형)
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
export function MyCourseCard({ course }) {
    const thumbnail = course.contents?.[0]?.firstimage || '/images/no_img.jpg';

    return (
        <div className="bg-white rounded-[20px] shadow-lg overflow-hidden w-64 min-w-10 relative">
            <div className="relative">
                <img
                    src={thumbnail}
                    onError={(e) => {
                        e.target.src = '/images/no_img.jpg';
                    }}
                    alt={course.course_name}
                    className="w-[277px] h-[250px] object-cover"
                />
                <img
                    src="/images/i_bookmarks2.png"
                    className="absolute top-2 right-3 p-2 cursor-pointer transition"
                    alt="bookmark icon"
                />
            </div>
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <p className="text-sm text-blue-500">
                        {course.description}
                    </p>
                    <h3 className="text-[18px] text-black">
                        {course.course_name}
                    </h3>
                    <div className="flex items-center">
                        <img
                            src="/images/heart-o.png"
                            className="w-[23px]"
                            alt=""
                        />
                        <span>{course.shared_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
