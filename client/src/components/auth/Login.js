import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import api from '../../axios';
import { Link,useNavigate } from 'react-router-dom';

const linkStyle = {
    textDecoration: 'none',
    color: '#4a4949'
  };

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate=useNavigate();

    const [showSuccessDialog, setShowSuccessDialog] = useState(false); 
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Handle input change event
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        
        // Validate form fields
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        
        // Check if user exists
        const userExists = await checkUserExists( email);
        if (!userExists) {
          setError('User does not exist.');
          return;
        }

        try {
            // Perform login request
            const response = await api.post('/auth/login', { email, password });
            const data=response.data;
            localStorage.setItem('accessToken',data.token);
            setShowSuccessDialog(true);
            setTimeout(() => {
                setShowSuccessDialog(false);
                navigate('/posts');
            }, 2000);
            
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid password. Please try again.');
        }
    };

    // Check if user exists
    const checkUserExists = async (email) => {
        try {
          const response = await api.get(`/auth/isEmailExists?email=${email}`);
          const data = response.data;
          return data.exists;
        } catch (error) {
          console.error('Error checking user existence:', error);
          throw error; 
        }
      };  

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className='bg-gray-100 px-2 w-1/3 mx-auto mt-20 shadow-md'>
            <div className="font-bold shadow hover:shadow-md bg-gray-300 text-xl border-2 text-center w-max border-gray-300 rounded mx-auto mb-10 h-8">
                Advisoropedia
            </div>
            <div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
            <div className='mx-auto'>
                <form onSubmit={handleFormSubmit}>
                    
                    <div>
                        <label className='block text-gray-500 text-lg'>Email: </label>
                        <input
                            type='email'
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className='w-11/12 border rounded-md p-2 mt-1'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 text-lg'>Password: </label>
                        <div className='relative'>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="password"
                                autoComplete='current-password'
                                value={formData.password}
                                onChange={handleInputChange}
                                className='w-11/12 border rounded-md p-2 mt-1'
                            />
                            <span onClick={togglePasswordVisibility} className='toggle-password mx-2'>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                            </span>
                        </div>
                    </div>
                    <div className='my-5 text-center'>
                        <button className='mb-2 border-2 font-bold bg-slate-200 hover:bg-slate-300 focus:bg-slate-400 w-28 text-xl' type="submit">Login</button>
                    </div>
                </form>
                <div>
                 If you have not registered yet? <Link to='/' style={linkStyle}>Register</Link>
                </div>
                {showSuccessDialog && (
               <div className='mt-4 bg-green-200 p-4 rounded-md ' >
                  Login successful! Redirecting...
               </div>
          )}
            </div>
        </div>
    );
};

export default Login;
