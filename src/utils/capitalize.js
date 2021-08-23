export function capitalize(string) {
	const words = string.split(' ');
	let result = '';
	words.forEach((word) => {
		if (word)
			result += word[0].toUpperCase() + word.substring(1).toLowerCase() + ' ';
	});
	return result;
}
