import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Step2 = ({ place }) => {
	const [trees, setTrees] = useState([
		{
			name: 'Pothos',
			require: '2 lần/tuần',
			img: 'https://www.gardeningknowhow.com/wp-content/uploads/2020/11/pothos-plant-400x300.jpg',
			desc: 'lorem ipsum',
		},
	]);
	const getData = async () => {
		try {
			const data = await axios.get(`http://jalsol.xyz:5000/trees/${place}`);
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
		try {
			const data = await axios.post('http://jalsol.xyz:5000/add_tree', {
				user_id,
				tree_id: e.target.id,
			});
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<main>
			<h1 className='text-4xl font-bold text-center mt-4 text-teal-600'>
				Recommendations
			</h1>
			<div className='mt-10  overflow-scroll'>
				{trees.map((el, index) => {
					return (
						<section
							key={index}
							className='mx-auto my-4 card w-[90%] bg-base-100 shadow-xl'
						>
							<figure>
								<img
									src={`http://jalsol.xyz:5000/${el.image_path}`}
									alt='Shoes'
								/>
							</figure>
							<div className='card-body'>
								<h2 className='card-title text-teal-800 font-bold'>
									{el.name}
								</h2>
								<p>{el.desc}</p>
								<div className='card-actions justify-start'>
									<div className='badge badge-outline capitalize'>{place}</div>
									<div className='badge badge-outline'>{el.period_display}</div>
								</div>
								<form id={index + 1} onSubmit={handleSubmit} action='#'>
									<button
										className='mt-4 btn border-none bg-teal-500 focus:bg-teal-700'
										type='submit'
									>
										Plant!
									</button>
								</form>
							</div>
						</section>
					);
				})}
			</div>
		</main>
	);
};

export default Step2;
