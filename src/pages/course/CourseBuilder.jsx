import { useState } from "react";
import TripCreator from "../../components/course/kokkok-planner/trip-creator/TripCreator";

function CourseBuilder() {
  const [currentTab, setCurrentTab] = useState("여행만들기");

  return <TripCreator currentTab={currentTab} setCurrentTab={setCurrentTab} />;
}

export default CourseBuilder;
