import React, {
  FC, createContext, useContext, useState,
} from 'react';

interface FilterContextProps {
  themeId: number;
  setThemeId: (themeId: number) => void;
  clearFilters: () => void;
}

export const FilterContext = createContext<FilterContextProps>({
  themeId: null,
  setThemeId: () => {},
  clearFilters: () => {},
});

export const FilterProvider: FC = ({ children }) => {
  const [themeId, setThemeId] = useState<number>();

  const handleSelectThemeId = (themeId: number) => setThemeId(themeId);

  const handleClearFilters = () => setThemeId(null);

  return (
    <FilterContext.Provider value={{ themeId, setThemeId: handleSelectThemeId, clearFilters: handleClearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
