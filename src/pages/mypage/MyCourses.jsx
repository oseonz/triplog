import React from "react";
import MainLayout from "../../layouts/MainLayout";
import WhitePageLayout from "../../layouts/WhitePageLayout";
import { Link } from "react-router-dom";
import TripCard from "../../components/TripCard";

const cards = [
  {
    title: "Jinmi Sikdang",
    image: "https://source.unsplash.com/featured/?koreanfood",
    location: "Seoul",
    tag: "Korean BBQ",
  },
  {
    title: "Gukbap Heaven",
    image: "https://source.unsplash.com/featured/?koreanrestaurant",
    location: "Busan",
    tag: "Pork Soup",
  },
  {
    title: "Jeonju Bibimbap",
    image: "https://source.unsplash.com/featured/?bibimbap",
    location: "Jeonju",
    tag: "Bibimbap",
  },
  {
    title: "Hanok Eats",
    image: "https://source.unsplash.com/featured/?koreanfood2",
    location: "Gyeongju",
    tag: "Traditional",
  },
];

function MyCourses() {
  return (
    <MainLayout>
      <WhitePageLayout />
      <div className="min-h-screen bg-[#F3F5F6] flex justify-center pt-4">
        <div className="container">
          <div className="flex float-right">
            <Link to="../../course/builder">
              <button
                type="button"
                className="text-white bg-blue-500 border border-blue-500 px-6 py-2 hover:bg-blue-600"
              >
                코스 만들기
              </button>
            </Link>
          </div>
          <div className="pt-14">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {cards.map((card, i) => (
                  <Link to="" key={i}>
                    <TripCard
                      title={card.title}
                      image={card.image}
                      location={card.location}
                      tag={card.tag}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default MyCourses;
