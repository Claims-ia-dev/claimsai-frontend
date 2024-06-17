import React from 'react';

import './MainHeader.css';

const MainHeader = props => { //mainheader called by main navigation
  return <header className="main-header">{props.children}</header>; 
};

export default MainHeader;
