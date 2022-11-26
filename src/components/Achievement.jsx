import React from 'react';

const Achievement = () => {
	return (
		<main className='flex ml-10 items-start content-center flex-col gap-[0.6rem] mt-[1.2rem] w-[375px] text-teal-600'>
			<div>
				<h2 className='text-4xl font-bold'>Ongoing</h2>
				<div className='ml-10 mt-4'>
					<section>
						<h4 className='font-bold text-lg'>Write 200 journals</h4>
						<progress
							className='progress bg-teal-400 h-4 w-56'
							value='60'
							max='100'
						></progress>
					</section>
					<section>
						<h4 className='font-bold text-lg'>Complete 2 tasks</h4>
						<progress
							className='progress bg-teal-400 h-4 w-56'
							value='0'
							max='100'
						></progress>
					</section>
					<section>
						<h4 className='font-bold text-lg'>Score 100-day streak</h4>
						<progress
							className='progress bg-teal-400 h-4 w-56'
							value='20'
							max='100'
						></progress>
					</section>
				</div>
			</div>
			<div>
				<h2 className='text-4xl font-bold'>2022</h2>
				<div className='ml-10 mt-4'>
					<section>
						<h4 className='font-bold text-lg'>50 days marathon</h4>
						<progress
							className='progress bg-teal-400 h-4 w-56'
							value='100'
							max='100'
						></progress>
					</section>
					<section>
						<h4 className='font-bold text-lg'>5-task-a-day</h4>
						<progress
							className='progress bg-teal-400 h-4 w-56'
							value='100'
							max='100'
						></progress>
					</section>
				</div>
			</div>
		</main>
	);
};

export default Achievement;
