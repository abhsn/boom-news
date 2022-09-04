const navLinksList = document.getElementById('navlinks');
const categoryItem = document.getElementById('category-item-counter');
const article = document.getElementById('article');
const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalButton = document.getElementById('close-modal');
const modalAuthorImage = document.getElementById('modal-author-image');
const modalAuthorName = document.getElementById('modal-author-name');
const modalTotalView = document.getElementById('modal-total-view');

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

let isHamburgerMenuOpen = false;

hamburgerMenu.addEventListener('click', () => {
	if(isHamburgerMenuOpen) {
		navLinksList.style.display = 'none';
		isHamburgerMenuOpen = false;
	}
	else {
		navLinksList.style.display = 'flex';
		isHamburgerMenuOpen = true;
	}
});

async function generateNews(id) {
	article.innerHTML = '';
	const url = `https://openapi.programming-hero.com/api/news/category/${id}`
	const res = await fetch(url);
	const data = await res.json();
	const articleArray = await data.data;
	
	console.log(articleArray.length);
	let totalStar = 5;
	await articleArray.forEach(element => {
		
		// creates each article section
		const articleSection = document.createElement('div');
		articleSection.classList.add('flex', 'gap-x-4', 'p-4', 'rounded', 'shadow-2xl', 'cursor-pointer', 'article-section');
		// console.log(element);
		
		// image section
		const imageDiv = document.createElement('div');
		imageDiv.classList.add('flex', 'items-center', 'justify-center');
		const image = document.createElement('img');
		image.setAttribute('src', element.thumbnail_url);
		imageDiv.appendChild(image);

		// text section
		const textDiv = document.createElement('div');
		textDiv.classList.add('w-3/4', 'flex', 'flex-col', 'gap-4', 'text-div');
		const articleText = document.createElement('div');
		articleText.classList.add('flex', 'flex-col', 'gap-y-4');
		const articleTitle = document.createElement('h3');
		articleTitle.classList.add('text-3xl');
		articleTitle.innerText = element.title;
		const articleParagraph = document.createElement('p');
		articleParagraph.innerText = element.details.length >= 500 ? element.details.slice(0,500).concat('...') : element.details;
		articleText.appendChild(articleTitle);
		articleText.appendChild(articleParagraph);
		textDiv.appendChild(articleText);
		
		

		const articleDetails = document.createElement('div');
		articleDetails.classList.add('flex', 'justify-between', 'items-center', 'article-details');

		const author = document.createElement('div');
		author.classList.add('flex', 'items-center', 'gap-x-2');
		const authorImage = document.createElement('img');
		authorImage.setAttribute('src', element.author.img);
		authorImage.classList.add('w-10');
		authorImage.style.borderRadius = '50%';
		const authorName = document.createElement('h4');
		authorName.innerText = (element.author.name === null || element.author.name === '' || element.author.name === undefined) ? 'No valid data found' : element.author.name;
		author.appendChild(authorImage);
		author.appendChild(authorName);
		

		const totalView = document.createElement('div');
		totalView.classList.add('flex', 'justify-center', 'items-center');
		const totalViewEye = document.createElement('img');
		totalViewEye.src = 'images/eye.svg';
		totalViewEye.classList.add('w-5', 'mr-2');
		

		const totalViewCounter = document.createElement('p');
		totalViewCounter.innerText = element.total_view === null ? 'No valid data found' : element.total_view;

		totalView.appendChild(totalViewEye);
		totalView.appendChild(totalViewCounter);

		const rating = document.createElement('div');
		rating.classList.add('flex', 'gap-x-2');
		const ratingNumberText = document.createElement('p');
		let ratingNumber = element.rating.number;
		ratingNumberText.innerText = ratingNumber;
		ratingNumberFloor = Math.floor(ratingNumber);
		
		for(let i = 0; i < ratingNumberFloor; i++) {
			const star = document.createElement('img');
			star.src = 'images/star-full.svg';
			star.classList.add('w-5')
			rating.appendChild(star);
			totalStar--;
		}

		if(ratingNumber.toString().split('.')[1] !== 0) {
			const star = document.createElement('img');
			star.src = 'images/star-half.svg';
			star.classList.add('w-5')
			rating.appendChild(star);
			totalStar--;
		}

		for(let i = 0; i < totalStar; i++) {
			const star = document.createElement('img');
			star.src = 'images/star-empty.svg';
			star.classList.add('w-5')
			rating.appendChild(star);
			totalStar--;
		}
		
		rating.appendChild(ratingNumberText);

		const showMoreButton = document.createElement('a');
		showMoreButton.href = '';
		showMoreButton.addEventListener('click', (e) => {
			e.preventDefault();
			openModal(element.title, element.details, element.author, element.total_view);
		});

		const showMoreButtonImage = document.createElement('img');
		showMoreButtonImage.src = 'images/arrow-right.svg';
		showMoreButtonImage.classList.add('w-5');
		showMoreButton.appendChild(showMoreButtonImage);

		articleDetails.appendChild(author);
		articleDetails.appendChild(totalView);
		articleDetails.appendChild(rating);
		articleDetails.appendChild(showMoreButton);

		textDiv.appendChild(articleDetails);

		// appends text and image divs to parent div
		articleSection.appendChild(imageDiv);
		articleSection.appendChild(textDiv);

		article.appendChild(articleSection);
		articleSection.addEventListener('click', (e) => {
			e.preventDefault();
			openModal(element.title, element.details, element.author, element.total_view);
		});
	});
	document.getElementById('spinner').classList.add('hidden');
}

async function categoryItemCounter(id, category_name) {
	const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
	const data = await res.json();
	const arrayLength = await data.data.length;
	// console.log(arrayLength)
	if(arrayLength !== 0) {
		categoryItem.innerText = `${category_name} has ${arrayLength} items`
		categoryItem.parentElement.classList.remove('hidden');
 }
 else {
		categoryItem.innerText = `Nothing found in ${category_name}`
		categoryItem.parentElement.classList.remove('hidden');
 }
}

function openModal(title, article, author, view) {
	modalContainer.style.opacity = 1;
	modalContainer.style.pointerEvents = 'all';
	modalTitle.innerText = title;
	modalText.innerText = article;
	modalAuthorImage.src = author.img;
	modalAuthorImage.style.borderRadius = '50%';
	modalAuthorName.innerText = author.name;
	modalTotalView.innerText = view;
}

function closeModal() {
	modalContainer.style.opacity = 0;
	modalContainer.style.pointerEvents = 'none';
}

modalButton.addEventListener('click', closeModal);

const date = new Date();
const siteTitle = document.title;

document.getElementById('footer-date').innerText = `${date.getFullYear()}`;
document.getElementById('footer-title').innerText = siteTitle;