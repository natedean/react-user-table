import React, {PropTypes} from 'react';

const SortIcon = ({sortDirection}) => {
  return (
    <span>{sortDirection}</span>
  )
};
export default SortIcon;

SortIcon.propTypes = {
  sortDirection: PropTypes.string
};
