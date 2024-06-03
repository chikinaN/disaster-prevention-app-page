// eslint-disable-next-line import/no-unresolved
import unsetIcon from "/images/unset_icon.png";

type UserIconProps = {
	name: string;
	icon?: string;
	onClick: () => void;
};

export default function UserIcon({ name, icon, onClick }: UserIconProps) {
	return (
		<div className="flex flex-col items-center">
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
			<img src={icon ?? unsetIcon} alt="icon" className="rounded-full w-9 h-9" onClick={onClick} />
			<p className="text-center text-xs overflow-hidden">{name}</p>
		</div>
	)
}
