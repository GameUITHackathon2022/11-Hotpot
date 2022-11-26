import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupForm = () => {
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: '',
			repeatPassword: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().max(15, 'Must be 15 characters or less'),
			lastName: Yup.string().max(20, 'Must be 20 characters or less'),
			email: Yup.string().email('Invalid email address').required('Required'),
			username: Yup.string()
				.min(5, 'Must longer than 4 characters')
				.required('Required'),
			password: Yup.string()
				.min(6, 'Must longer than 5 characters')
				.required('Required'),
			repeatPassword: Yup.string()
				.required('Required')
				.test(
					'equal',
					'Must same as password',
					(value, context) => value === context.parent.password
				),
		}),
		onSubmit: async (values) => {
			console.log(values);
			try {
				const data = await axios.post(
					'http://jalsol.xyz:5000/register',
					values
				);
				console.log(data);
				window.location.href = '/login';
			} catch (e) {
				console.log(e);
			}
			// alert(JSON.stringify(values, null, 2));
		},
	});
	return (
		<main className='flex items-center content-center flex-col gap-[2rem] mt-[1.2rem] w-[375px]'>
			<div className='bg-[#087f5b] p-4 rounded-lg text-white'>
				<h2 className='text-center text-xl font-bold'>Sign up</h2>
				<form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
					<section>
						<label htmlFor='firstName'>First Name</label>
						<input
							id='firstName'
							name='firstName'
							type='text'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.firstName}
							className='input text-black w-full max-w-xs'
						/>
						{formik.touched.firstName && formik.errors.firstName ? (
							<div className='color-red-400'>{formik.errors.firstName}</div>
						) : null}
					</section>

					<section>
						<label htmlFor='lastName'>Last Name</label>
						<input
							id='lastName'
							name='lastName'
							type='text'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.lastName}
							className='input text-black w-full max-w-xs'
						/>
						{formik.touched.lastName && formik.errors.lastName ? (
							<div className='color-red-400'>{formik.errors.lastName}</div>
						) : null}
					</section>

					<section>
						<label htmlFor='email'>Email Address</label>
						<input
							id='email'
							name='email'
							type='email'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							className='input text-black w-full max-w-xs'
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className='color-red-400'>{formik.errors.email}</div>
						) : null}
					</section>

					<section>
						<label htmlFor='username'>Username</label>
						<input
							id='username'
							name='username'
							type='text'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
							className='input text-black w-full max-w-xs'
						/>
						{formik.touched.username && formik.errors.username ? (
							<div className='color-red-400'>{formik.errors.username}</div>
						) : null}
					</section>

					<section>
						<label htmlFor='password'>Password</label>
						<input
							id='password'
							name='password'
							type='password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							className='input text-black w-full max-w-xs'
						/>
						{formik.touched.password && formik.errors.password ? (
							<div className='color-red-400'>{formik.errors.password}</div>
						) : null}
					</section>

					<section>
						<label htmlFor='repeatPassword'>Confirm password</label>
						<input
							id='repeatPassword'
							name='repeatPassword'
							type='password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.repeatPassword}
							className='input text-black w-full max-w-xs'
						/>
						{formik.touched.repeatPassword && formik.errors.repeatPassword ? (
							<div className='text-red-400'>{formik.errors.repeatPassword}</div>
						) : null}
					</section>

					<button className='btn m-auto block mt-5 bg:' type='submit'>
						Submit
					</button>
				</form>
			</div>
		</main>
	);
};
export default SignupForm;
