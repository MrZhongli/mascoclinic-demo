export const parseDate = ({
	date,
	format = {
		day: "numeric",
		month: "short",
		year: "numeric",
	},
}) => {
	return new Date(date).toLocaleDateString("es-VE", format);
};

export const parseAge = (age) => {
	return age.toString().padStart(2, "0");
};
