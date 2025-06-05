// ------------------- About Page Script ------------------- //
// Function For the Profile Dropdown
function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");
    let arrow = document.getElementById("arrow");

    // Toggle dropdown visibility
    dropdown.classList.toggle("dropdown");

    // Toggle arrow rotation
    arrow.classList.toggle("active");
}

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    let dropdown = document.getElementById ('dropdown');
    let profileInfo = document.querySelector ('.profile-info');

    if (!profileInfo.contains(event.target)) {
        dropdown.style.display = 'none';
        document.getElementById('arrow').classList.remove('active');
    }
});

// ---Mobile Navbar Toggle--- //

// Navbar toggle function for mobile
function toggleNavbar() {
    let navbar = document.querySelector('.navbar');
    navbar.classList.toggle('show');
}

// Function for the search

const artisans = [
    {name: "Priya Sharma", skill: "Hair and Beauty", location: "Lagos"},
    {name: "Jephthah", skill: "Coding", location: "Lagos"},
    {name: "Samuel", skill: "Programming", location: "Rivers"},
    {name: "Thelma", skill: "Nails", location: "Rivers"},
    {name: "Favour", skill: "Bead Work", location: "Abuja"}
]
function renderArtisans(list, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    list.forEach(artisans => {
        const card = document.createElement("div");
        card.className = "testimonials";
        card.innerHTML = `
        <div class="user">
                        <div class="userImg">
                            <img src="images/face1.jpg" alt="userimg">
                        </div>

                        <div class="userDetails">
                            <h4>${artisans.name}</h4>
                            <p>${artisans.skill}</p>
                        </div>
                    </div>
                    <!--  -->

                    <!-- Rating container -->
                    <div class="ratingFrame">

                        <!-- Stars per rate -->
                        <div class="stars">
                            <!-- Star 1 -->
                            <div class="star">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.76026 10.9469L10.8794 
                                        10.1564L12.1826 14.1728L7.76026 
                                        10.9469ZM14.9385 5.75548H9.448L7.76026
                                        0.585449L6.07252 5.75548H0.582031L5.0257
                                        8.96005L3.33796 14.1301L7.78162
                                        10.9255L10.5162 8.96005L14.9385 
                                        5.75548Z" fill="white"/>
                                 </svg>
                            </div>
                            <!-- Star 2 -->
                            <div class="star">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.76026 10.9469L10.8794 
                                        10.1564L12.1826 14.1728L7.76026 
                                        10.9469ZM14.9385 5.75548H9.448L7.76026
                                        0.585449L6.07252 5.75548H0.582031L5.0257
                                        8.96005L3.33796 14.1301L7.78162
                                        10.9255L10.5162 8.96005L14.9385 
                                        5.75548Z" fill="white"/>
                                </svg>
                            </div>
                            <!-- Star 3 -->
                            <div class="star">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.76026 10.9469L10.8794 
                                        10.1564L12.1826 14.1728L7.76026 
                                        10.9469ZM14.9385 5.75548H9.448L7.76026
                                        0.585449L6.07252 5.75548H0.582031L5.0257
                                        8.96005L3.33796 14.1301L7.78162
                                        10.9255L10.5162 8.96005L14.9385 
                                        5.75548Z" fill="white"/>
                                </svg>
                            </div>
                            <!-- Star 4 -->
                            <div class="star">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.76026 10.9469L10.8794 
                                        10.1564L12.1826 14.1728L7.76026 
                                        10.9469ZM14.9385 5.75548H9.448L7.76026
                                        0.585449L6.07252 5.75548H0.582031L5.0257
                                        8.96005L3.33796 14.1301L7.78162
                                        10.9255L10.5162 8.96005L14.9385 
                                        5.75548Z" fill="white"/>
                                </svg>
                            </div>
                            <!-- Star 5-->
                            <div class="star">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.76026 10.9469L10.8794 
                                        10.1564L12.1826 14.1728L7.76026 
                                        10.9469ZM14.9385 5.75548H9.448L7.76026
                                        0.585449L6.07252 5.75548H0.582031L5.0257
                                        8.96005L3.33796 14.1301L7.78162
                                        10.9255L10.5162 8.96005L14.9385 
                                        5.75548Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <!-- Rate per star done -->
                                
                        <!-- Rate per text -->
                        <div class="rate"><p>5 0f 5 | 254 ratings</p></div>
                        <!--  -->

                    </div>
                    <!-- Rating frame done -->

                    <!-- Review text and location -->
                    <div class="reviewFrame">
                        <!-- Review text -->
                        <div class="review"><p>Exceptional service, quick and clean braids</p></div>
                        <!--  -->

                        <!-- Location -->
                        <div class="location">

                            <!-- Location icon-->
                            <div class="locationIcon">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.56759 18.8386C9.40439 18.9558 9.20852 19.0188 9.00759 19.0188C8.80666 19.0188 8.6108 18.9558 8.44759 18.8386C3.61859 15.3966 -1.50641 8.31656 3.67459 3.20056C5.09694 1.8014 7.01243 1.01768 9.00759 1.01856C11.0076 1.01856 12.9266 1.80356 14.3406 3.19956C19.5216 8.31556 14.3966 15.3946 9.56759 18.8386Z" stroke="#514F6E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" id="circle">
                                    <path d="M3.00781 5.01855C3.53825 5.01855 4.04695 4.80784 4.42203 4.43277C4.7971 4.0577 5.00781 3.54899 5.00781 3.01855C5.00781 2.48812 4.7971 1.97941 4.42203 1.60434C4.04695 1.22927 3.53825 1.01855 3.00781 1.01855C2.47738 1.01855 1.96867 1.22927 1.5936 1.60434C1.21853 1.97941 1.00781 2.48812 1.00781 3.01855C1.00781 3.54899 1.21853 4.0577 1.5936 4.43277C1.96867 4.80784 2.47738 5.01855 3.00781 5.01855Z" stroke="#514F6E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <!-- Location icon done  -->
                                
                            <!-- Location Text -->
                            <div class="locationText"><p>${artisans.location}</p></div>
                            <!--  -->
                        </div>
                    </div>
                    <!-- Review text and location done -->

                    <!--Buttons for viewing profile and booking an artisan  -->
                    <div class="connectFrame">
                        <button type="button" id="view">View profile</button>

                        <button type="button" id="book">Book  now</button>
                    </div>`
                container.appendChild(card)
    });
}
function handleSearch() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    const explore = document.getElementById("explore");
    const search = document.getElementById("search");
    const noResult = document.getElementById("error");

    const results = artisans.filter(artisans => 
        artisans.name.toLowerCase().includes(input)||
        artisans.skill.toLowerCase().includes(input)||
        artisans.location.toLowerCase().includes(input)
    );

    if (input === "") {
        explore.style.display = "block";
        search.style.display = "none";
        noResult.style.display = "none";
    } else if (results.length > 0) {
        renderArtisans(results, "filteredResults");
        explore.style.display = "none";
        search.style.display = "block";
        noResult.style.display = "none";
    }else{
        explore.style.display = "none";
        search.style.display = "none";
        noResult.style.display = "block";
    }
};














