import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faIndianRupeeSign,  faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../pages/auth/firebase';
import { doc, getDoc } from 'firebase/firestore';

import tempImg from "../../assets/img/temp_user.png"

const Buttonudash = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const[userID, setUserID] = useState("");

  const[displayPhoto, setDisplayPhoto] = useState("");


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
  
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User object:", user);
        setUserID(user.uid);
        getData(user.uid);

      } else {
        console.log("No user is signed in.");
      }
      
    });

    // Clean up subscription on unmount
    return () => unsubscribe(userID);
  }, []);

  const getData = async (userId) => {
    if (!userId) {
      console.log("User ID is not set.");
      return;
    }

    const docRef = doc(db, "UserInfo", userId);
    const docData = await getDoc(docRef);
    if(docData.data().Profile_URl == "" || docData.data().Profile_URl == null){
      setDisplayPhoto(tempImg)
    }else{
      setDisplayPhoto(docData.data().Profile_URl);
    }
  };

  const dropdownStyle = {
    opacity: isDropdownOpen ? 1 : 0,
    maxHeight: isDropdownOpen ? '1000px' : '0',
    visibility: isDropdownOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, max-height 0.3s ease, visibility 0.3s ease',
    width: '100px',
    
    
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Loged Out");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      
        <div className=' inline-flex mr-2 text-right items-center rounded-lg'>
          
          <div className='user-img relative' onClick={handleDropdownToggle}>
            <img
              className='w-10 ml-5 rounded-full cursor-pointer'
              src={displayPhoto}
              alt="..."
            />
            <div className="dropdown-content absolute bg-white border rounded mt-2 " style={dropdownStyle}>
              <ul className="list-none p-2 text-left">
                <li className="cursor-pointer py-1">
                  <Link to={'/auth/plans'}>
                    <FontAwesomeIcon icon={faIndianRupeeSign}  className="mr-2" />
                    Change Plan
                  </Link>
                </li>

                <li className="cursor-pointer py-1" onClick={handleSignOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </li>

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
