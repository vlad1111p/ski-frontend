import React, {useEffect, useRef, useState} from "react";
import avatar from "assets/img/team-1-800x800.jpg";

const UserDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="text-blueGray-500 block focus:outline-none"
            >
                <div className="items-center flex">
          <span
              className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
                alt="user avatar"
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={avatar}
            />
          </span>
                </div>
            </button>

            {open && (
                <div
                    className="absolute right-0 mt-2 bg-white text-base z-50 py-2 list-none text-left rounded shadow-lg min-w-48">
                    <a
                        href="#profile"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap text-blueGray-700"
                        onClick={(e) => e.preventDefault()}
                    >
                        Profile
                    </a>
                    <a
                        href="#settings"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap text-blueGray-700"
                        onClick={(e) => e.preventDefault()}
                    >
                        Settings
                    </a>
                    <div className="h-0 my-2 border border-solid border-blueGray-100"/>
                    <a
                        href="#logout"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap text-blueGray-700"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    >
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
