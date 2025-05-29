function TripRegion({ regionName, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2">
      <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center">
        <span className="text-white text-lg font-bold"></span>
      </div>
      <span className="text-gray-800">{regionName}</span>
    </div>
  );
}

export default TripRegion;
