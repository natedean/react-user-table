import React, {PropTypes} from 'react';

const TopLoadingIndicator = ({isLoading}) => {
  return (
    <div className="topLoadingIndicator" style={{height: '1em'}}>
      {isLoading && <div className="progress" style={{position: 'absolute'}}>
        <div className="indeterminate"></div>
      </div>}
    </div>
  );
};
export default TopLoadingIndicator;

TopLoadingIndicator.propTypes = {
  isLoading: PropTypes.bool
};
