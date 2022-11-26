import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://jalsol.xyz:5000/login', {
				username,
				password,
			});
			console.log(response.data.token);
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user_id', response.data.user_id);
			window.location.href = '/';
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<main className='flex items-center content-center flex-col gap-[2rem] mt-[1.2rem] w-[375px]'>
			<div className='bg-[#087f5b] p-4 rounded-lg text-white'>
				<h2 className='text-center text-xl'>Login</h2>
				<form
					onSubmit={handleSubmit}
					action='#'
					className='flex flex-col gap-5'
				>
					<section>
						<label htmlFor='username'>Username:</label>
						<input
							type='text'
							id='username'
							placeholder='username'
							className='input text-black w-full max-w-xs'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</section>
					<section>
						<label htmlFor='password'>Password:</label>
						<input
							type='password'
							id='password'
							placeholder='password'
							className='input text-black w-full max-w-xs'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</section>
					<button
						className='btn login bg-[#0ca678] border-none hover:bg-[#38d9a9] mt-5'
						type='submit'
					>
						Login
					</button>
				</form>
			</div>
			<Link className='text-center text-[#087f5b] font-bold' to='./lost-pass'>
				Forgot password?
			</Link>
			<Link
				className='text-center text-[#087f5b] font-bold mt-10'
				to='./signup'
			>
				Don't have an account?
			</Link>
		</main>
	);
};

export default Login;
