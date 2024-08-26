"use client";
import EditPen from "@/components/Icons/EditPen";
import Time from "@/components/Icons/Time";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import { useAppContext } from "@/lib/context";
import { fetcher } from "@/lib/swr";
import { taskServices } from "@/services/task";
import AppContext from "antd/es/app/context";
import React, { useContext, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import useSWR, { mutate } from "swr";

const TaskPage = () => {
  const [tasks, setTasks] = React.useState<any>([]);

  const getAllTasksData = async () => {
    try {
      const { data } = await taskServices.getAllTask();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = async (id: string) => {
    // Perbarui hanya task yang relevan
    const dataUpdate = tasks.map((task: any) =>
      task.id === id ? { ...task, isChecked: !task.isChecked } : task
    );

    // Dapatkan task yang diperbarui
    const updatedTask = dataUpdate.find((task: any) => task.id === id);

    try {
      // Kirim hanya task yang diperbarui ke API
      const result = await taskServices.updateTask(id, {
        isChecked: updatedTask.isChecked,
      });
      // Perbarui state jika update berhasil
      if (result.status === 200) {
        setTasks(dataUpdate);
        mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Task`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDaysBetween = (startDate: any, endDate: any) => {
    const start: any = new Date(startDate);
    const end: any = new Date(endDate);
    const today: any = new Date();
    console.log(end);

    // Hitung selisih dalam milidetik
    const diffInMs = end - start;
    const daysDiff = diffInMs / (1000 * 60 * 60 * 24);

    if (today > end) {
      // Jika hari ini sudah melewati deadline
      return -1;
    } else if (
      today === end // Jika hari ini adalah deadline
    ) {
      // Jika hari ini adalah deadline
      return 0;
    } else if (start > today) {
      // Jika tanggal mulai ada di masa depan
      return -1;
    } else {
      // Selisih hari yang valid
      return daysDiff;
    }
  };

  const convertTimestampToDate = (timestamp: any) => {
    // Mengonversi timestamp dari detik ke milidetik
    const date = new Date(timestamp * 1000);

    // Format tanggal menggunakan date-fns
    const formattedDate = format(date, "yyyy-MM-dd");

    return formattedDate;
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await taskServices.deleteTask(id);
      if (result.status === 200) {
        alert("Task deleted successfully");
        getAllTasksData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasksData();
  }, []);

  return (
    <div>
      <div className="flex justify-between  py-6 pl-24 pr-6">
        <select
          className="border rounded-md text-center w-[118px] h-[40px] px-3 "
          name="category"
          id="category"
        >
          <option value="all">My Tasks</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
        <button className="w-[101px] rounded-md h-[35px] text-white bg-[#2F80ED]">
          add task
        </button>
      </div>
      {tasks?.map((task: any) => (
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
                    task.isChecked ? "line-through" : ""
                  }`}
                >
                  {task.taskName}
                </p>
                <div className="flex justify-center items-center gap-4">
                  <p className="text-red-600 text-xs">
                    {calculateDaysBetween(task.createdAt, task.deadline) ===
                    0 ? (
                      "Last Today"
                    ) : calculateDaysBetween(task.createdAt, task.deadline) >
                      0 ? (
                      <>
                        {calculateDaysBetween(task.createdAt, task.deadline)}{" "}
                        days left
                      </>
                    ) : (
                      <>Task expired</>
                    )}
                  </p>
                  <p className="text-[#4F4F4F] text-xs">
                    {convertTimestampToDate(task.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            <p className="absolute top-[23px] right-2 collapse-open">
              <HiDotsHorizontal />
            </p>
            <div className="collapse-content pl-[4.5%]">
              {/* Card */}
              <div className=" flex gap-4  ">
                <div className=" flex flex-col gap-4 w-full">
                  <div className="flex  items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Time />
                      <input
                        className="border border-[#828282] rounded-md h-[40px] w-[193px] px-1"
                        type="date"
                        defaultValue={convertTimestampToDate(task.createdAt)}
                      />
                    </div>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 border pr-4 w-[126px] h-[43px]  rounded-sm"
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
      ))}
    </div>
  );
};

export default TaskPage;
