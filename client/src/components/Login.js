import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import api from '../axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { email, username, password } = formData;
        
        if (!email || !username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await api.post('/auth/login', { email, username, password });
            // navigate('/postList')
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid credentials. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className='bg-gray-100 px-2 w-1/3 mx-auto mt-20 shadow-md'>
            <div className="font-bold shadow hover:shadow-md bg-gray-300 text-2xl border-2 text-center w-max border-gray-300 rounded mx-auto mb-10 h-8">
                Advisoropedia
            </div>
            <div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
            <div className='mx-auto'>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label className='block text-gray-500 text-lg'>Username: </label>
                        <input
                            type='text'
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className='w-11/12 border rounded-md p-2 mt-1'
                        />
                    </div>
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
            </div>
        </div>
    );
};

export default Login;
