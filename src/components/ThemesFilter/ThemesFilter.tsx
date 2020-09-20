import React, { FC, useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { useFilterContext } from '../../context/FilterContext';
import { CHATTER_TOKEN_COOKIE, removeCookie } from '../../services/cookie';
import { useThemesListLazyQuery } from '../../services/theme/useThemesLazyQuery';
import { FilterClear, FilterHeader, FilterInput, FilterPopupList, FilterPopupListItem, FilterWrapper } from './ThemesFilterStyled';
import { Button } from '../Button';
import { ButtonSizes } from '../Button/Button';

// may be this filter should be implemented via any filter control
// which support pagination (infinite scroll), but currently I think it's enough
const PAGE_SIZE = 50;

// parts of this components could be moved to stand alone component (cascader selector)
const ThemesFilter: FC = () => {
  const [focused, setFocused] = useState<boolean>(false);
  const [load, { data, error }] = useThemesListLazyQuery();
  const [value, setValue] = useState<string>('');
  // also we can save it to url query params for sharing page purpose
  const { setThemeId, themeId } = useFilterContext();

  useEffect(() => load({ limit: PAGE_SIZE, offset: 0 }), []);

  useEffect(() => {
    // if theme id is cleared outside this component
    if (!themeId) {
      setValue('');
    }
  }, [themeId]);

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target) {
      const { value } = event.target;
      setValue(value);

      // auto clear filter if user removes all symbols from input
      if (!value) {
        setThemeId(null);
      }
    }
  };

  const handleFilterItemClick = (themeId: number, themeName: string) => () => {
    setThemeId(themeId);
    setValue(themeName);
  };

  const handleClear = () => {
    setValue('');
    setThemeId(null);
  };

  // blur event fires befor click event on popup list item (TODO: check possibility refactor it to outside click handler)
  const handleOnBlur = () => setTimeout(() => setFocused(false), 200);

  const handleLogout = () => {
    removeCookie(CHATTER_TOKEN_COOKIE);
    navigate('/login');
  };

  if (error) {
    return <div>{error}</div>;
  }

  // filter themes by input value
  const filteredData = value ? data.filter(theme => theme.name.toLowerCase().includes(value.toLowerCase())) : data;

  return (
    <FilterWrapper>
      <FilterHeader>
        <h4>Filter by Theme</h4>
        <Button size={ButtonSizes.XS} onClick={handleLogout}>
          Log Out
        </Button>
      </FilterHeader>
      {(value || themeId) && <FilterClear onClick={handleClear}>&times;</FilterClear>}
      <FilterInput
        value={value}
        placeholder="Type theme name..."
        onChange={handleOnInputChange}
        onFocus={() => setFocused(true)}
        onBlur={handleOnBlur}
      />
      {focused && !!filteredData?.length && (
        <FilterPopupList>
          {filteredData.map(theme => (
            <FilterPopupListItem onClick={handleFilterItemClick(theme.id, theme.name)} key={theme.id}>
              {theme.name}
            </FilterPopupListItem>
          ))}
        </FilterPopupList>
      )}
    </FilterWrapper>
  );
};

export default ThemesFilter;
