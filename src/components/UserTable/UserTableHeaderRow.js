import React, {PropTypes} from 'react';

import SortIcon from '../SortIcon';

const UserTableHeaderRow = ({column, clickHandler, isActive, sortDirection}) => {
  return (
    <th data-field={column} onClick={() => clickHandler(column)}>
      {column}
      {isActive && <SortIcon sortDirection={sortDirection} />}
    </th>
  );

};
export default UserTableHeaderRow;

UserTableHeaderRow.propTypes = {
  column: PropTypes.string,
  clickHandler: PropTypes.func,
  isActive: PropTypes.bool,
  sortDirection: PropTypes.string
};
