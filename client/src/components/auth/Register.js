import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import api from '../../axios';

const linkStyle = {
  textDecoration: 'none',
  color: '#4a4949'
};

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [showSuccessDialog, setShowSuccessDialog] = useState(false); 
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false); 
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false); 

    // Handle checkbox change event
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    // Handle input change event
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordError('');
        }
    }

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;
         
        if (!username || !email || !password || !confirmPassword) {
          setError('!!!Please fill in all fields.');
          return;
        }

        if (password !== confirmPassword) {
            setPasswordError('!!!Password does not match');
            return;
        }

        if (!isChecked) {
            alert('!!!Please accept the terms and conditions.');
        }

        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
          setError('Username already exists. Please choose a different one.');
          return;
        }

        const emailExists = await checkEmailExists(email);
        if (emailExists) {
          setError('Email already exists. Please choose a different one.');
          return;
        }
         
        try {
            const response = await api.post('/auth/signup', { username, email, password });
            const data = response.data;
            localStorage.setItem('accessToken', data.token);
            setShowSuccessDialog(true);
            setTimeout(() => {
                setShowSuccessDialog(false);
                navigate('/posts');
            }, 2000);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    // Check if username exists
    const checkUsernameExists = async (username) => {
        try {
          const response = await api.get(`/auth/isUsernameExists?username=${username}`);
          const data = response.data;
          return data.exists;
        } catch (error) {
          console.error('Error checking username existence:', error);
          throw error; 
        }
    };  
    
    // Check if email exists
    const checkEmailExists = async (email) => {
        try {
          const response = await api.get(`/auth/isEmailExists?email=${email}`);
          const data = response.data;
          return data.exists;
        } catch (error) {
          console.error('Error checking email existence:', error);
          throw error; 
        }
    };  

    // Toggle password visibility
    const togglePasswordVisibility = (i) => {
        if (i === 1) {
            setIsPasswordVisible1(!isPasswordVisible1);
        } else {
            setIsPasswordVisible2(!isPasswordVisible2);
        }
    };

    return (
    <div className='bg-gray-100 px-2 w-1/3 mx-auto mt-20 shadow-md'>
      <div className="font-bold  shadow hover:shadow-md bg-gray-300  text-xl border-2 text-center w-max  border-gray-300 rounded mx-auto mb-10  h-8">
          <Link to="/" style={linkStyle}>Advisoropedia</Link> 
      </div>
      <div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <div className=' mx-auto '>
          <form onSubmit={handleFormSubmit}>         
              <div>
                  <label className='block text-gray-500 text-lg' >username: </label>
                  <input
                      type='text'
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className=' w-11/12 border  rounded-md p-2 mt-1 '
                  />
              </div>
              <div>
                  <label className='block text-gray-500 text-lg' >email: </label>
                  <input
                      type='email'
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className=' w-11/12 border  rounded-md p-2 mt-1 '
                  />
              </div>
              <div>
                  <label className='block text-gray-500 text-lg' >password: </label>
                  <div className='relative'>
                      <input
                          type={isPasswordVisible1 ? 'text' : 'password'}
                          name="password"
                          autoComplete='current-password'
                          value={formData.password}
                          onChange={handleInputChange}
                          className=' w-11/12 border  rounded-md p-2 mt-1 '
                      />
                      <span onClick={(e)=>{togglePasswordVisibility(1)}} className='toggle-password mx-2'>
                          <FontAwesomeIcon icon={isPasswordVisible1 ? faEyeSlash : faEye} />
                      </span>
                  </div>
              </div>
              <div>
                  <label className='block text-gray-500 text-lg' >confirm password: </label>
                  <div className='relative'>
                      <input
                          type={isPasswordVisible2 ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className=' w-11/12 border  rounded-md p-2 mt-1 '
                      />
                      <span onClick={(e)=>{togglePasswordVisibility(2)}} className='toggle-password mx-2'>
                          <FontAwesomeIcon icon={isPasswordVisible2 ? faEyeSlash : faEye} /> 
                      </span>
                  </div>
              </div>
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              <div className='w-full text-lg  text-gray-500'>
                  <label>
                      <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          className='mx-2'
                      />
                      I accept the terms and conditions
                  </label>
              </div>
              <div className='my-5 text-center'>
                  <button className=' mb-2  border-2 font-bold bg-slate-200  hover:bg-slate-300 focus:bg-slate-400 w-28 text-xl ' type="submit">Register</button>
              </div>
          </form>
          <div>
              If you have already registered? <Link to='/login' style={linkStyle}>Login</Link>
          </div>  
          {showSuccessDialog && (
              <div className='mt-4 bg-green-200 p-4 rounded-md ' >
                  Registration successful! Redirecting...
              </div>
          )}
      </div>   
    </div>
  );
}

export default Register;
