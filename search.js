
// ========================================
// JAYSON BARBER SHOP SEARCH
// ========================================

const searchPages = [

    {
        name: "Home",
        keywords: [
            "home",
            "jayson",
            "barber shop",
            "premium grooming",
            "grooming",
            "professional barber"
        ],
        url: "home.html"
    },

    {
        name: "Haircuts",
        keywords: [
            "haircut",
            "haircuts",
            "classic cut",
            "low fade",
            "mid fade",
            "high fade",
            "skin fade",
            "buzz cut",
            "undercut",
            "haircut beard"
        ],
        url: "haircut.html"
    },

    {
        name: "Services",
        keywords: [
            "services",
            "precision haircut",
            "beard grooming",
            "haircut beard",
            "premium services",
            "beard",
            "grooming"
        ],
        url: "services.html"
    },

    {
        name: "Barbers",
        keywords: [
            "barber",
            "barbers",
            "jayson",
            "mark",
            "professional barber",
            "master barber",
            "senior barber",
            "styling",
            "fades"
        ],
        url: "barbers.html"
    },

    {
        name: "Booking",
        keywords: [
            "booking",
            "book",
            "appointment",
            "reserve",
            "schedule",
            "book now"
        ],
        url: "booking.html"
    }

];


// ========================================
// GET SEARCH ELEMENTS
// ========================================

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const searchSuggestions =
    document.getElementById("searchSuggestions");


// ========================================
// SEARCH FUNCTION
// ========================================

function searchSite() {

    const query =
        searchInput.value
        .toLowerCase()
        .trim();


    // Empty search
    if (query === "") {

        searchSuggestions.innerHTML = "";

        searchSuggestions.style.display = "none";

        return;
    }


    // Find matching pages
    const results =
        searchPages.filter(page => {

            const pageName =
                page.name.toLowerCase();

            const keywords =
                page.keywords.join(" ").toLowerCase();

            return (
                pageName.includes(query) ||
                keywords.includes(query)
            );

        });


    // Clear old results
    searchSuggestions.innerHTML = "";


    // ====================================
    // NO RESULTS
    // ====================================

    if (results.length === 0) {

        searchSuggestions.innerHTML = `
            <div class="no-result">
                No results found
            </div>
        `;

        searchSuggestions.style.display = "block";

        return;
    }


    // ====================================
    // DISPLAY RESULTS
    // ====================================

    results.forEach(page => {

        const result =
            document.createElement("div");

        result.className =
            "search-result";

        result.innerHTML =
            `✂ <span>${page.name}</span>`;


        result.addEventListener("click", function() {

            window.location.href =
                page.url;

        });


        searchSuggestions.appendChild(result);

    });


    searchSuggestions.style.display =
        "block";
}


// ========================================
// SEARCH BUTTON
// ========================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchSite
    );

}


// ========================================
// LIVE SEARCH
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchSite
    );

}


// ========================================
// ENTER KEY
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                const query =
                    searchInput.value
                    .toLowerCase()
                    .trim();


                const result =
                    searchPages.find(page => {

                        const keywords =
                            page.keywords
                            .join(" ")
                            .toLowerCase();

                        return (
                            page.name
                            .toLowerCase()
                            .includes(query) ||

                            keywords
                            .includes(query)
                        );

                    });


                if (result) {

                    window.location.href =
                        result.url;

                }

            }

        }
    );

}


// ========================================
// CLOSE SEARCH RESULTS
// ========================================

document.addEventListener(
    "click",
    function(event) {

        const searchContainer =
            document.querySelector(
                ".search-container"
            );


        if (
            searchContainer &&
            !searchContainer.contains(event.target)
        ) {

            searchSuggestions.style.display =
                "none";

        }

    }
);
document.addEventListener('DOMContentLoaded', () => {

    // 1. LIVE SEARCH FOR HAIRCUTS & SERVICES
    const searchInput = document.getElementById('searchInput');
    const searchableCards = document.querySelectorAll('.card.searchable');
    const noResultsMsg = document.getElementById('noResults');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let hasMatches = false;

        searchableCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const textContent = card.innerText.toLowerCase();

            if (title.includes(query) || textContent.includes(query)) {
                card.style.display = 'block';
                hasMatches = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (hasMatches) {
            noResultsMsg.classList.add('hidden');
        } else {
            noResultsMsg.classList.remove('hidden');
        }
    });

    // 2. APPOINTMENT BOOKING HANDLING (LocalStorage)
    const bookingForm = document.getElementById('bookingForm');
    const bookingMsg = document.getElementById('bookingMsg');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const bookingData = {
            id: Date.now(),
            name: document.getElementById('customerName').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            barber: document.getElementById('barber').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };

        // Save to LocalStorage
        let bookings = JSON.parse(localStorage.getItem('barberBookings')) || [];
        bookings.push(bookingData);
        localStorage.setItem('barberBookings', JSON.stringify(bookings));

        // Show Success Message
        bookingMsg.classList.remove('hidden');
        bookingForm.reset();

        setTimeout(() => {
            bookingMsg.classList.add('hidden');
        }, 4000);
    });

    // 3. FEEDBACK FORM HANDLING
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMsg = document.getElementById('feedbackMsg');
    const feedbackList = document.getElementById('feedbackList');

    // Render Initial Feedbacks
    const renderFeedbacks = () => {
        let feedbacks = JSON.parse(localStorage.getItem('barberFeedbacks')) || [];
        feedbackList.innerHTML = '';

        feedbacks.slice().reverse().forEach(fb => {
            const fbElement = document.createElement('div');
            fbElement.className = 'feedback-item';
            fbElement.innerHTML = `
                <div class="feedback-header">
                    <span class="feedback-name">${escapeHTML(fb.name)}</span>
                    <span class="feedback-rating">${fb.rating}</span>
                </div>
                <p>${escapeHTML(fb.comment)}</p>
            `;
            feedbackList.appendChild(fbElement);
        });
    };

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const feedbackData = {
            name: document.getElementById('feedbackName').value,
            rating: document.getElementById('rating').value,
            comment: document.getElementById('comment').value
        };

        let feedbacks = JSON.parse(localStorage.getItem('barberFeedbacks')) || [];
        feedbacks.push(feedbackData);
        localStorage.setItem('barberFeedbacks', JSON.stringify(feedbacks));

        feedbackMsg.classList.remove('hidden');
        feedbackForm.reset();
        renderFeedbacks();

        setTimeout(() => {
            feedbackMsg.classList.add('hidden');
        }, 4000);
    });

    renderFeedbacks();
});

// 4. ADMIN DASHBOARD MODAL FUNCTIONS
function openAdminModal() {
    const modal = document.getElementById('adminModal');
    const tableBody = document.getElementById('adminBookingTable');
    let bookings = JSON.parse(localStorage.getItem('barberBookings')) || [];

    tableBody.innerHTML = '';

    if (bookings.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No appointments found.</td></tr>`;
    } else {
        bookings.forEach(b => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${escapeHTML(b.name)}</td>
                <td>${escapeHTML(b.phone)}</td>
                <td>${escapeHTML(b.service)}</td>
                <td>${escapeHTML(b.barber)}</td>
                <td>${b.date} @ ${b.time}</td>
                <td><button class="btn-delete" onclick="deleteBooking(${b.id})">Cancel</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    modal.style.display = 'flex';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

function deleteBooking(id) {
    let bookings = JSON.parse(localStorage.getItem('barberBookings')) || [];
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('barberBookings', JSON.stringify(bookings));
    openAdminModal(); // Refresh modal view
}

// Utility to escape dangerous HTML strings
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
