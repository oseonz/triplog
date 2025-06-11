import { useSetRecoilState } from 'recoil';
import { selectedPlaceState } from '../../../../pages/course/atom/courseState';

function ListBtn({ tourTypeId, typeButton }) {
    const setSelectedPlace = useSetRecoilState(selectedPlaceState);

    const handleTabClick = (type) => {
        tourTypeId(type); // ✅ 부모에게 타입 전달 (setSelectedType 실행됨)
        setSelectedPlace(null); // ✅ 디테일 패널 닫기
    };
    return (
        <div className="flex gap-2 mt-4 px-4 pb-3">
            <button
                className={`flex-1 px-3 py-1 rounded text-white text-lg ${
                    typeButton === '12' ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={() => handleTabClick('12')}
            >
                여행지
            </button>
            <button
                className={` flex-1 px-3 py-1 rounded text-white text-lg ${
                    typeButton === '39' ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={() => handleTabClick('39')}
            >
                음식점
            </button>
        </div>
    );
}
export default ListBtn;
