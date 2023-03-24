const searchButton = document.querySelector('#search');
const nameInput = document.querySelector('#name');
const titleInput = document.querySelector('#title');
const typeInput = document.querySelector('#type');
const yearInput = document.querySelector('#year');
const resultsDiv = document.querySelector('#results');

searchButton.addEventListener('click', async () => {
	try {
		const name = nameInput.value;
		const response = await fetch(`https://api.nationalize.io/?name=${name}`);
		const data = await response.json();
		const countries = data.country.slice(0, 2);
		const probability = countries.map(country => country.probability);
		const countryNames = countries.map(country => country.country_id);
		const highlightedResults = highlightResults(countryNames.join(' '), titleInput.value, typeInput.value, yearInput.value);
		resultsDiv.innerHTML = `
			<h2>${name}</h2>
			<p>Top two countries: ${highlightedResults}</p>
			<p>Probability: ${probability.join(', ')}</p>
		`;
	} catch (error) {
		resultsDiv.innerHTML = `<p>${error.message}</p>`;
	}
});

function highlightResults(text, title, type, year) {
	let highlightedText = text;
	if (title) {
		highlightedText = highlightedText.replace(new RegExp(title, 'gi'), `<span class="highlight">${title}</span>`);
	}
	if (type) {
		highlightedText = highlightedText.replace(new RegExp(type, 'gi'), `<span class="highlight">${type}</span>`);
	}
	if (year) {
		highlightedText = highlightedText.replace(new RegExp(year, 'gi'), `<span class="highlight">${year}</span>`);
	}
	return highlightedText;
}
