import React from "react";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";


// Importing image assets
import profilePlaceholder from "@/assets/icons/profile-placeholder.svg";
import homeIcon from "@/assets/icons/home.svg";
import exploreIcon from "@/assets/icons/wallpaper.svg";
import peopleIcon from "@/assets/icons/people.svg";
import savedIcon from "@/assets/icons/saved.svg";
import createPostIcon from "@/assets/icons/gallery-add.svg";
import logoutIcon from "@/assets/icons/logout.svg";

const LeftSidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
  
    const handleSignOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      // Add sign-out logic here
      navigate("/sign-in");
    };
  
    return (
      <nav className="leftsidebar">
        <div className="flex flex-col gap-11">
  
          {/* Profile Placeholder */}
          <Link to="/profile" className="flex gap-3 items-center">
            <img
              src={profilePlaceholder}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">User Name</p>
              <p className="small-regular text-light-3">@username</p>
            </div>
          </Link>
  
          {/* Sidebar Links */}
          <ul className="flex flex-col gap-6">
            {[
              { route: "/", label: "Home", imgURL: homeIcon },
              { route: "/explore", label: "Explore", imgURL: exploreIcon },
              { route: "/people", label: "People", imgURL: peopleIcon },
              { route: "/saved", label: "Saved", imgURL: savedIcon },
              { route: "/create-post", label: "Create Post", imgURL: createPostIcon },
            ].map((link) => {
              const isActive = pathname === link.route;
  
              return (
                <li
                  key={link.label}
                  className={`leftsidebar-link group ${
                    isActive && "bg-primary-500"
                  }`}
                >
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4 text-dark-2 group-hover:text-white"
                  >
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      className={`group-hover:invert ${
                        isActive && "invert"
                      }`}
                    />
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
  
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={(e) => handleSignOut(e)}
        >
          <img src={logoutIcon} alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </nav>
    );
  };
  
  export default LeftSidebar;
