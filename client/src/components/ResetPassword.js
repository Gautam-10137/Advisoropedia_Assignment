import React, { useState } from 'react';
import api from '../axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/reset-password', { email });
            setMessage(response.data.message);
            setEmail('');
            setError('');
        } catch (error) {
            setError('This Component is currently in development.Failed To reset password.');
        }
    };

    return (
        <div className='bg-gray-100 px-2 w-1/3 mx-auto mt-20 shadow-md'>
            <div className="font-bold shadow hover:shadow-md bg-gray-300 text-2xl border-2 text-center w-max border-gray-300 rounded mx-auto mb-10 h-8">
                Password Reset
            </div>
            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label className='block text-gray-500 text-lg'>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={handleInputChange}
                        className='w-11/12 border rounded-md p-2 mt-1'
                    />
                </div>
                <div className='my-5 text-center'>
                    <button className='mb-2 border-2 font-medium bg-slate-200 hover:bg-slate-300 focus:bg-slate-400 w-28 text-xl' type="submit">Reset Password</button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
