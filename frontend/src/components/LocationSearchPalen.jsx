import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPalen = ({
  suggestions = [],
  onSuggestionClick,
  // setvehiclePanel,
  // setPalenOpen,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 mt-15 ">
        {suggestions.length === 0 && (
          <div className="text-gray-400 text-center py-4">No suggestions</div>
        )}
        {suggestions.map((locat, idx) => (
          <div
            key={idx}
            onClick={() => {
              onSuggestionClick(locat);
              // setvehiclePanel(true);
              // setPalenOpen(true);
            }}
            className="flex border-2 border-gray-100 active:border-black rounded-2xl p-3 items-center gap-4 cursor-pointer"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500">
              <FaLocationDot className="text-white" />
            </div>
            <h2>{locat.display_name || locat}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default LocationSearchPalen;
