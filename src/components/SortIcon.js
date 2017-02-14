import React, {PropTypes} from 'react';

const SortIcon = ({sortDirection}) => {
  return (
    <i className={`material-icons sortIcon sortIcon--${sortDirection}`}>play_arrow</i>
  )
};
export default SortIcon;

SortIcon.propTypes = {
  sortDirection: PropTypes.string
};
