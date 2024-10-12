import React, { useContext } from 'react';
import { UserContext } from '../Store/StoreUser'; // Ensure the path is correct
import { useParams } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaStickyNote, FaTag } from 'react-icons/fa'; // Import icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserById.css'; // Add custom CSS for animations

function UserById() {
  const { id } = useParams();
  const { users } = useContext(UserContext);
  const user = users[id]; // Get the user by ID

  return (
    <div className="container mt-5 fade-in"> {/* Add animation class */}
      {user ? (
        <div className="card shadow user-card">
          <div className="card-header text-center">
            <h5 className="card-title">{user.name}</h5>
          </div>
          <div className="card-body">
            <p className="user-detail"><FaEnvelope className="info-icon" /> <strong>Email:</strong> {user.email}</p>
            <p className="user-detail"><FaPhone className="info-icon" /> <strong>Mobile:</strong> {user.mobile}</p>
            <p className="user-detail"><FaStickyNote className="info-icon" /> <strong>Message:</strong> {user.message}</p>
            <p className="user-detail"><FaTag className="info-icon" /> <strong>Subject:</strong> {user.subject}</p>
          </div>
        </div>
      ) : (
        <p>User not found!</p>
      )}
    </div>
  );
}

export default UserById;
