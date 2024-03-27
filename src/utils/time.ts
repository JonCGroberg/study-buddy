export default formatAMPM;

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
