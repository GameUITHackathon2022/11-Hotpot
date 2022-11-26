import React from 'react';

const Streak = () => {
	return (
		<main className='flex items-center content-center flex-col gap-[2rem] mt-[1.2rem] w-[375px]'>
			<h1 className='font-bold text-5xl text-teal-800'>HOORAY!</h1>
			<p className='text-center'>
				You have extended <br /> your streak!
			</p>
			<div className='text-center bg-white font-bold text-3xl text-teal-400 border-[0.5rem] border-teal-600 p-5 rounded-xl'>
				<p>1</p>
				<p>day(s)</p>
			</div>
			<button className='btn bg-teal-700 hover:bg-teal-600 border-none'>
				Share your day!
			</button>
		</main>
	);
};

export default Streak;
