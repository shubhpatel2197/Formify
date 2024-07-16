import React, { createContext, useContext } from 'react';

const FormContext = createContext<number | undefined>(undefined);

export const useFormCount = () => {
  return useContext(FormContext);
};

export const FormProvider: React.FC<{ formCount: number; children: React.ReactNode }> = ({ formCount, children }) => {
  return (
    <FormContext.Provider value={formCount}>
      {children}
    </FormContext.Provider>
  );
};
