const navLinksList = document.getElementById('navlinks');
const categoryItem = document.getElementById('category-item-counter');


async function generateNavLinks() {
	const url = 'https://openapi.programming-hero.com/api/news/categories';
	const res = await fetch(url);
	const data = await res.json();
	await data.data.news_category.forEach(element => {
		
		// creates li tag
		const li = document.createElement('li');

		// creates a tag
		const navlink = document.createElement('a');

		// changes a tag's inner text to dynamic value
		navlink.innerText = element.category_name;
		navlink.setAttribute('href', '#');

		// set dynamically gotten id to data attribute
		navlink.setAttribute('data-id', element.category_id);

		// adds eventlistner
		navlink.addEventListener('click', (e) => {

			// removes category counter
			categoryItem.parentElement.classList.add('hidden');

			// loads spinner when a link is clicked
			document.getElementById('spinner').classList.remove('hidden');

			// removes color if previously added
			document.querySelectorAll('#navlinks li a').forEach(el => {
				el.classList.remove('text-red-400');
			});

			// adds color to selected link
			e.target.classList.add('text-red-400');

			const buttonId = e.target.getAttribute('data-id')
			// generates news dynamically when a button is clicked
			generateNews(buttonId);
			categoryItemCounter(buttonId, e.target.innerText);
		});
		li.appendChild(navlink);
		navLinksList.appendChild(li);
	});
	document.querySelector('[data-id]').click();
}

generateNavLinks();