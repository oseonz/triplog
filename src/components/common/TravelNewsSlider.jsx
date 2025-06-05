import React, { useEffect, useState } from 'react';

function TravelNewsSlider() {
    const articles = [
        '부산의 숨겨진 핫플, 영도 투어',
        '서울 도심 속 하루치기 여행',
        '제주에서 즐기는 여름 밤 바다 감성',
    ];
    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % articles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const getClass = (index) => {
        if (index === currentIndex) return 'text-blue-500 text-[18px] pb-7';
        if (
            index === (currentIndex + 1) % articles.length ||
            index === (currentIndex - 1 + articles.length) % articles.length
        )
            return 'text-black text-[18px] pb-7';
        return 'hidden';
    };

    return (
        <div className="h-[150px] py-10 flex flex-col transition-all duration-500 ease-in-out">
            {articles.map((title, i) => (
                <p key={i} className={getClass(i)}>
                    | {title}
                </p>
            ))}
        </div>
    );
}

export default TravelNewsSlider;
