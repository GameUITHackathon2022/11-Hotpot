import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Shop = () => {
	const [shop, setShop] = useState({});
	const { id } = useParams();
	const getData = async () => {
		try {
			const data = await axios.get(`http://jalsol.xyz:5000/vendor/${id}`);
			console.log(data);
			setShop(data.data);
		} catch (e) {
			console.log(e);
		}
		return {};
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<main className='flex items-center content-center flex-col gap-[2rem] mt-[1.2rem] w-[375px]'>
			<h2>Shop {shop.name}</h2>
		</main>
	);
};

export default Shop;
