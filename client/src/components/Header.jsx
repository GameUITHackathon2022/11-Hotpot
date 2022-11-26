import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { getMessagingToken, onMessageListener } from '../../firebase';
import axios from 'axios';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const data = {
	head: 'Title of the notification',
	body: 'Notification body',
	id: "User's id",
};

const Header = ({ login }) => {
	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.clear();
		window.location.href = '/';
	};

	useEffect(() => {
		getMessagingToken();
	}, []);
	useEffect(() => {
		onMessageListener().then((data) => {
			console.log('Receive foreground: ', data);
		});
	});
	// useEffect(async () => {
	// 	const data = await axios.post('http://jalsol.xyz:5000/send_push');
	// 	console.log(data.data);
	// }, []);

	return (
		<header className='flex items-center justify-start max-w-[100%]'>
			<nav className='w-[100%]'>
				<Menu
					as='div'
					className='relative inline-block text-left w-full z-[9999]'
				>
					<div className='flex gap-3 items-center bg-[#63e6be] w-full p-4'>
						<Menu.Button className='inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-[#0ca678] focus:outline-none'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h7'
								/>
							</svg>
						</Menu.Button>
						<h2 className='text-2xl font-bold text-[#087f5b]'>
							<Link to='/'>GreenPot</Link>
						</h2>
					</div>

					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items className='absolute right-0 z-10 mt-2 w-full origin-left rounded-md bg-[#20c997] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
							<div className='py-1'>
								<Menu.Item>
									{({ active }) => (
										<Link
											to='/'
											className={classNames(
												active ? 'bg-[#c3fae8] text-gray-900' : 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											Home
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											to='/shops'
											className={classNames(
												active ? 'bg-[#c3fae8] text-gray-900' : 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											Shops
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											to='/my-trees'
											className={classNames(
												active ? 'bg-[#c3fae8] text-gray-900' : 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											My garden
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											to='/trees'
											className={classNames(
												active ? 'bg-[#c3fae8] text-gray-900' : 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											All trees
										</Link>
									)}
								</Menu.Item>
								{login ? (
									<form onSubmit={handleLogout} method='POST' action='#'>
										<Menu.Item>
											{({ active }) => (
												<button
													type='submit'
													className={classNames(
														active
															? 'bg-[#c3fae8] text-gray-900'
															: 'text-gray-700',
														'block w-full px-4 py-2 text-left text-sm'
													)}
												>
													Sign out
												</button>
											)}
										</Menu.Item>
									</form>
								) : (
									<Menu.Item>
										{({ active }) => (
											<Link
												to='/login'
												className={classNames(
													active
														? 'bg-[#c3fae8] text-gray-900'
														: 'text-gray-700',
													'block px-4 py-2 text-sm'
												)}
											>
												Login
											</Link>
										)}
									</Menu.Item>
								)}
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
				{/* <div className='navbar bg-[#63e6be]'>
					<div className='dropdown'>
						<label tabIndex='0' className='btn btn-ghost btn-circle'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h7'
								/>
							</svg>
						</label>
						<ul
							tabIndex='0'
							className='menu menu-compact dropdown-content bg-[#63e6be] w-[375px] ml-[-8px]'
						>
							<li>
								<Link to='/'>Homepage</Link>
							</li>
							<li>
								<Link to='/shops'>Shops</Link>
							</li>
							<li>
								<Link to='/my-trees'>My trees</Link>
							</li>
							<li>
								<Link to='/trees'>Trees</Link>
							</li>
							<li>
								<div className='avatar w-fit'>
									<div className='w-10 rounded-full'>
										<Link to='/'>
											<img src='https://placeimg.com/192/192/people' />
										</Link>
									</div>
								</div>
							</li>
							<div className='flex items-center'>
								<li>
									<Link
										className='bg-[#c3fae8] border-none hover:bg-[#e6fcf5] w-fit'
										to='/login'
									>
										Login
									</Link>
								</li>
								<li>
									<Link to='/signup'>Signup</Link>
								</li>
							</div>
						</ul>
					</div>
					<div className='flex-1'>
						<Link
							to='/'
							className='btn btn-ghost normal-case text-xl text-[#0ca678]'
						>
							GreenPot
						</Link>
					</div>
				</div> */}
			</nav>
		</header>
	);
};

export default Header;
