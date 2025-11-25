import { Link } from "react-router-dom"
import type { Baby } from "../../types/Baby"

export default function Navbar(props: {baby: Baby | null, setBaby: (baby: Baby | null) => void}) {

	const navName = (props.baby ? props.baby.name : "Baby Health");

	return (
		<header className="bg-white shadow-md sticky top-0 z-10">
			<nav className="flex justify-between items-center px-4 py-3">
			<h1 className="text-2xl font-bold text-blue-700">👶 {navName}</h1>
			<ul className="flex space-x-4 text-gray-600 ml-6">
				{props.baby && (
				<>
					<li><Link to={`/baby/${props.baby.id}`} className="hover:text-blue-600">Growth</Link></li>
					<li><Link to={`/baby/${props.baby.id}/vaccination`} className="hover:text-blue-600">Vaccines</Link></li>
				</>
				)}
				{!props.baby && (
					<li><Link to={`/statistics`} className="hover:text-blue-600">Global Statistics</Link></li>
				)}
				<li><Link to="/" className="hover:text-blue-600 ml-4" onClick={() => props.setBaby(null)} >🏠</Link></li>
			</ul>
			</nav>
		</header>
	)
}
