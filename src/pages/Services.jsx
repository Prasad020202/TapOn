
import React, { useEffect, useState } from "react";
import { auth, db, imageDb } from "../pages/auth/firebase";

import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";


import { Tilt } from "react-tilt";
import Button from "../components/Navbars/Button";
import styled from "styled-components";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const ServiceCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2%;
  /* background-color: aquamarine;  */
  width: 65%;
  height: fit-content;
  padding: 10px;
  margin-bottom: 2%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 64em) {
    width: 100%;
  }
`;

const Servicecards = styled.div`
  display: flex;
  width: fit-content;
  min-width: 15vh;
  min-height: 7vh;
  height: fit-content;
  background-color: #000000;
  box-shadow: 1px 1px black;

  border-radius: 20px;
  padding: 2%;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
  border: solid 3px #c3cbdc;
`;

const Cardcontent = styled.div`
  font-size: 16px;
  font-weight: 500;

  color: white;
  font-style: italic;
`;

const Services = () => {

    const [displayServices, setDisplayServices] = useState([]);

    const [showServiceModal, setShowServiceModal] = React.useState(false);

    const [userID, setUserID] = useState("");

    const [showModal, setShowModal] = React.useState(false);

    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("User object:", user);
            setUserID(user.uid);
            // Call getData with the user ID directly

            getData(user.uid);

          } else {
            console.log("No user is signed in.");
          }
        });
        
        // Clean up subscription on unmount
        return () => unsubscribe();
      }, []);

      useEffect(() => {
        if (userID) {
          getData(userID);
        }
      }, [userID]);

      const getData = async (userId) => {
        if (!userId) {
          console.log("User ID is not set.");
          return;
        }
      
        const docRef = doc(db, "UserInfo", userId);
        const docData = await getDoc(docRef);
      
        if (docData.exists()) {
          // Ensure that Services is an array before setting the state
          const servicesData = docData.data().Services || [];
          setDisplayServices(servicesData);
        } else {
          console.log("No such document!");
        }
      };
      

  const[indexEdit, setIndexEdit] = useState();
    
  const [services, setServices] = useState([]);

  const handleAddMore = () => {
    // Create a new service object with a unique index and empty values
    const newService = { id: services.length +  1 , name: '', description: '', serviceURL: '' };
  
    // Get the current services from Firestore
    const userRef = doc(collection(db, "UserInfo"), userID);
    getDoc(userRef).then((docData) => {
      if (docData.exists()) {
        // Get the current array of services, or initialize as an empty array if not present
        const currentServices = docData.data().Services || [];
  
        // Add the new service to the current array
        const updatedServices = [...currentServices, newService];
  
        // Update the Firestore document with the new array of services
        updateDoc(userRef, { Services: updatedServices })
          .then(() => {
            console.log("New service added successfully.");
            // Update the local state with the new service
            setServices(updatedServices);
            setDisplayServices(updatedServices);
          })
          .catch((error) => {
            console.error("Error adding new service:", error);
          });
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };
  
  
  
  

  // Handlers for updating service fields
const handleServiceChange = (event, index) => {
  const newServices = [...services];
  newServices[index].name = "";
  setServices(newServices);
};

const handleDescriptionChange = (event, index) => {
  const newServices = [...services];
  newServices[index].description = "";
  setServices(newServices);
};

const addServicesInNewWay = (e) => {
  e.preventDefault();

  // Assuming 'userID' is the ID of the user whose services you want to update
  const userRef = doc(collection(db, "UserInfo"), userID);

  // Get the updated services array
  const updatedServices = services.map((service, idx) => {
    // If this is the service being edited, return the updated service object
    if (idx === indexEdit) {
      return {
        id: service.id,
        name: service.name,
        description: service.description,
        serviceURL: service.serviceURL
      };
    }
    // Otherwise, return the original service object
    return service;
  });

  // Prepare the data to be updated
  const data = {
    Services: updatedServices,
  };

  // Update the document in Firestore
  updateDoc(userRef, data)
    .then(() => {
      alert("Service updated successfully.");
      setShowServiceModal(false); // Close the modal after successful update
    })
    .catch((error) => {
      console.error("Error updating service:", error);
    });
};


  const[updateNameService, setUpdateNameService] = useState("");

  const[updateDescService, setUpdateDescService] = useState("");

  const[updateImgService, setUpdateImgService] = useState("");


   const openModal = (i) =>{
        setIndexEdit(i);
        setShowServiceModal(true);
    }
  
    const updateMyService = async (index) => {
      try {
        // Get the document reference
        const docRef = doc(collection(db, "UserInfo"), userID);
    
        // Get the document
        const docData = await getDoc(docRef);
    
        // Get the current array
        const currentArray = docData.data().Services;
    
        // Check if the index is within the array bounds
        if (index >=  0 && index < currentArray.length) {
          // Update the name and desc properties of the object at the specified index
          // Keep the other properties of the object and the other elements of the array unchanged
          currentArray[index].name = updateNameService;
          currentArray[index].description = updateDescService;
    
          // Update the document with the modified array
          await updateDoc(docRef, { Services: currentArray });
    
          // Update the local state with the modified array
          setServices(currentArray);
          setDisplayServices(currentArray);
    
          alert("Service updated successfully.");
        } else {
          console.log('Index out of bounds');
        }
      } catch (error) {
        console.error('Error updating object properties: ', error);
      }
    };
    

  const [photoService, setUpdatePhotoService] = useState("");

  const uploadImageService1 = (e,i) => {
    EditServiceImage(e,i);
  };

  const EditServiceImage = async (e, index) => {
    e.preventDefault();
  
    const imgRef = ref(imageDb, `services/${userID}/service${index +  1}`);
    const uploadTask = uploadBytesResumable(imgRef, photoService);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress handling (e.g., update a progress bar)
      },
      (error) => {
        // Error handling
        console.error(error);
        // Alert the user about the error
      },
      async () => {
        const downloadURL = await getDownloadURL(imgRef);
  
        // Update Firestore with download URL
        const userRef = doc(collection(db, "UserInfo"), userID);
  
        const docData = await getDoc(userRef);
  
        // Get the current array
        const currentArray = docData.data().Services;
  
        if (index >=  0 && index < currentArray.length) {
          // Update the serviceURL property of the object at the specified index
          // Keep the other properties of the object and the other elements of the array unchanged
          currentArray[index].serviceURL = downloadURL;
  
          const data = { Services: currentArray };
  
          // Update the document with the modified array
          await updateDoc(userRef, data);
  
          // Update the local state with the modified array
          setServices(currentArray);
          setDisplayServices(currentArray);
  
          alert("Service image updated successfully.");
        } else {
          console.log('Index out of bounds');
        }
  
        console.log("Document updated with download URL:", downloadURL);
        // Alert the user about successful upload and update
      }
    );
  };
  

  const deleteMyService = async (index) => {
    try {
      // Get the document reference
      const docRef = doc(collection(db, "UserInfo"), userID);
  
      // Get the document
      const docData = await getDoc(docRef);
  
      // Get the current array
      const currentArray = docData.data().Services;
  
      // Check if the index is within the array bounds
      if (index >=  0 && index < currentArray.length) {
        // Remove the service at the specified index
        const updatedServices = currentArray.filter((_, idx) => idx !== index);
  
        // Update the document with the modified array
        await updateDoc(docRef, { Services: updatedServices });
  
        // Update the local state with the modified array
        setServices(updatedServices);
        setDisplayServices(updatedServices);
  
        setShowServiceModal(false)
      } else {
        console.log('Index out of bounds');
      }
    } catch (error) {
      console.error('Error deleting service: ', error);
    }
  };
  

  return (
    <>

                <h3 className=" font-bold text-xl">Services</h3>
              <div className="mt-5" onClick={() => setShowModal(true)}>
                <Button text="Add Service +"/>
                <button onClick={handleAddMore} >btn</button>
                </div>

 

                <ServiceCardsContainer>
  {displayServices && displayServices.map((service, index) => (
    <Tilt
      className="Tilt"
      options={{
        max:  40,
        perspective:  1000,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        scale:  1.05,
      }}
    >
      <Servicecards key={index} onClick={() => openModal(index)}>
        <Cardcontent>{service.name ? service.name : "Click to Add"} </Cardcontent>
      </Servicecards>
    </Tilt>
   ))}
                </ServiceCardsContainer>


          {showServiceModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div
                      id="divmodwid"
                      className="border-0 rounded-lg shadow-lg relative w-2/5 my-6 mx-auto  "
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Edit Service {indexEdit+1} details
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => {
                              setShowServiceModal(false);
                            }}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              x
                            </span>
                          </button>
                        </div>

                        {/*body*/}
                        <div className="relative p-6 flex flex-row h-full">
                          <div className="relative z-0 w-full mb-5 group">
                          <input
                                maxLength="16"
                                type="text"
                                name="repeat_password"
                                id="floating_repeat_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={updateNameService}
                                onChange={(e) => {setUpdateNameService(e.target.value)}}
                              />
                    

                                <label
                                  for="floating_repeat_password"
                                  className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  Service Name
                                </label>
                          </div>

                        </div>

                        <div className="ml-6 mb-2">
                          <div className="relative z-0 w-full mb-5 group">
                          <input
                                  maxLength="16"
                                  type="text"
                                  name="repeat_password"
                                  id="floating_repeat_password"
                                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=" "
                                  value={updateDescService}
                                    onChange={(e) => {setUpdateDescService(e.target.value)}}
                                />
                                <label
                                  for="floating_repeat_password"
                                  className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  Description
                                </label>
                          </div>
                        </div>


                        <div className="ml-6 mb-2">
                          <input
                            type="file"
                            placeholder="Upload Your Profile Pic"
                            onChange={(e) => setUpdatePhotoService(e.target.files[0])}
                          />
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              EditServiceImage(e, indexEdit);
                            }}
                          >
                            Add Image
                          </button>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowServiceModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={()=>{deleteMyService(indexEdit)}}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={()=>{updateMyService(indexEdit)}}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}

    </>
  )
}

export default Services