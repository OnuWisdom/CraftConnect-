const sideBar = document.querySelector('.sidebar');
const iconSideBar = document.querySelector('.icon-sidebar');
const logoIcon = document.querySelectorAll('.logo-icon');
const filterButtons = document.querySelectorAll('.pill');
const btnActions = document.querySelectorAll('.card-actions');
const filtersWrapper = document.querySelector('.filters');
// const firstButton   = filterButtons[0];           // the one that stays active
let currentActive = document.querySelector('.filter-btn.active');

// Function to toggle Sidebar
function toggleSidebar() {
	if (sideBar.classList.contains('hidden')) {
		sideBar.classList.remove('hidden');
	} else {
		sideBar.classList.add('hidden');
	}

	if (iconSideBar.classList.contains('hidden')) {
		iconSideBar.classList.remove('hidden');
	} else {
		iconSideBar.classList.add('hidden');
	}
}
// It's event listener
logoIcon.forEach((logo) => {
	logo.addEventListener('click', toggleSidebar);
});

// Function to select the filter buttons
filterButtons.forEach((btn) => {
	// skip the first button entirely; it stays active forever
	//   if (btn === firstButton) return;

	btn.addEventListener('click', () => {
		// remove .active from the last non‑first button, if there is one
		if (currentActive) currentActive.classList.remove('active');

		// mark the newly clicked button as active
		btn.classList.add('active');
		currentActive = btn; // update the tracker
	});
});

// function to format the date dynamically
function formatDate(date = new Date()) {
	const options = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};

	return date.toLocaleDateString('en-US', options);
}

function updateDate() {
	const dateElement = document.querySelectorAll('.date');

	dateElement.forEach((date) => {
		if (date) {
			date.textContent = formatDate();
		}
	});
}

// Update date immediately when page loads
updateDate();
// Update date every minute to keep it current
setInterval(updateDate, 60000);

// Function to handle the button actions
// document.getElementById('pending').addEventListener('click', (e) => {
//     const action = e.target.dataset.action;

//     if (!action) return;

//     if (action === 'accept') {
//         const statusChip = document.querySelector('.status-chip');
//         const cardActions = document.querySelector('#card-actions');
//         statusChip.textContent = 'In Progress';
//         statusChip.style.backgroundColor = '#34d399';
//         cardActions.innerHTML = `
//             <a href="messages.html" data-action="message" type="button" class="btn primary message" id="message"><i class="fa-solid fa-message"></i> Message client</a>
//             <button data-action="completed" type="button" class="btn completed">Mark as completed</button>
//         `

//     } else if (action === 'decline') {
//         const statusChip = document.querySelector('.status-chip');
//         const cardActions = document.querySelector('#card-actions');
//         statusChip.textContent = 'Declined';
//         statusChip.style.backgroundColor = '#f87171';
//         cardActions.innerHTML = `
//             <button data-action="re-accept" type="button" class="btn primary re-accept">Request re-accept</button>
//         `

//     } else if (action === 'completed') {
//         const statusChip = document.querySelector('.status-chip');
//         const cardActions = document.querySelector('#card-actions');
//         statusChip.textContent = 'Completed';
//         statusChip.style.backgroundColor = '#6fa8ff';
//         cardActions.innerHTML = `
//             <button data-action="review" type="button" class="btn primary review">Request a review</button>
//         `
//     } else if (action === 'review') {
//         const statusChip = document.querySelector('.status-chip');
//         const cardActions = document.querySelector('#card-actions');
//         statusChip.textContent = 'Completed';
//         statusChip.style.backgroundColor = '#6fa8ff';
//         cardActions.innerHTML = `
//             <button data-action="review" type="button" class="btn primary review">Review Message Sent</button>
//         `
//     } else if (action === 're-accept') {
//         const statusChip = document.querySelector('.status-chip');
//         const cardActions = document.querySelector('#card-actions');
//         statusChip.textContent = 'Pending';
//         statusChip.style.backgroundColor = '#ffd1ba';
//         cardActions.innerHTML = `
//            <button data-action="accept" type="button" class="btn primary accept">Accept</button>
//               <button data-action="decline" type="button" class="btn decline">Decline</button>
//         `
//     }
// })

function handleCardAction(action) {
    const statusChip = document.querySelector('.status-chip');
    const cardActions = document.querySelector('#card-actions');

    if (action === 'accept') {
        statusChip.textContent = 'In Progress';
        statusChip.style.backgroundColor = '#34d399';
        cardActions.innerHTML = `
            <a href="messages.html" class="btn primary message" id="message">
              <i class="fa-solid fa-message"></i> Message client
            </a>
            <button data-action="completed" type="button" class="btn completed">Mark as completed</button>
        `;
    } else if (action === 'decline') {
        statusChip.textContent = 'Declined';
        statusChip.style.backgroundColor = '#f87171';
        cardActions.innerHTML = `
            <button data-action="re-accept" type="button" class="btn primary re-accept">Request re-accept</button>
        `;
    } else if (action === 'completed') {
        statusChip.textContent = 'Completed';
        statusChip.style.backgroundColor = '#6fa8ff';
        cardActions.innerHTML = `
            <button data-action="review" type="button" class="btn primary review">Request a review</button>
        `;
    } else if (action === 'review') {
        statusChip.textContent = 'Completed';
        statusChip.style.backgroundColor = '#6fa8ff';
        cardActions.innerHTML = `
            <button data-action="review" type="button" class="btn primary review">Review Message Sent</button>
        `;
    } else if (action === 're-accept') {
        statusChip.textContent = 'Pending';
        statusChip.style.backgroundColor = '#ffd1ba';
        cardActions.innerHTML = `
            <button data-action="accept" type="button" class="btn primary accept">Accept</button>
            <button data-action="decline" type="button" class="btn decline">Decline</button>
        `;
    }
}

['pending', 'inprogress'].forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action) handleCardAction(action);
    });
});
