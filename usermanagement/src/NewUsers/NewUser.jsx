import React,{useContext} from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewUser.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import axios from "axios";
import { UserContext } from "../components/Store/StoreUser";
import { useNavigate } from 'react-router-dom';
const NewUser = () => {
  let navigate=useNavigate();

  let {users,setUsers}=useContext(UserContext)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    data.status=true;
    axios.post("http://localhost:4000/user-api/new-user",data);
    setUsers([...users,data]);
    navigate("/users")
   
  };

  return (
    <div className="container-fluid d-flex vh-100">
      <div className="image-container col-md-6 d-flex justify-content-center align-items-center">
        <img src="http://www.digiflashconcept.com/assets/images/send.png" alt="Email Icon" className="email-icon" />
      </div>
      <div className="form-container col-md-6 d-flex align-items-center justify-content-center">
        <div className="form-box p-5 animated">
          <div className="text-center mb-4">
            <h2>Add User</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group position-relative">
              <i className="fas fa-user position-absolute"></i>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Name"
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>
            <div className="form-group position-relative">
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
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
            <div className="form-group position-relative">
              <i className="fas fa-mobile-alt position-absolute"></i>
              <input
                {...register('mobile', { required: 'Mobile number is required' })}
                type="tel"
                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                placeholder="Mobile Number"
              />
              {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
            </div>
            <div className="form-group position-relative">
              <i className="fas fa-clipboard position-absolute"></i>
              <input
                {...register('subject', { required: 'Subject is required' })}
                type="text"
                className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                placeholder="Subject"
              />
              {errors.subject && <div className="invalid-feedback">{errors.subject.message}</div>}
            </div>
            <div className="form-group position-relative">
              <i className="fas fa-comment-dots position-absolute"></i>
              <textarea
                {...register('message', { required: 'Message is required' })}
                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                placeholder="About Me"
                rows="4"
              />
              {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
            </div>
            <button type="submit" className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
