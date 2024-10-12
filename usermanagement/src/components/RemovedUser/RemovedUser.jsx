import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Store/StoreUser';
import axios from "axios";
import { FaEnvelope, FaPhone, FaStickyNote, FaTag } from 'react-icons/fa';
import './RemovedUsers.css'; // Importing the CSS file for styles

function RemovedUsers() {
  const { removeuser, setRemoveuser, users, setUsers } = useContext(UserContext);
  const [loading, setLoading] = useState(true); // Loading state

  async function fetchRemovedUsers() {
    setLoading(true); // Start loading
    try {
      let res = await axios.get("http://localhost:4000/user-api/all-removedusers");
      console.log("res remove", res);
      setRemoveuser(res.data.payload || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching removed users:", error);
    } finally {
      setLoading(false); // End loading
    }
  }

  useEffect(() => {
    fetchRemovedUsers();
  }, [setRemoveuser]);

  // Function to restore a user
  const handleRestore = async(user, index) => {
    // Add the removed user back to the users array
    let restoredUser = user;
    let answer = await axios.put(`http://localhost:4000/user-api/restore-users/${restoredUser.name}`);
    console.log(answer);
    const updatedUsers = [...users, answer.data.payload];
    setUsers(updatedUsers);

    // Remove the user from the removed users array
    const updatedRemovedUsers = removeuser.filter((_, i) => i !== index);
    setRemoveuser(updatedRemovedUsers);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Removed Users</h2>
      <div className="row justify-content-center">
        {loading ? ( // Loading state check
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : removeuser.length === 0 ? (
          <div className="text-center">
            <p>No users have been removed.</p>
          </div>
        ) : (
          removeuser.map((user, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card user-card shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="card-header text-center">
                  <h5 className="card-title">{user.name}</h5>
                </div>
                <div className="card-body">
                  <div className="user-info">
                    <FaEnvelope className="info-icon" />
                    <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                  </div>
                  {user.mobile && (
                    <div className="user-info">
                      <FaPhone className="info-icon" />
                      <h6 className="card-subtitle mb-2 text-muted">{user.mobile}</h6>
                    </div>
                  )}
                  <div className="user-info">
                    <FaStickyNote className="info-icon" />
                    <p className="lead">{user.message}</p>
                  </div>
                  <div className="user-info">
                    <FaTag className="info-icon" />
                    <p className="lead">{user.subject}</p>
                  </div>
                  <div className="button-group text-center mt-3">
                    <button className="btn btn-primary" onClick={() => handleRestore(user, index)}>
                      Restore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RemovedUsers;
