import React from "react";

const Task = ({ props }: any) => {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.11117 4.66666H24.1112C25.3334 4.66666 26.3334 5.66666 26.3334 6.88888V21.3333C26.3334 22.5555 25.3334 23.5555 24.1112 23.5555H4.11117C2.88895 23.5555 1.88895 22.5555 1.88895 21.3333V6.88888C1.88895 5.66666 2.88895 4.66666 4.11117 4.66666ZM4.11117 6.88888V21.3333H13.0001V6.88888H4.11117ZM24.1112 21.3333H15.2223V6.88888H24.1112V21.3333ZM23.0001 10.7778H16.3334V12.4444H23.0001V10.7778ZM16.3334 13.5555H23.0001V15.2222H16.3334V13.5555ZM23.0001 16.3333H16.3334V18H23.0001V16.3333Z"
        fill={props.color}
      />
    </svg>
  );
};

export default Task;
