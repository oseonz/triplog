import { useState } from "react";
import CourseTabs from "../../components/course/rec-course/CourseTabs";
import {
  CourseCard,
  MyCourseCard,
} from "../../components/course/rec-course/CourseCard";

const dummyCourses = [
  {
    id: 1,
    title: "전주 한옥마을 여행",
    address: "전북 전주시 완산구 한옥마을길",
    image: "/images/jeonju.jpg",
    likes: 42,
  },
  // 추가 항목들...
];

function ListPage() {
  const [currentTab, setCurrentTab] = useState("best");

  //const bestCourses = [...]; // 베스트 코스
  //const myCourses = [...];   // 나의 코스

  const bestCourses = [
    {
      id: 1,
      title: "경주 역사 여행",
      address: "경북 경주시",
      image: "/images/gyeongju.jpg",
      likes: 50,
    },
  ];

  const myCourses = [
    {
      id: 101,
      title: "부산 해운대 코스",
      address: "부산 해운대구",
      image: "/images/haeundae.jpg",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 상단 소개 영역 */}
      <section className="w-full bg-purple-100 py-10 px-6 text-center h-[400px]">
        <h2 className="text-2xl font-bold mb-6">여행만들기 메뉴 소개 섹션</h2>
        <div className="flex justify-center gap-6">
          <div className="bg-white p-6 rounded shadow w-60">Quick tips</div>
          <div className="bg-white p-6 rounded shadow w-60">
            디자인 이미지 섹션
          </div>
        </div>
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">
          여행만들기 바로가기
        </button>
      </section>
      <CourseTabs tab={currentTab} setTab={setCurrentTab} />

      {currentTab === "best" && (
        <section className="w-full max-w-screen-md p-6">
          {bestCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 text-sm text-blue-500 border rounded hover:bg-blue-50">
              더보기
            </button>
          </div>
        </section>
      )}

      {currentTab === "my" && (
        <section className="w-full max-w-screen-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {myCourses.map((course) => (
              <MyCourseCard key={course.id} course={course} />
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
