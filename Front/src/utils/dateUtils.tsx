export function display_age(birthdate?: string): string {
	if (!birthdate) return ""; 

	const today = new Date();
	const birth = new Date(birthdate);

	let age = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
	let age_text;
	if (age > 24) {
		age_text = `${Math.floor(age / 12)} years` + (age % 12 != 0 && ` ${age % 12} months`);
	} else if (age > 0) {
		age_text = `${age} months`;
	} else {
		age = today.getDate() - birth.getDate();
		age_text = `${age} days`;
	}

	return age_text;
}