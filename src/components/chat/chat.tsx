import { useState, useEffect, useReducer } from 'react';
// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client';
import { useUserStore } from 'src/state/user';

type Message = {
	sender: string;
	receiver: string;
	message: string;
};

type Action = {
	type: 'ADD_MESSAGE';
	payload: Message;
};

function reducer(state: Message[], action: Action) {
	switch (action.type) {
		case 'ADD_MESSAGE':
			return [...state, action.payload];
		default:
			return state;
	}
}

export default function Chat({ email }: { email: string }) {
	const [text, setText] = useState<string>('');
	const sender = useUserStore((state) => state.user.email);
	const [messages, dispatch] = useReducer(reducer, []);
	const receiver = email;
	const roomId = [sender, receiver].sort().join('-');
	const socket = io(import.meta.env.VITE_BACKEND_URL);

	useEffect(() => {
		socket.emit('joinRoom', roomId);
		socket.on('privateMessage', (data: Message) => {
			console.log("test");
			dispatch({ type: 'ADD_MESSAGE', payload: data });
		});

		return () => {
			socket.off('privateMessage');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sender]);

	function sendMessage(message: string) {
		if (message === '') return;
		socket.emit('privateMessage', { sender, receiver, message });
		setText('');
	}

	useEffect(() => {
		console.log(messages)
	}, [messages])
	if (!sender || email == "") return (
		<div>
			<p>ログインしていないかチャット相手を指定していません</p>
		</div>
	);
	return (
		<div>
			<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
			<button onClick={() => sendMessage(text)}>Send</button>
			<button onClick={() => console.log(messages)}>test</button>
			<ul>
				{messages.map((message, index) => (
					<li key={index} className="relative h-6">
						<div className={`absolute ${message.sender == sender ? "right-0" : "left-0"}`}>{message.message}</div>
					</li>
				))}
			</ul>
		</div>
	)
}
