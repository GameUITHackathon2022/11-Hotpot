import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Shops = () => {
	const favRef = useRef([]);
	const [shops, setShops] = useState([{}]);
	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		try {
			const data = await axios.get('http://jalsol.xyz:5000/vendors');
			// console.log(data);
			const allShops = data.data;
			allShops.map((el) => {
				el.link = `https://google.com/maps/search/${encodeURIComponent(
					el.address
				)}`;
			});
			console.log(allShops);
			setShops(data.data);
		} catch (e) {
			console.log(e);
		}
		return [];
	};
	useEffect(() => {
		favRef.current.forEach((el) => {
			el.addEventListener('click', (e) => {
				console.log(e.target);
			});
		});
	}, [favRef]);
	return (
		<main className='flex items-center content-center flex-col gap-[2rem] mt-[1.2rem] w-[375px]'>
			{shops.map((el, index) => {
				return (
					<div
						key={index}
						className='card w-[90%] mx-auto bg-base-100 shadow-xl'
					>
						<div className='card-body'>
							<h2 className='card-title text-teal-700'>{el.name}</h2>
							<p>{el.address}</p>
							<div className='card-actions justify-end'>
								<a className='text-teal-500' href={el.link}>
									View direction
								</a>
							</div>
						</div>
					</div>
					// <article
					// 	key={index}
					// 	className='flex gap-3 justify-between items-center w-[100%] px-[20px] border-2 rounded border-[#099268]'
					// >
					// 	<div className='location'>
					// 		<a href={el.link}>
					// 			<ion-icon size='large' name='location'></ion-icon>
					// 		</a>
					// 	</div>
					// 	<div className='details'>
					// 		<h2 className='capitalize text-lg font-bold'>
					// 			<Link to={`/shops/${index + 1}`}>{el.name}</Link>
					// 		</h2>
					// 		<p>{el.address}</p>
					// 		<div className='flex items-center gap-[8px]'>
					// 			<ion-icon name='time-outline'></ion-icon>
					// 			<span className='text-gray-400'>{el.business_hours}</span>
					// 		</div>
					// 	</div>
					// 	<div
					// 		ref={(el) => (favRef.current[index] = el)}
					// 		className={el.isFav ? 'text-red-600' : ''}
					// 	>
					// 		<ion-icon
					// 			size='large'
					// 			name={el.isFav ? 'heart' : 'heart-outline'}
					// 		></ion-icon>
					// 	</div>
					// </article>
				);
			})}
		</main>
	);
};

export default Shops;
