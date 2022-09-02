// news category api link
const url = 'https://openapi.programming-hero.com/api/news/categories';
const navLinksList = document.getElementById('navlinks');
// const navlinks = () => fetch(url)
// 	.then(res => res.json())
// 	.then(data => {
// 		let links = [];
// 		data.data.news_category.forEach(element => {
// 			links.push(element);
// 		})
// 		console.log(links);
// 	});

// let navlinks = [];

// function generateNavLinks() {
// 	fetch(url)
// 	.then(res => res.json())
// 	.then(data => {
// 		navlinks = data.data.news_category;
// 	});
// }

async function generateNavLinks() {
	// const links = [];
	const res = await fetch(url);
	const data = await res.json();
	await data.data.news_category.forEach(element => {
		const li = document.createElement('li');
		const navlink = document.createElement('a');
		navlink.innerText = element.category_name;
		li.appendChild(navlink);
		navLinksList.appendChild(li);
		console.log(element)
	});
	// await console.log(links);
}

generateNavLinks();

// const linksArray = generateNavLinks();


// const links = generateNavLinks();

// console.log(navlinks);

// for(link of links) {
// 	console.log(link)
// }