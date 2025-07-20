const sideBar = document.querySelector('.sidebar');
const iconSideBar = document.querySelector('.icon-sidebar');
const logoIcon = document.querySelectorAll('.logo-icon');
const filterButtons = document.querySelectorAll('.pill');
const btnActions = document.querySelectorAll('.card-actions');
const filtersWrapper = document.querySelector('.filters');
let currentActive = document.querySelector('.filter-btn.active');

// Initialize Socket.IO connection
const socket = io();

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
	btn.addEventListener('click', () => {
		if (currentActive) currentActive.classList.remove('active');
		btn.classList.add('active');
		currentActive = btn;
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
setInterval(updateDate, 60000);

// Socket.IO event listener for real-time updates
socket.on('bookingStatusUpdate', (data) => {
    const bookingCard = document.querySelector(`[data-booking-id="${data.bookingId}"]`);
    
    if (bookingCard) {
        const statusChip = bookingCard.querySelector('.status-chip');
        const cardActions = bookingCard.querySelector('.card-actions');
        
        // Update status chip
        if (statusChip) {
            statusChip.textContent = capitalizeFirst(data.status);
            updateStatusChipColor(statusChip, data.status);
        }
        
        // Update card actions based on new status
        if (cardActions) {
            updateCardActions(cardActions, data.status, data.bookingId);
        }
        
        console.log(`Booking ${data.bookingId} status updated to: ${data.status}`);
    }
});

// Helper function to capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to update status chip color
function updateStatusChipColor(statusChip, status) {
    // Remove existing status classes
    statusChip.classList.remove('pending', 'accepted', 'declined', 'completed');
    
    switch(status) {
        case 'pending':
            statusChip.style.backgroundColor = '#ffd1ba';
            break;
        case 'accepted':
            statusChip.style.backgroundColor = '#34d399';
            statusChip.textContent = 'In Progress';
            break;
        case 'declined':
            statusChip.style.backgroundColor = '#f87171';
            break;
        case 'completed':
            statusChip.style.backgroundColor = '#6fa8ff';
            break;
        default:
            statusChip.style.backgroundColor = '#ffd1ba';
    }
}

// Helper function to update card actions based on status
function updateCardActions(cardActions, status, bookingId) {
    switch(status) {
        case 'accepted':
            cardActions.innerHTML = `
                <a href="messages.html" class="btn primary message">
                    <i class="fa-solid fa-message"></i> Message client
                </a>
                <button data-action="completed" data-booking-id="${bookingId}" type="button" class="btn completed">Mark as completed</button>
            `;
            break;
        case 'declined':
            cardActions.innerHTML = `
                <button data-action="reaccept" data-booking-id="${bookingId}" type="button" class="btn primary re-accept">Request re-accept</button>
            `;
            break;
        case 'completed':
            cardActions.innerHTML = `
                <button data-action="review" data-booking-id="${bookingId}" type="button" class="btn primary review">Request a review</button>
            `;
            break;
        case 'pending':
            cardActions.innerHTML = `
                <button data-action="accept" data-booking-id="${bookingId}" type="button" class="btn primary accept">Accept</button>
                <button data-action="decline" data-booking-id="${bookingId}" type="button" class="btn decline">Decline</button>
            `;
            break;
    }
}

async function handleCardAction(action, bookingId) {
    try {
        let response;
        
        if(action === 'accept') {
            response = await fetch(`/booking/${bookingId}/accept`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else if(action === 'decline') {
            response = await fetch(`/booking/${bookingId}/decline`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else if(action === 'reaccept') {
            response = await fetch(`/booking/${bookingId}/reaccept`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else if(action === 'completed') {
            response = await fetch(`/booking/${bookingId}/complete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        if (response && response.ok) {
            const result = await response.json();
            console.log('Booking updated successfully:', result);
            // The UI will be updated via Socket.IO event
        } else {
            console.error('Failed to update booking status');
        }
    } catch (error) {
        console.error('Error updating booking:', error);
    }
}

// Keep your existing updateUI function for fallback/immediate feedback
function updateUI(action, bookingId) {
    const bookingCard = document.querySelector(`[data-booking-id="${bookingId}"]`);
    if (!bookingCard) return;
    
    const statusChip = bookingCard.querySelector('.status-chip');
    const cardActions = bookingCard.querySelector('.card-actions');

    if (action === 'accept') {
        if (statusChip) {
            statusChip.textContent = 'In Progress';
            statusChip.style.backgroundColor = '#34d399';
        }
        if (cardActions) {
            cardActions.innerHTML = `
                <a href="messages.html" class="btn primary message">
                    <i class="fa-solid fa-message"></i> Message client
                </a>
                <button data-action="completed" data-booking-id="${bookingId}" type="button" class="btn completed">Mark as completed</button>
            `;
        }
    } else if (action === 'decline') {
        if (statusChip) {
            statusChip.textContent = 'Declined';
            statusChip.style.backgroundColor = '#f87171';
        }
        if (cardActions) {
            cardActions.innerHTML = `
                <button data-action="reaccept" data-booking-id="${bookingId}" type="button" class="btn primary re-accept">Request re-accept</button>
            `;
        }
    } else if (action === 'completed') {
        if (statusChip) {
            statusChip.textContent = 'Completed';
            statusChip.style.backgroundColor = '#6fa8ff';
        }
        if (cardActions) {
            cardActions.innerHTML = `
                <button data-action="review" data-booking-id="${bookingId}" type="button" class="btn primary review">Request a review</button>
            `;
        }
    }
}

// Event delegation for dynamic button clicks
document.addEventListener('click', function(e) {
    if (e.target.hasAttribute('data-action')) {
        const action = e.target.getAttribute('data-action');
        const bookingId = e.target.getAttribute('data-booking-id') || 
                         e.target.closest('[data-booking-id]').getAttribute('data-booking-id');
        
        if (bookingId) {
            handleCardAction(action, bookingId);
        }
    }
});