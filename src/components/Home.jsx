import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Step1 from './Step1';

const Home = () => {
	const [current, setCurrent] = useState(0);
	const [trees, setTrees] = useState([]);
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

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (trees.length > 0 && !ok) {
			setOk(true);
			const maxTime = 86400;
			const progress = document.querySelector('.radial-progress');
			const btn = document.querySelector('.water');
			let currentTime = Math.random() * 60000;

			const id = setInterval(() => {
				let percent = 100 - (currentTime / maxTime) * 100;
				setCurrent(secondsToHms(currentTime));
				progress.style.setProperty('--value', percent);

				currentTime--;

				if (currentTime <= 0) {
					clearInterval(id);
					return;
				}
			}, 1000);

			btn.addEventListener('click', () => {
				currentTime = maxTime;
				let percent = 100 - (currentTime / maxTime) * 100;
				setCurrent(secondsToHms(currentTime));
				progress.style.setProperty('--value', percent);
				// clearInterval(id);
			});
		}
	}, [trees]);

	return (
		<>
			{trees.length ? (
				<main className='flex items-center content-center flex-col gap-[0.6rem] mt-[1.2rem] w-[375px]'>
					<h1 className='text-2xl text-[#099268] text-center'>
						You should water <br /> your plant in
					</h1>
					<div
						className='radial-progress text-[#099268] grid'
						style={{ '--size': '8em', '--thickness': '8px' }}
					>
						<p className='time-left text-xl font-bold text-[#12b886]'>
							{current}
						</p>
					</div>
					<div className='flex flex-col items-center'>
						<Link
							to='/streak'
							className='btn water mt-[12px] hover:bg-[#099268] hover:border-[transparent] bg-[#20c997] border-[transparent]'
						>
							Watered!
						</Link>
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
