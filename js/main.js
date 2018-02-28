const pagination = document.createElement("div");
const students = document.querySelectorAll('.student-details');
const stuNames = document.querySelectorAll('.student-details h3');
let counter = 0;

$('.student-list').hide();

// function getPage ()

for(i=0;i<numStu.length;i++){
	if (counter == 10) {
		counter = 0;
	}

	};

pagination.className = 'pageination';