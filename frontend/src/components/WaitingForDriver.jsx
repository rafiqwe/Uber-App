import { FaAngleDown } from "react-icons/fa";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { RiCurrencyLine } from "react-icons/ri";

const WaitingForDriver = ({ setwaitingForDriver, downIcon2 }) => {
  return (
    <div>
      <div className=" flex items-center justify-center mb-1 -mt-2 ">
        <div
          onClick={() => {
            setwaitingForDriver(false);
          }}
          ref={downIcon2}
          className="h-1 w-10 bg-gray-600 rounded-full"
        ></div>
      </div>
      <div className="flex justify-between mb-5">
        <img
          className="h-18 ml-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt="car img"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">MD Rabbi</h2>
          <h3 className="text-xl font-medium">MR34-231-1</h3>
          <p className="text-sm text-gray-600">Maruti suzuki alto</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 flex-col ">
        <div className="w-full">
          <div className="flex mb-3 items-center gap-4 w-full border-b-1 p-2  border-gray-400">
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <FaLocationDot className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">542/42-R</h2>
              <h2 className="text-gray-500 text-sm">
                North Mawna sheepur, Gazipur
              </h2>
            </div>
          </div>
          <div className="flex mb-3 items-center gap-4 w-full border-b-1 p-2  border-gray-400">
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <FaMapLocationDot className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">542/42-R</h2>
              <h2 className="text-gray-500 text-sm">
                North Mawna sheepur, Gazipur
              </h2>
            </div>
          </div>
          <div className="flex mb-3 items-center gap-4 w-full p-2 ">
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <RiCurrencyLine className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">192.30 Tk</h2>
              <h2 className="text-gray-500 text-sm">Cash Cash</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
