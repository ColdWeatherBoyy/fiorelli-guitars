export const formatDateTime = (dateTimeStr: string): string => {
	const date = new Date(dateTimeStr);
	const months = (date.getMonth() + 1).toString().padStart(2, "0");
	const days = date.getDate().toString().padStart(2, "0");
	const years = date.getFullYear().toString().slice(-2);

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const period = hours >= 12 ? "PM" : "AM";

	hours = hours % 12 || 12; // Convert 0 to 12 for midnight, adjust 24-hour to 12-hour
	const formattedHours = hours.toString().padStart(2, "0");

	return `${months}/${days}/${years}, ${formattedHours}:${minutes} ${period}`;
};

export const toTitleCase = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
