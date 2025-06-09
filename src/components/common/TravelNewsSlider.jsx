import React, { useEffect, useState } from 'react';

function TravelNewsSlider() {
    const articles = [
        '태안 가볼만한 곳, 은빛 해변과 모래언덕이 어우러진 만리포 해변',
        '대전가볼만한곳, 아이부터 어른까지 꽉 찬 하루 코스',
        '최초의 구산선문, 생명나눔의 시작 남원 실상사 [정용식의 사찰 기행]',
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
