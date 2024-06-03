import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import unsetIcon from "/images/unset_icon.png";
import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useUserStore } from 'src/state/user';

type userType = {
	name: string;
	email: string;
	picture: string;
}

type GoogleResponse = JwtPayload & userType;

const Login = ({setUser}: {setUser: (user: userType) => void}) => {
	const handleOnSuccess = (credentialResponse: CredentialResponse) => {
		if (credentialResponse.credential) {
			const decoded = jwtDecode<GoogleResponse>(credentialResponse.credential);
			const user = { name: decoded.name, email: decoded.email, picture: decoded.picture };
			console.log(user);
			setUser(user);
			fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.error('Error:', error));
		}
	}
	return (
		<div className='flex'>
			<GoogleLogin
				onSuccess={handleOnSuccess}
				onError={() => {
					console.log('Login Failed');
				}}
				type='icon'
				size='small'
			/>
			<span>ログイン</span>
		</div>
	)
}

export default function Header() {
	const [isActive, setIsActive] = useState(false);
	const [user, setUser] = useState<userType | null>(null);
	const setUserState = useUserStore((state) => state.setUser);

	const handleOnBlur = () => {
		setTimeout(() => {
			setIsActive(false);
		}, 100);
	}
	const handleLogout = () => {
		setUser(null);
		googleLogout()
	}
	useEffect(() => {
		console.log(user);
	}, [user]);
	const handleSetUser = (user: userType) => {
    setUser(user);
		setUserState(user.name, user.email);
	}

	return (
		<header className="bg-white text-center py-2 px-4 flex flex-row justify-between border-b-[1px] border-b-slate-400 shadow-sm">
			<h1 className="text-xl font-bold flex items-center">防災アプリ</h1>
			<div className="flex relative justify-end">
				<button onClick={() => setIsActive(!isActive)} onBlur={handleOnBlur}>
					<img src={user?.picture?? unsetIcon} alt="user" className="rounded-full w-8 h-8" />
				</button>
				{isActive && (
					<ul className="whitespace-nowrap rounded-sm bg-white px-2 py-1 text-black absolute top-12 -right-2 before:content-[''] before:absolute before:-translate-x-1/2 before:left-3/4 before:bottom-full before:border-4 before:border-transparent before:border-t-slate-400 before:rotate-180 transition border border-slate-400">
						{!user? (
							<li><Login setUser={handleSetUser}/></li>
						): (
							<>
								<li>{user.name}</li>
								<li><button onClick={handleLogout}>ログアウト</button></li>
							</>
						)}
					</ul>
				)}
			</div>
		</header>
	);
}
