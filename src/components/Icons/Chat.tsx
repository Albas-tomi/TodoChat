import React from "react";

const Chat = ({ props }: any) => {
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
        d="M18.4443 3.11072H3.99984C3.38873 3.11072 2.88873 3.61072 2.88873 4.22183V19.7774L7.33318 15.3329H18.4443C19.0554 15.3329 19.5554 14.8329 19.5554 14.2218V4.22183C19.5554 3.61072 19.0554 3.11072 18.4443 3.11072ZM17.3332 5.33286V13.1106H6.41097L5.75541 13.7662L5.11097 14.4106V5.33286H17.3332ZM21.7776 7.55518H23.9998C24.611 7.55518 25.111 8.05518 25.111 8.66629V25.333L20.6665 20.8885H8.44429C7.83317 20.8885 7.33317 20.3885 7.33317 19.7774V17.5552H21.7776V7.55518Z"
        fill={props.color}
      />
    </svg>
  );
};

export default Chat;
