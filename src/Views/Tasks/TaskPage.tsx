"use client";
import EditPen from "@/components/Icons/EditPen";
import Time from "@/components/Icons/Time";
import { differenceInDays, format, startOfDay } from "date-fns";
import { taskServices } from "@/services/task";
import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import FormModal from "./FormModal";
import CardTask from "./CardTask";
import { toast } from "sonner";

const TaskPage = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [dataDisplay, setDataDisplay] = useState<any>(tasks);
  const [filterKey, setFilterKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<string>("");

  const getAllTasksData = async () => {
    setIsLoading("");
    try {
      setIsLoading("getData");
      const { data } = await taskServices.getAllTask();
      setTasks(data);
      setIsLoading("");
    } catch (error) {
      console.log(error);
      setIsLoading("");
    }
  };

  const handleFilterData = () => {
    let result = tasks;
    if (filterKey === "") {
      setDataDisplay(tasks);
    }
    if (filterKey === "mytask" || filterKey === "urgent") {
      result = tasks.filter((task: any) => task.category === filterKey);
    }
    setDataDisplay(result);
  };

  useEffect(() => {
    handleFilterData();
  }, [filterKey, tasks]);

  const handleCheckboxChange = async (id: string) => {
    // Perbarui hanya task yang relevan
    const dataUpdate = tasks.map((task: any) =>
      task.id === id ? { ...task, isChecked: !task.isChecked } : task
    );

    // Dapatkan task yang diperbarui
    const updatedTask = dataUpdate.find((task: any) => task.id === id);
    setIsLoading("");

    try {
      setIsLoading("getData");

      // Kirim hanya task yang diperbarui ke API
      const result = await taskServices.updateTask(id, {
        isChecked: updatedTask.isChecked,
      });
      // Perbarui state jika update berhasil
      if (result.status === 200) {
        setTasks(dataUpdate);
        toast.success("Task updated successfully");
        getAllTasksData();
        setIsLoading("");
      }
    } catch (error) {
      console.log(error);
      setIsLoading("getData");
      toast.error("Failed to update task");
    }
  };

  const handleAddTask = async (values: any) => {
    setIsLoading("");

    try {
      setIsLoading("addData");
      const result = await taskServices.createTask(values);
      if (result.status === 201) {
        (
          document.getElementById("modal_add_task") as HTMLDialogElement
        )?.close();
        getAllTasksData();
        toast.success("Task added successfully");
        setIsLoading("");
      }
    } catch (error) {
      console.log(error);
      setIsLoading("");
      toast.error("Failed to add task");
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading("");

    try {
      setIsLoading("getData");
      const result = await taskServices.deleteTask(id);
      if (result.status === 200) {
        getAllTasksData();
        toast.success("Task deleted successfully");
        setIsLoading("");
      }
    } catch (error) {
      console.log(error);
      setIsLoading("");
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    getAllTasksData();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between   py-6 pl-24 pr-6">
        <select
          className="border rounded-md text-center w-[118px] h-[40px] px-3 "
          onChange={(e) => setFilterKey(e.target.value)}
          name="category"
          id="category"
        >
          <option value="">All Task</option>
          <option value="mytask">My Tasks</option>
          <option value="urgent">Urgent Task</option>
        </select>
        <button
          onClick={() =>
            (
              document.getElementById("modal_add_task") as HTMLDialogElement
            )?.showModal()
          }
          className="w-[101px] rounded-md h-[35px] text-white bg-[#2F80ED]"
        >
          add task
        </button>
      </div>
      {isLoading === "getData" ? (
        <div className="flex justify-center z-[-10] absolute top-0 w-screen items-center h-screen">
          <span className="loading loading-ring w-28"></span>{" "}
        </div>
      ) : (
        <>
          {dataDisplay?.length > 0 ? (
            dataDisplay?.map((task: any) => (
              <CardTask
                key={task.id}
                task={task}
                handleDelete={handleDelete}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))
          ) : (
            <div className="text-center">No Task</div>
          )}
        </>
      )}

      <>
        <FormModal handleAddTask={handleAddTask} isLoading={isLoading} />
      </>
    </div>
  );
};

export default TaskPage;
