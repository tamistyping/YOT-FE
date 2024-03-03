import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

   // eslint-disable-next-line no-unused-vars
  const fetchProfileData = async () => {
    try {
      const csrftoken = getCookie("csrftoken");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/users/me/`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-CSRFToken": csrftoken,
          },
        }
      );
      setProfileData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };
  
  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
  };
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const csrftoken = getCookie("csrftoken");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/users/me/`, 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-CSRFToken": csrftoken,
            },
          }
        );
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData(); 
  }, []); 
  
  return (
    <ProfileContext.Provider value={{ profileData, loading, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
