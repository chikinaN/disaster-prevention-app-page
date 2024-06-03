import { useEffect, useState } from "react";
import Chat from "src/components/chat/chat";
import UserIcon from "src/components/chat/userIcon";
import { useUserStore } from "src/state/user";

type friendType = {
	name: string;
	email: string;
	picture: string;
};

export default function Friends() {
  const user = useUserStore((state) => state.user);
  const [friends, setFriends] = useState<friendType[]>([]);
  const [selectedFriendEmail, setSelectedFriendEmail] = useState<string>('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/friends/list/${user.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => setFriends(data))
    .catch(error => console.error('Error:', error));
  }, [user]);

  return (
    <div className="flex h-full bg-slate-50" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="w-[60px] h-full flex flex-col items-center space-y-4 pt-4 border-r-2">
        {friends.map((friend, index) => (
          <UserIcon key={index} name={friend.name} onClick={() => setSelectedFriendEmail(friend.email)} />
        ))}
      </div>
      <div className="w-[100%-60px]">
        <Chat email={selectedFriendEmail} />
      </div>
    </div>
  );
}
