import React, { useState, useEffect } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Shops from './components/Shops';
import MyTrees from './components/MyTrees';
import MyTree from './components/MyTree';
import Login from './components/Login';
import Register from './components/Signup';
import Trees from './components/Trees';
import Streak from './components/Streak';
import Achievement from './components/Achievement';
import Shop from './components/Shop';
import Step2 from './components/Step2';

function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
	const [isLoggin, setIsLoggin] = useState(false);
	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log(token);
		if (token) {
			setIsLoggin(true);
		} else setIsLoggin(false);
	}, []);
	let query = useQuery();
	return (
		<div className='App flex items-center flex-col bg-[#e6fcf5] min-h-[100vh]'>
			<div className='w-[100%]'>
				<Header login={isLoggin} />
			</div>

			<Switch>
				<Route exact path='/'>
					{isLoggin ? <Home /> : <Redirect to='/login' />}
				</Route>
				<Route path='/shops/:id'>
					<Shop />
				</Route>
				<Route path='/shops'>
					<Shops />
				</Route>
				<Route path='/my-trees/:id'>
					<MyTree />
				</Route>
				<Route path='/my-trees'>
					<MyTrees />
				</Route>
				<Route path='/trees'>
					<Trees />
				</Route>
				<Route path='/streak'>
					<Streak />
				</Route>
				<Route path='/achievement'>
					<Achievement />
				</Route>
				<Route path='/step2'>
					<Step2 place={query.get('place')} />
				</Route>
				<Route path='/login'>
					{isLoggin ? <Redirect to='/' /> : <Login />}
				</Route>
				<Route path='/signup'>
					<Register />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
