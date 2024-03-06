import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import api from '../axios';
const Register = () => {
    // const navigate=useNavigate();
    const [formData,setFormData]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    
    const [showSuccessDialog, setShowSuccessDialog] = useState(false); 
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [passwordError,setPasswordError]=useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        
        setFormData({
            ...formData,
         [name]:value
        })
        if(name==='password' || name==='confirmPassword'){
            setPasswordError('');
        }
    }

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        const username=formData.username;
        const email=formData.email;
        const password=formData.password;
        const confirmPassword=formData.confirmPassword;        
         // Perform validation
        if (!username || !email || !password || !confirmPassword) {
          setError('!!!Please fill in all fields.');
          return;
        }

        if(password!==confirmPassword){
            setPasswordError('!!!Password do not match');
            return ;
        }
        if (!isChecked) {
            alert('!!!Please accept the terms and conditions.');
        }
        const userExists = await checkUserExists(username, email);
        if (userExists) {
          setError('Username or email already exists. Please choose a different one.');
          return;
        }
         const response=await api.post('/auth/register',{username,email,password});
         setShowSuccessDialog(true);
         setTimeout(() => {
           setShowSuccessDialog(false);
            // navigate('/postList');
         }, 2000);
       
    }
    const checkUserExists = async (username, email) => {
  
      try {
        const response = await api.post('/auth/isUserExists', { username, email });
        const data = response.data;
        return data.exists;
      } catch (error) {
        console.error('Error checking user existence:', error);
        throw error; 
      }
    };  

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    return (
    <div className='bg-gray-100 px-2 w-1/3 mx-auto mt-20 shadow-md'>
      <div className="font-bold  shadow hover:shadow-md bg-gray-300  text-2xl border-2 text-center w-max  border-gray-300 rounded mx-auto mb-10  h-8">
              {/* <Link to="/">CartEase</Link> */} Advisoropedia
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
        
      >
      </input>
      </div>
      <div>
      <label className='block text-gray-500 text-lg' >email: </label>
      <input
        type='email'
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className=' w-11/12 border  rounded-md p-2 mt-1 '
        
      >
      </input>
      </div>
      <div>
      <label className='block text-gray-500 text-lg' >password: </label>
      <div className='relative'>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name="password"
        autoComplete='current-password'
        value={formData.password}
        onChange={handleInputChange}
        className=' w-11/12 border  rounded-md p-2 mt-1 '
      >
      </input>
      <span onClick={togglePasswordVisibility} className='toggle-password mx-2'>
                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
      </span>
      </div>
      </div>
      <div>
      <label className='block text-gray-500 text-lg' >confirm password: </label>
      <div className='relative'>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name="confirmPassword"
        value={formData.currentPassword}
        onChange={handleInputChange}
        className=' w-11/12 border  rounded-md p-2 mt-1 '
        
      >
      </input>
      <span onClick={togglePasswordVisibility} className='toggle-password mx-2'>
                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} /> 
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
    {showSuccessDialog && (
        <div className='mt-4 bg-green-200 p-4 rounded-md ' >
          Registration successful! Redirecting...
        </div>
      )}
    </div>   
    </div>
  )
}

export default Register
