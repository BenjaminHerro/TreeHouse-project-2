var pagination = document.createElement("div");
var search = document.createElement('div');
var input = document.createElement('input');
var searchButton = document.createElement('button');
var p_ul = document.createElement('ul');
const header = document.querySelector('div div.page-header.cf');
const students = document.querySelectorAll('.student-item.cf');
const numberOfPages = Math.ceil(students.length/10);

// The following 20 or so lines build the main pagination div, based on the number of items given 
// in the HTML and build the base search bar in the header. The functionality of both sections
// is built following
pagination.className = 'pagination';

for (i=1;i<=numberOfPages;i++) {
	let li = document.createElement('li')
	let button = document.createElement('a')
	button.href = '#'
	button.innerText = i
	li.appendChild(button)
	p_ul.appendChild(li)
};

pagination.append(p_ul);

$('.page').append(pagination);

var buttonListener = document.querySelectorAll('div.pagination ul li a');

search.className = 'student-search';
input.placeholder = 'Search for students...';
searchButton.innerText = 'Search';
search.appendChild(input);
search.appendChild(searchButton);
header.append(search);

// Search function, iterates over the students array, checks whether the search bar content is an element
// of the student's text content and returns all students matching.
const searchBar = (s) => {
	let stuShow = []
	for (i=0;i<students.length;i++) {
		if (students[i].innerText.indexOf(s) >= 0) {
			stuShow.push(students[i])
		}
	}
	$(students).hide()
	$(stuShow).show()
};

// Displays first 10 students on first load of the page. Sets that button's class to 'active'.
$(window).on('load',function(e) {
	$('.student-item.cf').hide().slice(0,10).show()
	let button1 = document.querySelector('.pagination ul li a')
	button1.className = 'active'
});

// For each button in button array declared above, a new event listener is applied which allows
// the user to click on the button. Click on each button will display a new page of content
// which is generated based on the index of the button. For example, the first page will take 
// the button's inner text (1), subtract 1 to get the beginning of the set, use the index as the
// end of the set, multiply both by 10 and use the jQuery slice method to display a list of students
// within this range. The button listener then changes the active button from the previous to the current,
// and clears the search bar content.
buttonListener.forEach(button => button.addEventListener(
	'click', () => {
		let currIndex = button.innerText
		let currActive = document.querySelector('.active')
		$(students).hide().slice((currIndex-1)*10,currIndex*10).show()
		buttonListener[currIndex-1].className = 'active'
		currActive.className = ''
		input.value = ''
	})
);

// Search variables and event listeners to get the value of the content within the input box and calls
// the search function.
let stuSearch = document.querySelector('.student-search button');

stuSearch.addEventListener('click', () => {
	let searchContent = document.querySelector('.student-search input').value
	searchBar(searchContent)
});