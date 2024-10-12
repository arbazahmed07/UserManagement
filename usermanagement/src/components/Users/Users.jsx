import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Store/StoreUser';
import axios from "axios";
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaEnvelope, FaPhone, FaStickyNote, FaTag } from 'react-icons/fa';
import './Users.css';
import { useNavigate } from 'react-router-dom';

function Users() {
  let navigate = useNavigate();
  const { users, setUsers } = useContext(UserContext);
  const { removeuser, setRemoveuser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let res = await axios.get("http://localhost:4000/user-api/all-users");
        console.log("res", res);
        let users = res.data.payload;
        console.log(users);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [setUsers,setRemoveuser]);

  const handleEdit = (index) => {
    let a=users[index]
    console.log("a is ",a)
    navigate("/edit-user",{state:users[index]})
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleUpdate = (index, updatedUser) => {

    const updatedUsers = users.map((user, i) => (i === index ? updatedUser : user));
    setUsers(updatedUsers);
  };

  const handleDelete = async (index) => {
    const userToDelete = users[index];
  
    try {
      let res=await axios.put(`http://localhost:4000/user-api/delete-user/${userToDelete.name}`);
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      let user=res.data.paload
      setRemoveuser([...removeuser, user]); // Append the removed user to the removeuser array
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const navigator = (index) => {
    console.log(index);
    navigate(`/user/${index}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {users.map((user, index) => (
          <div key={index} className="col-md-4 mb-4 d-flex align-items-stretch">
            <div className="card user-card shadow-sm" style={{ backgroundColor: '#f8f9fa', flex: '1', minHeight: '350px' }}>
              <div className="card-header text-center">
                <h5 className="card-title">{user.name}</h5>
              </div>
              <div className="card-body d-flex flex-column justify-content-start align-items-center">
                <div className="text-center mb-3">
                  <div className="user-info">
                    <FaEnvelope className="info-icon" />
                    <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                  </div>
                  <div className="user-info">
                    <FaPhone className="info-icon" />
                    <h6 className="card-subtitle mb-2 text-muted">{user.mobile}</h6>
                  </div>
                  <div className="user-info">
                    <FaStickyNote className="info-icon" />
                    <p className="lead">{user.message.length > 50 ? `${user.message.substring(0, 50)}...` : user.message}</p>
                  </div>
                  <div className="user-info">
                    <FaTag className="info-icon" />
                    <p className="lead">{user.subject}</p>
                  </div>
                </div>
                <div className="button-group text-center mt-auto">
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(index)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                    <FaTrash /> Delete
                  </button>
                  <button className="btn btn-success ms-2" onClick={() => navigator(index)}>Read More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <EditUserModal 
          user={users[editIndex]} 
          index={editIndex} 
          onUpdate={handleUpdate} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default Users;
