import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyTrees = () => {
	const [trees, setTrees] = useState([]);
	const getData = async () => {
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

	return (
		<main className='flex items-center content-center flex-col gap-[2rem] mt-[1.2rem] w-[375px]'>
			{trees.map((el, index) => {
				return (
					<div
						key={index}
						className='card w-[90%] h-[280px] bg-base-100 shadow-xl image-full'
					>
						<figure>
							<img
								src={`http://jalsol.xyz:5000/${el.base_image_path}`}
								alt='Tree'
							/>
						</figure>
						<div className='card-body'>
							<h2 className='card-title text-2xl text-teal-300'>{el.name}</h2>
							<p className='text-teal-500'>{el.location}</p>
							<div className='card-actions justify-end'>
								<Link
									to={`/my-trees/${index + 1}`}
									className='btn bg-teal-700 border-none focus:bg-teal-500'
								>
									View
								</Link>
							</div>
						</div>
					</div>
					// <article
					// 	key={index}
					// 	className='flex gap-[20px] items-center w-[100%] px-[20px] border-2 rounded border-[#099268]'
					// >
					// 	<div className='w-[50%] text-center my-[8px]'>
					// 		<img className='rounded' src={el.image} alt='' />
					// 	</div>
					// 	<div className=''>
					// 		<h2 className='font-bold text-xl'>{el.name}</h2>
					// 		<p>{el.location}</p>
					// 	</div>
					// </article>
				);
			})}
		</main>
	);
};

export default MyTrees;
