"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const AppContext = createContext<any>(undefined);

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState("task");

  return (
    <AppContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
