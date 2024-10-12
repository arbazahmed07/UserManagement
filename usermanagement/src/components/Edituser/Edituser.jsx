import React, { useContext, useState } from 'react';
import { UserContext } from '../Store/StoreUser';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import './Edituser.css'; // Assuming this is where your CSS is

function Edituser() {
  const { state } = useLocation(); // Getting state passed from previous route
  const navigate = useNavigate();
  const { users, setUsers } = useContext(UserContext);

  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle loading spinner

  // Initialize useForm without defaultValues since we'll use value directly
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  // Watch the name field
  const name = watch('name', state?.name); // Default to state.name

  const onSubmit = async (data) => {
    // Start the loading spinner
    setIsSubmitting(true);
    
    // Handle form submission logic here
    data.name = name; // Add name to data before submission
    data.status = true;

    try {
      let res = await axios.put(`http://localhost:4000/user-api/edit-user/${data.name}`, data); // Send the entire data
      console.log("edit res", res);
      
      // Optionally, navigate to another page or show a success message
      navigate('/users'); // Adjust the path based on your routes
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      // Stop the loading spinner
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5 form-container">
      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group position-relative mb-3">
                  <i className="fas fa-user position-absolute"></i>
                  <input
                    {...register('name')}
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Name"
                    defaultValue={state?.name} // Use defaultValue for initial value
                    disabled={true} // Keep name field disabled
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="form-group position-relative mb-3">
                  <i className="fas fa-envelope position-absolute"></i>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    defaultValue={state?.email} // Use defaultValue for initial value
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="form-group position-relative mb-3">
                  <i className="fas fa-mobile-alt position-absolute"></i>
                  <input
                    {...register('mobile', { required: 'Mobile number is required' })}
                    type="tel"
                    className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                    placeholder="Mobile Number"
                    defaultValue={state?.mobile} // Use defaultValue for initial value
                  />
                  {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
                </div>

                <div className="form-group position-relative mb-3">
                  <i className="fas fa-clipboard position-absolute"></i>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                    placeholder="Subject"
                    defaultValue={state?.subject} // Use defaultValue for initial value
                  />
                  {errors.subject && <div className="invalid-feedback">{errors.subject.message}</div>}
                </div>

                <div className="form-group position-relative mb-3">
                  <i className="fas fa-comment-dots position-absolute"></i>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    placeholder="About Me"
                    rows="4"
                    defaultValue={state?.message} // Use defaultValue for initial value
                  />
                  {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
                </div>

                <button type="submit" className="btn btn-success btn-block" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit <i className="fas fa-check ml-2"></i>
                    </>
                  )}
                </button>
              </form> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edituser;
