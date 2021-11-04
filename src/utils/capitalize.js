export function capitalize(string) {
	if (string) {
		const words = string.toString().split(' ');
		let result = '';
		words.forEach((word) => {
			if (word)
				result +=
					word[0].toUpperCase() + word.substring(1).toLowerCase() + ' ';
		});
		return result;
	}
	return string;
}
