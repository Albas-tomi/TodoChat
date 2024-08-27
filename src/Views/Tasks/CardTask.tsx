import EditPen from "@/components/Icons/EditPen";
import Time from "@/components/Icons/Time";
import { differenceInDays, format, startOfDay } from "date-fns";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

const CardTask = ({
  task,
  handleCheckboxChange,
  handleDelete,
}: {
  task: any;
  handleCheckboxChange: (id: string) => void;
  handleDelete: (id: string) => void;
}) => {
  const calculateDaysBetween = (
    startTimestamp: number,
    endTimestamp: number
  ): number => {
    // Konversi timestamp dari detik ke milidetik
    const startTimeMiili = startTimestamp * 1000;
    const endTimeMillis = endTimestamp * 1000;

    // Buat objek Date dari timestamp
    const startDate = new Date(startTimeMiili);
    const endDate = new Date(endTimeMillis);

    // Set kedua tanggal ke awal hari (00:00:00)
    const startOfStartDay = startOfDay(startDate);
    const startOfEndDay = startOfDay(endDate);

    // Hitung selisih hari
    const dayDiff = differenceInDays(startOfEndDay, startOfStartDay);

    return dayDiff;
  };
  return (
    <div key={task.id} className="join join-vertical w-full">
      <div className="collapse collapse-arrow pr-7 relative join-item border-base-300 border">
        <input type="checkbox" name="my-accordion-4" />
        <div className="collapse-title text-xl flex gap-7 font-medium">
          <input
            checked={task.isChecked ? true : false}
            onChange={() => handleCheckboxChange(task.id)}
            className="w-[18px] z-30 h-[18px] my-1"
            type="checkbox"
          />
          <div className="flex items-center  justify-between gap-7 w-full ">
            <p
              className={`text-[#4F4F4F] text-base font-semibold ${
                task.isChecked ? "line-through text-[#828282]" : ""
              }`}
            >
              {task.taskName}
            </p>
            <div className="flex justify-center items-center gap-4">
              <p className="text-red-600 text-xs">
                {(() => {
                  const daysLeft = calculateDaysBetween(
                    task.createdAt,
                    task.deadline
                  );
                  if (daysLeft === 0) {
                    return "Last Today";
                  } else if (daysLeft > 0) {
                    return `${daysLeft} days left`;
                  } else {
                    return "Task expired";
                  }
                })()}
              </p>
              <p className="text-[#4F4F4F] text-xs">
                {format(new Date(task.deadline * 1000), "dd/MM/yyyy")}
              </p>
            </div>
          </div>
        </div>
        <p className="absolute top-[23px] right-2 collapse-open">
          <HiDotsHorizontal className="text-[#4F4F4F]" />
        </p>
        <div className="collapse-content pl-[4.5%]">
          {/* Card */}
          <div className=" flex gap-4  ">
            <div className=" flex flex-col gap-4 w-full">
              <div className="flex  items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Time />
                  <input
                    className="border cursor-not-allowed border-[#828282] rounded-md h-[40px] w-[193px] px-1"
                    type="date"
                    defaultValue={format(
                      new Date(task.deadline * 1000),
                      "yyyy-MM-dd"
                    )}
                  />
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 border pr-8 w-[126px] h-[43px]  rounded-sm"
                >
                  delete
                </button>
              </div>
              <div className="flex items-center gap-3 ">
                <EditPen />
                <p>{task.description}</p>
              </div>
            </div>
          </div>
          {/* End Card */}
        </div>
      </div>
    </div>
  );
};

export default CardTask;
