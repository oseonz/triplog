function TripRegion({ regionName, onClick, selected }) {
    return (
        <div onClick={onClick} className="flex flex-col items-center gap-2">
            <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center">
                <div
                    className={`cursor-pointer px-4 py-2 ${
                        selected ? 'font-bold' : ''
                    }`}
                >
                    {regionName}
                </div>
            </div>
        </div>
    );
}

export default TripRegion;
