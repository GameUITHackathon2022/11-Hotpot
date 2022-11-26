import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Trees = () => {
	const [trees, setTrees] = useState([]);
	const getData = async () => {
		try {
			const data = await axios.get('http://jalsol.xyz:5000/trees');
			console.log(data.data);
			setTrees(data.data);
		} catch (e) {
			console.log(e);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(e);
		const user_id = localStorage.getItem('user_id');
		if (!user_id) {
			return;
		}
		try {
			const data = await axios.post('http://jalsol.xyz:5000/add_tree', {
				user_id,
				tree_id: e.target.id,
			});
			console.log(data);
			window.location.href = '/my-trees';
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<main className='flex items-center content-center flex-col gap-[2rem] mt-[1.2rem] w-[375px]'>
			{trees.map((el, index) => {
				return (
					<div className='card w-[90%] bg-base-100 shadow-xl'>
						<figure>
							<img
								src={`http://jalsol.xyz:5000/${el.image_path}`}
								alt='Shoes'
							/>
						</figure>
						<div className='card-body'>
							<Link to={`/trees/${index + 1}`}>
								<h2 className='card-title text-teal-700'>{el.name}</h2>
							</Link>
							<p className='truncate'>{el.description}</p>
							<div className='card-actions justify-start'>
								<div className='badge badge-outline capitalize'>{el.space}</div>
								<div className='badge badge-outline'>{el.period_display}</div>
								<div className='badge badge-outline'>
									{el.temperature} degree
								</div>
								<div className='badge badge-outline'>
									{el.upper_moisture_level}
								</div>
								<div className='badge badge-outline'>{el.upper_pH_level}pH</div>
							</div>
							<form onSubmit={handleSubmit} action='#'>
								<button
									type='submit'
									className='btn border-none bg-teal-700 focus:bg-teal-500 mt-4'
								>
									Plant!
								</button>
							</form>
						</div>
					</div>
					// <article
					// 	key={index}
					// 	className='flex justify-between items-center w-[100%] px-[20px] border-2 rounded border-[#099268]'
					// >
					// 	<div className='w-[60%] text-center mt-[8px]'>
					// 		<img className='rounded' src={el.image} alt='' />
					// 		<h2 className='font-bold text-xl'>{el.name}</h2>
					// 	</div>
					// 	<div className='text-center'>
					// 		<p className='font-bold text-lg'>Water needed:</p>
					// 		<p>{el.require}</p>
					// 	</div>
					// </article>
				);
			})}
		</main>
	);
};

export default Trees;
