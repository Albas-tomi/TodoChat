import { Field, Form, Formik } from "formik";
import React from "react";
import { IoMdClose } from "react-icons/io";

const FormModal = ({
  handleAddTask,
}: {
  handleAddTask: (data: any) => void;
}) => {
  return (
    <dialog id="modal_add_task" className="modal">
      <div className="modal-box ">
        <h3 className="font-bold text-lg">Add Your Task</h3>
        <button
          onClick={() =>
            (
              document.getElementById("modal_add_task") as HTMLDialogElement
            )?.close()
          }
          className="absolute right-4 top-4"
        >
          <IoMdClose className="text-2xl" />
        </button>
        <div className="modal-action">
          <Formik
            initialValues={{
              id: Math.floor(Date.now() * Math.random()), // Using `Math.floor` to get a whole number
              taskName: "",
              description: "",
              category: "",
              createdAt: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
              deadline: "" as any, // Will be converted in onSubmit
              isChecked: false,
            }}
            onSubmit={(values, { resetForm }) => {
              // Konversi `deadline` ke Unix timestamp
              if (values.deadline) {
                const deadlineDate = new Date(values.deadline);
                values.deadline = Math.floor(deadlineDate.getTime() / 1000);
              }

              // Handle adding the task (e.g., sending data to backend)
              handleAddTask(values);

              // Reset form values
              resetForm({
                values: {
                  id: Math.floor(Date.now() * Math.random()),
                  taskName: "",
                  description: "",
                  category: "",
                  createdAt: Math.floor(Date.now() / 1000),
                  deadline: "" as any,
                  isChecked: false,
                },
              });
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-2 w-full">
                <div className="relative mt-2">
                  <Field
                    type="text"
                    id="taskName"
                    placeholder=" "
                    name="taskName"
                    required
                    className={`block w-full px-4 py-4  border ${
                      errors.taskName && touched.taskName
                        ? "border-red-600"
                        : "border-black"
                    }  rounded-md focus:outline-none peer `}
                  />

                  <label
                    htmlFor="taskName"
                    className="absolute left-2 top-4 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-valid:-translate-y-7 peer-valid:scale-75 bg-white px-1"
                  >
                    Task Name
                  </label>
                </div>
                <div className="relative mt-2">
                  <Field
                    type="text"
                    as="select"
                    id="category"
                    placeholder=" "
                    name="category"
                    required
                    className={`block w-full px-4 py-4  border ${
                      errors.category && touched.category
                        ? "border-red-600"
                        : "border-black"
                    }  rounded-md focus:outline-none peer `}
                  >
                    <option value="">Category</option>
                    <option value="mytask">My Task</option>
                    <option value="urgent">Urgent Task</option>
                  </Field>
                </div>
                <div className="relative mt-2">
                  <Field
                    component="textarea"
                    type="text"
                    id="description"
                    placeholder=" "
                    name="description"
                    required
                    className={`block w-full px-4 py-4 border ${
                      errors.description && touched.description
                        ? "border-red-600"
                        : "border-black"
                    } rounded-md focus:outline-none peer`}
                  />

                  <label
                    htmlFor="firstName"
                    className="absolute left-2 top-4 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-valid:-translate-y-7 peer-valid:scale-75 bg-white px-1"
                  >
                    Description
                  </label>
                </div>
                <div className="relative mt-2">
                  <Field
                    id="deadline"
                    type="date"
                    placeholder=" "
                    name="deadline"
                    required
                    className={`block w-full px-4 py-4 border ${
                      errors.deadline && touched.deadline
                        ? "border-red-600"
                        : "border-black"
                    } rounded-md focus:outline-none peer`}
                  />

                  <label
                    htmlFor="firstName"
                    className="absolute left-2 top-4 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-valid:-translate-y-7 peer-valid:scale-75 bg-white px-1"
                  >
                    Deadline
                  </label>
                </div>
                <button className="btn" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </dialog>
  );
};

export default FormModal;
