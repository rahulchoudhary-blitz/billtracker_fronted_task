import AddLable from './pages/AddLable';
import UpdateLable from './pages/UpdateLable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './layouts/Nav';
import LableList from './pages/LabelList';

import './App.css';

function App() {
	return (
		<div className="App">
		 <BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<LableList />} />
					<Route path="/addlist" element={<AddLable />} />
					<Route path="/updatelist/:id" element={<UpdateLable />} />
				</Routes>
			</BrowserRouter>
		
		</div>
	);
}

export default App;
