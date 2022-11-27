import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Step1 from './Step1';

const Home = () => {
	const [current, setCurrent] = useState(0);
	const [trees, setTrees] = useState([]);
	const [checkList, setCheckList] = useState([]);
	const [ok, setOk] = useState(false);
	const secondsToHms = (d) => {
		d = Number(d);

		var h = Math.floor(d / 3600);
		var m = Math.floor((d % 3600) / 60);
		var s = Math.floor((d % 3600) % 60);

		return (
			('0' + h).slice(-2) +
			':' +
			('0' + m).slice(-2) +
			':' +
			('0' + s).slice(-2)
		);
	};

	const getData = async () => {
		setOk(false);
		try {
			const id = localStorage.getItem('user_id');
			const data = await axios.get(`http://jalsol.xyz:5000/user/${id}/trees`);
			console.log(data);

			setTrees(data.data);
		} catch (e) {
			console.log(e);
		}
	};

	const getCheckList = async () => {
		try {
			const id = localStorage.getItem('user_id');
			const data = await axios.get(
				`http://jalsol.xyz:5000/user/${id}/checklist`
			);
			console.log(data.data);

			setCheckList(data.data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
		getCheckList();
	}, []);

	useEffect(() => {
		// if (trees.length > 0 && !ok) {
		// 	setOk(true);
		// 	const maxTime = 86400;
		// 	const progress = document.querySelector('.radial-progress');
		// 	const btn = document.querySelector('.water');
		// 	let currentTime = Math.random() * 60000;
		// 	const id = setInterval(() => {
		// 		let percent = 100 - (currentTime / maxTime) * 100;
		// 		setCurrent(secondsToHms(currentTime));
		// 		progress.style.setProperty('--value', percent);
		// 		currentTime--;
		// 		if (currentTime <= 0) {
		// 			clearInterval(id);
		// 			return;
		// 		}
		// 	}, 1000);
		// 	btn.addEventListener('click', () => {
		// 		currentTime = maxTime;
		// 		let percent = 100 - (currentTime / maxTime) * 100;
		// 		setCurrent(secondsToHms(currentTime));
		// 		progress.style.setProperty('--value', percent);
		// 		// clearInterval(id);
		// 	});
		// }
	}, [trees]);

	return (
		<>
			{trees.length ? (
				<main className='flex items-center content-center flex-col gap-[0.6rem] mt-[1.2rem] w-[375px]'>
					{/* <h1 className='text-2xl text-[#099268] text-center'>
						You should water <br /> your plant in
					</h1>
					<div
						className='radial-progress text-[#099268] grid'
						style={{ '--size': '8em', '--thickness': '8px' }}
					>
						<p className='time-left text-xl font-bold text-[#12b886]'>
							{current}
						</p>
					</div> */}
					<ul className='menu bg-base-100 w-[90%] p-2 text-teal-600 rounded-box'>
						{checkList.map((el, index) => {
							return (
								<div key={index}>
									{/* {console.log(trees[index].base_name)} */}
									<li className='text-2xl font-bold'>
										<span>{trees[index].base_name}</span>
									</li>
									{el.water_task === 'false' ? (
										<li className='flex'>
											<a className='ml-5'>
												Watering
												<ion-icon
													className='inline-block'
													name='trash-outline'
												></ion-icon>
											</a>
										</li>
									) : (
										<></>
									)}
									{el.sunbathe_task === 'false' ? (
										<li className='flex'>
											<a className='ml-5'>
												Sunbathing
												<ion-icon
													className='inline-block'
													name='trash-outline'
												></ion-icon>
											</a>
										</li>
									) : (
										<></>
									)}
									{el.fertilize_task === 'false' ? (
										<li className='flex'>
											<a className='ml-5'>
												Fertilizing
												<ion-icon
													className='inline-block'
													name='trash-outline'
												></ion-icon>
											</a>
										</li>
									) : (
										<></>
									)}
								</div>
							);
						})}
					</ul>
					<div className='flex flex-col items-center'>
						{/* <Link
							to='/streak'
							className='btn water mt-[12px] hover:bg-[#099268] hover:border-[transparent] bg-[#20c997] border-[transparent]'
						>
							Watered!
						</Link> */}
						<Link to='/trees' className='text-[#0ca678] mt-[10px]'>
							<strong>Plant a new tree</strong>
						</Link>
					</div>
				</main>
			) : (
				<Step1 />
			)}
		</>
	);
};

export default Home;
