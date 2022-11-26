import React from 'react';
import { Link } from 'react-router-dom';

const Step1 = () => {
	return (
		<main>
			<h1 className='text-4xl font-bold text-center mt-4 text-teal-600'>
				Where would you like your tree to be in?
			</h1>
			<div className='flex flex-col mt-8 items-center gap-10'>
				<Link
					to='/step2?place=home'
					className='btn w-[80%] bg-teal-500 focus:bg-teal-700 border-none'
				>
					Home
				</Link>
				<Link
					to='/step2?place=office'
					className='btn w-[80%] bg-teal-500 focus:bg-teal-700 border-none'
				>
					Office
				</Link>
				<Link
					to='/step2?place=garden'
					className='btn w-[80%] bg-teal-500 focus:bg-teal-700 border-none'
				>
					Garden
				</Link>
			</div>
		</main>
	);
};

export default Step1;
