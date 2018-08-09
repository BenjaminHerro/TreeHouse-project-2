var searchButton = document.createElement('button');
let search = document.createElement('div');
let input = document.createElement('input');
const header = document.querySelector('div div.page-header.cf');
const students = document.querySelectorAll('.student-item.cf');
var buttonListener = document.querySelectorAll('div.pagination ul li a');
var paginationView = document.querySelector('div.pagination')

// The following 6 lines build the search bar and button and appends them to the header of the page.
search.className = 'student-search';
input.placeholder = 'Search for students...';
searchButton.innerText = 'Search';
searchButton.className = 'search-button';
search.appendChild(input);
search.appendChild(searchButton);
header.append(search);

// The getPages function below takes an array of elements, counts how many elements are within the array and
// builds a pagination div containing a list of indexes to be appended to the .pages class within the DOM,
// to be used in the paginate function. If there is no content to be paginated, this function returns 
// the pagination div with 'No results found'.
const getPages = (array) => {
	let pagination = document.createElement("div");
	let pag_ul = document.createElement('ul');
	let numberOfPages = Math.ceil(array.length/10);

	if (array.length === 0) {
		let noContent = document.createElement('p');
		noContent.innerText = 'No results found.';
		noContent.className = 'no-content';
		pagination.append(noContent);
		pagination.className = 'pagination';
		$('.page').append(pagination);
	}

	for (i=1;i<=numberOfPages;i++) {
		let li = document.createElement('li')
		let button = document.createElement('a')
		button.href = '#'
		button.innerText = i
		li.appendChild(button)
		pag_ul.appendChild(li)
	};

	pagination.append(pag_ul);
	pagination.className = 'pagination';
	$(paginationView).remove()
	$('.page').append(pagination);
};

// This is the pageinate function, which takes an array of students and splits the set into smaller sections.
// For each button in button array declared above, a new event listener is applied which allows
// the user to click on the button. Click on each button will display a new page of content
// which is generated based on the index of the button. For example, the first page will take 
// the button's inner text (1), subtract 1 to get the beginning of the set, use the index as the
// end of the set, multiply both by 10 and use the jQuery slice method to display a list of students
// within this range. The button listener then changes the active button from the previous to the current
const paginate = (stuArray) => {
		getPages(stuArray)
		buttonListener = document.querySelectorAll('div.pagination ul li a');

		buttonListener[0].className = 'active'
		$(stuArray).hide().slice(0,10).show()

		buttonListener.forEach(button => button.addEventListener(
			'click', () => {
				let currIndex = button.innerText
				let currActive = document.querySelector('.active')
				$(stuArray).hide().slice((currIndex-1)*10,currIndex*10).show()
				if (button.className === 'active') {
					currActive = 'active'
				} else {
					buttonListener[currIndex-1].className = 'active'
					currActive.className = ''
				}
			})
		)
};

// Search function, iterates over the students array, checks whether the search bar content is an element
// of the student's text content and returns all students matching. If the text input content is none,
// the function will just return.
const searchBar = (s) => {
	let stuShow = []
	let paginationKeep = document.querySelectorAll('div.pagination')

	if (!s) {
		$(paginationKeep).remove()
		paginate(students)
		return
	} else {
		for (i=0;i<students.length;i++) {
			if (students[i].innerText.indexOf(s) >= 0) {
				stuShow.push(students[i])
				// students[i].hide()
			}
		}
		$(students).hide()
		// $(stuShow).show()
		$(paginationKeep).remove()
		paginate(stuShow)
	}
};

// Displays first 10 students on first load of the page. Sets that button's class to 'active'.
$(window).on('load',function(e) {
	paginate(students)
});

// Search variables and event listeners to get the value of the content within the input box and calls
// the search function.
let stuSearchButton = document.querySelector('.student-search button');
let searchInput = document.querySelector('.student-search input')

stuSearchButton.addEventListener('click', () => {
	let searchContent = searchInput.value
	searchBar(searchContent)
});

searchInput.addEventListener('keyup', function(e) {
	let searchContent = searchInput.value
	searchBar(searchContent)
});