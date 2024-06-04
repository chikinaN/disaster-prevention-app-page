import { useEffect } from "react";
import { useUserStore } from "src/state/user";

export default function Index() {
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/friends/request/${user.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }, [user]);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }} className=" px-4">
      <h3 className="text-2xl mt-4 font-bold underline">直近の地震一覧</h3>
      <div className="h-48 flex border p-3 pt-0 mx-auto mt-3">
        現在地震情報はありません
      </div>
      <h3 className="text-2xl mt-4 font-bold underline">フレンドの状況</h3>
      <div className="h-48 flex border p-3 pt-0 mx-auto mt-3">
        ログインしていないか、フレンドがいません
      </div>
    </div>
  );
}
