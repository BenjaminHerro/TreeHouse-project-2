var searchButton = document.createElement('button');
let search = document.createElement('div');
let input = document.createElement('input');
const header = document.querySelector('div div.page-header.cf');
const students = document.querySelectorAll('.student-item.cf');

// The following 20 or so lines build the main pagination div, based on the number of items given 
// in the HTML and build the base search bar in the header. The functionality of both sections
// is built following

var buttonListener = document.querySelectorAll('div.pagination ul li a');
var paginationView = document.querySelector('div.pagination')

search.className = 'student-search';
input.placeholder = 'Search for students...';
searchButton.innerText = 'Search';
search.appendChild(input);
search.appendChild(searchButton);
header.append(search);

const getPages = (array) => {
	let pagination = document.createElement("div");
	let pag_ul = document.createElement('ul');
	let numberOfPages = Math.ceil(array.length/10);

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
	// if (buttonListener.length === 0) {
	// 	$('.page').append(pagina
	tion);
	// } else {
		$(paginationView).remove()
		$('.page').append(pagination);
	// }
};

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
	let paginationKeep = document.querySelectorAll('div.pagination ul li a')

	if (!s) {
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