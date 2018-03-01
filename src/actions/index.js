export const addFilter = (filter) => {
  return {
    type: 'ADD_FILTER',
    filter
  }
};

export const removeFilter = (filter) => {
  return {
    type: 'REMOVE_FILTER',
    filter
  }
};

export const clearFilters = () => {
  return {
    type: 'CLEAR_FILTERS'
  }
};
