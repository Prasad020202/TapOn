import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faIndianRupeeSign, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Buttonudash = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dropdownStyle = {
    opacity: isDropdownOpen ? 1 : 0,
    maxHeight: isDropdownOpen ? '1000px' : '0',
    visibility: isDropdownOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, max-height 0.3s ease, visibility 0.3s ease',
    width: width <= 64 * 16 ? '90px' : '150px', // Adjusted width based on the screen width
  };

  return (
    <>
      <div className=' inline-flex mr-2 text-right items-center rounded-lg'>
        <div className='user-img relative' onClick={handleDropdownToggle}>
          <img
            className='w-10 ml-5 rounded-full cursor-pointer'
            src={require("../../assets/img/gamer.png")}
            alt="..."
          />
          <div className="dropdown-content absolute bg-white border rounded mt-2 " style={dropdownStyle}>
            <ul className="list-none p-2 text-left">
              <li className="cursor-pointer py-1">
                <FontAwesomeIcon icon={faIndianRupeeSign} className="mr-2" />
                Change Plan
              </li>
              <Link to="/">
                <li className="cursor-pointer py-1">
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`ml-2 cursor-pointer ${isDropdownOpen ? 'rotate-180' : ''}`}
          onClick={handleDropdownToggle}
        />
      </div>
    </>
  );
};

export default Buttonudash;
