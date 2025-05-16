import TabMenu from "../../components/course/kokkok-planner/common/TabMenu";
import TripCreator from "../../components/course/kokkok-planner/trip-creator/TripCreator";
import BookmarkList from "../../components/course/kokkok-planner/bookmarks/BookmarkList";
import CourseDetail from "../../components/course/kokkok-planner/course-detail/CourseDetail";
import { useEffect, useState } from "react";

function CourseBuilder() {
  const [currentTab, setCurrentTab] = useState("여행만들기");

  const renderCurrentTab = () => {
    switch (currentTab) {
      case "여행만들기":
        return <TripCreator />;
      case "찜":
        return <BookmarkList />;
      case "상세설명":
        return <CourseDetail />;
      default:
        return <TripCreator />;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex-1 overflow-hidden">{renderCurrentTab()}</div>
    </div>
  );
}

export default CourseBuilder;
