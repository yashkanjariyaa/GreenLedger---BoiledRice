import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useState } from "react";

import './calendar.css'
const Calendar = () => {
  //Calendar:
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);


  return (
    <div className="h-[27rem]">
      <DateRangePicker
        className=" p-1 border-black border-2 w-full h-full absolute"
        onChange={(item) => {
          if (item.selection.startDate && item.selection.endDate) {
            setRange([
              {
                startDate: item.selection.startDate,
                endDate: item.selection.endDate,
                key: "selection", // or any other appropriate key
              },
            ]);
          }
        }}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={range}
        direction="horizontal"
      />
    </div>
  );
};

export default Calendar;
