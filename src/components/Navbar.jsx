import React, { useContext, useRef } from "react";
import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";
import OutlineBtn from "./OutlineBtn";
import PrimaryBtn from "./PrimaryBtn";
import CircleIcon from "./CircleIcon";
import logo from "../assets/images/ZapShift-logo.png";
import Container from "./Container";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const drawerCheckbox = useRef(null);
  const {user,logOut} = useContext(AuthContext)

  const handleNavClick = () => {
    if (drawerCheckbox.current) {
      drawerCheckbox.current.checked = false;
    }
  };

  const handleLogOut = ()=>{
    alert('are you sure to log out')
    logOut()
  }

  const navlinks = (
    <>
      <NavLink to="/services" onClick={handleNavClick}>
        <li className="linkStyle">Services</li>
      </NavLink>
      <NavLink to="/coverage" onClick={handleNavClick}>
        <li className="linkStyle">Coverage</li>
      </NavLink>
      <NavLink to="/about" onClick={handleNavClick}>
        <li className="linkStyle">About Us</li>
      </NavLink>
      <NavLink to="/sendParcel" onClick={handleNavClick}>
        <li className="linkStyle">Send Parcel</li>
      </NavLink>
      <NavLink to="/beRider" onClick={handleNavClick}>
        <li className="linkStyle">Be a Rider</li>
      </NavLink>

      {user && <NavLink to="/dashboard/myParcels" onClick={handleNavClick}>
        <li className="linkStyle">My Parcels</li>
      </NavLink>}
    </>
  );

  return (
    <Container>
      <nav className="bg-white rounded-2xl md:px-8 px-4 md:py-2">
        <nav className="py-4 flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <ul className="lg:flex hidden items-center gap-8 font-semibold text-lg">
            {navlinks}
          </ul>

          <div className="xl:flex hidden items-center gap-4 font-semibold text-lg">
            {user?<button onClick={handleLogOut}><OutlineBtn className="rounded-xl">Log Out</OutlineBtn></button>:<NavLink to='/login'><OutlineBtn className="rounded-xl">Sign In</OutlineBtn></NavLink>}
            <div className="flex items-center gap-0.5">
              <PrimaryBtn className="rounded-xl">Be a Rider</PrimaryBtn>
              <CircleIcon />
            </div>
          </div>

          <div className="block xl:hidden">
            <div className="drawer">
              <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                ref={drawerCheckbox}
              />
              <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn drawer-button">
                  <Menu />
                </label>
              </div>
              <div className="drawer-side w-5/10">
                <label htmlFor="my-drawer" aria-label="close sidebar"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4 font-semibold">
                  {navlinks}

                  <div onClick={handleNavClick}>
                    <OutlineBtn className="rounded-xl w-full">
                      Sign In
                    </OutlineBtn>
                  </div>
                  <div
                    className="flex items-center gap-0.5"
                    onClick={handleNavClick}
                  >
                    <PrimaryBtn className="rounded-xl w-10/12">
                      Be a Rider
                    </PrimaryBtn>
                    <CircleIcon />
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </nav>
    </Container>
  );
};

export default Navbar;
