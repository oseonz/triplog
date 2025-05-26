<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { fetchTourPlaces } from "../../api/course";
import { fetchDetailIntro } from "../../api/course"; // 상세정보 API 추가
<<<<<<< HEAD
import MapView from "../../components/kokkok-planner/common/MapView.jsx";
import TabMenu from "../../components/kokkok-planner/common/TabMenu.jsx";
import ListBtn from "../../components/kokkok-planner/trip-creater/ListBtn.jsx";
import SearchBar from "../../components/kokkok-planner/trip-creater/SearchBar.jsx";
import DetailPanel from "../../components/kokkok-planner/trip-creater/DetailPanel.jsx";
import HeaderBar from "../../components/kokkok-planner/common/HeaderBar.jsx";
=======
import MapView from "../../components/course/kokkok-planner/common/MapView.jsx";
import TabMenu from "../../components/course/kokkok-planner/common/TabMenu.jsx";
import ListBtn from "../../components/course/kokkok-planner/trip-creator/ListBtn.jsx";
import SearchBar from "../../components/course/kokkok-planner/trip-creator/SearchBar.jsx";
import DetailPanel from "../../components/course/kokkok-planner/trip-creator/DetailPanel.jsx";
import HeaderBar from "../../components/course/kokkok-planner/common/HeaderBar.jsx";
>>>>>>> ddavid
=======
import { useState } from "react";
import TripCreator from "../../components/course/kokkok-planner/trip-creator/TripCreator";
>>>>>>> origin/refactor/new-structure

function CourseBuilder() {
  const [currentTab, setCurrentTab] = useState("여행만들기");

  return <TripCreator currentTab={currentTab} setCurrentTab={setCurrentTab} />;
}

export default CourseBuilder;
