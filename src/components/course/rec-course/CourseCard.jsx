// 📌 일반 코스 카드 (세로형)
export function CourseCard({ course }) {
  return (
    <div className="flex border p-4 mb-4 rounded shadow bg-white">
      <img
        src={course.image || "/images/no_img.jpg"}
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
  return (
    <div className="bg-white shadow rounded p-3">
      <img
        src={course.image || "/images/no_img.jpg"}
        alt={course.title}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <p className="font-semibold text-sm truncate">{course.title}</p>
      <p className="text-xs text-gray-500 truncate">{course.address}</p>
    </div>
  );
}
