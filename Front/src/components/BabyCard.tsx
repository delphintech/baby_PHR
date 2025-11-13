import { Link } from 'react-router-dom';
import type { Baby } from '../types/Baby';

export default function BabyCard(props: { baby: Baby}) {
	let genderIcon;

	if (props.baby.gender === 'F') {
		genderIcon = <span title="Female">♀️</span>;
	} else if (props.baby.gender === 'M') {
		genderIcon = <span title="Male">♂️</span>;
	} else {
		genderIcon = <span title="Other">⚥</span>;
	}

	const today = new Date();
	const birthdate = new Date(props.baby.birthdate);
	let age = (today.getFullYear() - birthdate.getFullYear()) * 12 + today.getMonth() - birthdate.getMonth();


	return (
        <Link className="bg-white border border-blue-50 rounded-xl shadow-md p-6 mb-4 transition-transform hover:scale-105 hover:shadow-lg flex items-center justify-between"
			to={`/baby/${props.baby.id}`}>
            <div className="flex items-center">
                <span className="text-2xl mr-2">{genderIcon}</span>
                <span className="text-lg font-bold text-blue-700">{props.baby.name}</span>
            </div>
            <span className="text-sm text-gray-500">{`Age: ${age} months`}</span>
        </Link>
	)
}
