import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const formatDate = (date) => {
    return date ? format(date, "dd.MM.yyyy") : "kk.oo.yyyy";
  };

  return (
    <div className="flex items-center border w-[253px] rounded-md bg-[#E0E7FF33]">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat="dd.MM.yyyy"
        placeholderText={`${formatDate(startDate)} - ${formatDate(endDate)}`}
        className="date-input outline-none w-full font-rubik font-normal text-[15px] bg-[#E0E7FF33] rounded-md h-10 px-4"
      />
      <i className="icon-calendar text-[22px]"></i>
    </div>
  );
};

export default DateRangePicker;
