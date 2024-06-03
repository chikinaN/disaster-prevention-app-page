import { Link, useLocation } from "@remix-run/react";
import { IoHome, IoHomeOutline, IoMap, IoMapOutline, IoPeople, IoPeopleOutline } from 'react-icons/io5';

export default function TabMenu() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="bg-white text-center p-4 inset-x-0 bottom-0 absolute text-2xl drop-shadow">
      <nav>
        <ul className="flex justify-around">
          <li>
            <Link to="/" className="flex flex-col items-center">
              {isActive('/') ? <IoHome /> : <IoHomeOutline />}
              <span className="text-xs">ホーム</span>
            </Link>
          </li>
          <li>
            <Link to="/map" className="flex flex-col items-center">
              {isActive('/map') ? <IoMap /> : <IoMapOutline />}
              <span className="text-xs">マップ</span>
            </Link>
          </li>
          <li>
            <Link to="/friends" className="flex flex-col items-center">
              {isActive('/friends') ? <IoPeople /> : <IoPeopleOutline />}
              <span className="text-xs">フレンド</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
