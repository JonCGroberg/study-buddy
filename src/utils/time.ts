

function formatAMPM(date: Date) {
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const day = date.toLocaleString("en-us", { weekday: "long" });
	const today = new Date().toLocaleString("en-us", { weekday: "long" });

	const hoursString = hours % 12 || 12; // the hour '0' should be '12'
	const minutesString = minutes.toString().padStart(2, "0");
	const ampmString = hours >= 12 ? "PM" : "AM";
	const dayString = day === today ? "" : day;

	return `${hoursString}:${minutesString} ${ampmString} ${dayString}`;
}

function getWeekDates() {
	const start = new Date();
	const dates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date();
		date.setDate(start.getDate() + i);
		dates.push(date);
	}
	return dates;
}

function getTimeBlock(i: number) {
	const date = new Date();
	date.setHours(Math.floor(i / 4));
	date.setMinutes((i % 4) * 15);
	date.setSeconds(0);
	return date;
}

function getUnixTimestampFromInputs(day: any, time: number) {
	if (!day || !time) return undefined;
	const date = getTimeBlock(time);
	date.setDate(Number(date.getDate()) + Number(day));
	return Math.floor(date.getTime() / 1000);
}

export { formatAMPM, getWeekDates, getTimeBlock, getUnixTimestampFromInputs };