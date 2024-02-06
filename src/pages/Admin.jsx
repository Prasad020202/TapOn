import { debugErrorMap } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './auth/firebase';

const Admin = () => {
  const [data, setData] = useState([]);
  const collectionRef = collection(db, "UserInfo");

  useEffect(() => {
    const getCollectionData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setData(documents);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors gracefully, e.g., display an error message
      }
    };

    getCollectionData();
  }, []);

  return (
    <div>
      <h2>User Information</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Link</th>
            <th>Instagram Link</th>
            <th>Facebook Link</th>
            <th>X_Link</th>
            {/* <th>Desc</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.data.User_Name}</td>  
              <td>{user.data.PhoneNumber}</td> 
              <td>{user.data.PhoneNumber}</td> 
              <td>{user.data.Address}</td> 
              <td>{user.data.Link}</td> 
              <td>{user.data.Instagram_Link}</td> 
              <td>{user.data.Facebook_Link}</td> 
              <td>{user.data.X_Link}</td> 
              {/* <td>{user.data.Desc}</td>  */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
