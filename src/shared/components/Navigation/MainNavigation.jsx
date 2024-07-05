import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/LogoClaimsIA.svg';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';
import { AuthContext } from '../../context/auth-context';

/**
 * The MainNavigation component is the top-level navigation component 
 * that renders the main header, navigation links, and a side drawer.
 */


const MainNavigation = () => {
    /**
   * State variable to track whether the side drawer is open or not.
   * Initially set to false, indicating the drawer is closed.
   * 
   */
    const auth = useContext(AuthContext);
//const auth = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => { //opens sideDrawer
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => { //closes sideDrawer
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      { /**
       * Render the Backdrop component only when the side drawer is open.
       * The Backdrop component is used to create a darkened background 
       * when the side drawer is open.
       */}
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          {/**
           * Render the NavLinks component inside the side drawer.
           */}
          <NavLinks />
        </nav>
      </SideDrawer>

     { /**
       * Render the MainHeader component, which contains the logo, 
       * username, and menu button.
       */}
       
      <MainHeader>
       
        <h1 className="main-navigation__title">
          {/*Wraps logo*/}
          <Link to="/">
            <img className="main-navigation__logo" src={Logo} alt="ClaimsIA" />
          </Link>
        </h1>
        
        <div className='main-navigation__left'>
          {/*Displays username ( to make dynamic) */}
          
        <h3 >Hi, {auth.userinfo?.first_name}!</h3>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        > {/* 3 spans to create the menu icon */}
          <span />
          <span />
          <span />
        </button>
        </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
