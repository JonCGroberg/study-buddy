export default getCourseColor;

//converts any string to a hash based on length
function stringToHash(string: string): number {
	let hash: number = 0;
	if (string.length == 0) return hash;

	for (let i = 0; i < string.length; i++) {
		let char: number = string.charCodeAt(i);
		hash = (hash << 6) - hash + char;
		hash = hash & hash;
	}
	return hash;
}

function getCourseColor(course: string): string {
	const colors = [
		"#FF2E2E",
		"#FFA14A ",
		"#F5DF14",
		"#60DD5E",
		"#3ABE6F",
		"#39BCBC",
		"#3F7BC2",
		"#5E2A92",
		"#BC64C4",
		"#ED6890"
	];
	// Math.abs is needed because % fails on negative numbers
	return colors[Math.abs(stringToHash(course) % colors.length)];
}
