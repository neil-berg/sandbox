import React, { useState } from 'react';
import styled from 'styled-components';

import '../styles/layout.css';


const name = 'Neil';

const App = () => {

	const [showMessage, setShowMessage] = useState(false);

	return (
		<div>
			<button onClick={() => setShowMessage(!showMessage)}>Press me</button>
			{showMessage && <p>Message is shown!</p>}
			<h1>Is this alive?</h1>
			<h2>Hello?</h2>
			<h3>what the fuck????</h3>
			<MyHeader active>andddd</MyHeader>
			<p>My name is {name}</p>
			<p>The good job</p>
			<p className="active">{name}</p>
			<div className="subgroup">
				<p>Im ok!</p>
				<span role="img" aria-label="kisy-face">😚</span>
			</div>
		</div>
	)
};

const MyHeader = styled.h4`
	font-size: 3em;
	color: ${props => props.active ? 'orange' : 'red'};
`

export default App;
