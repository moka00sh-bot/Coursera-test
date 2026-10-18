
const destinations = [
  { id: 1, name: "Santorini, Greece", category: "Beach", price: 850, rating: 4.9, image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80", description: "Beautiful beaches and amazing sunsets" },
  { id: 2, name: "Swiss Alps, Switzerland", category: "Mountain", price: 1100, rating: 4.8, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80", description: "Amazing mountains and peaceful nature" },
  { id: 3, name: "Kyoto, Japan", category: "City", price: 920, rating: 4.9, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80", description: "Discover temples and Japanese culture" },
  { id: 4, name: "Amalfi Coast, Italy", category: "Beach", price: 980, rating: 4.7, image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80", description: "Explore colorful seaside villages" },
  { id: 5, name: "Patagonia, Argentina", category: "Adventure", price: 1350, rating: 4.9, image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=900&q=80", description: "Enjoy glaciers and outdoor adventures" },
  { id: 6, name: "Tokyo, Japan", category: "City", price: 890, rating: 4.8, image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80", description: "Discover modern city life and culture" }
];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let trips = JSON.parse(localStorage.getItem("trips")) || [];
let category = "all";
let selectedTrip;
const $= id => document.getElementById(id);
const modal = new bootstrap.Modal($("bookingModal"));
function renderCards(list,target,saved=false){
    $(target).innerHTML=list.map(d =>` 
         <div class="col-md-6 col-lg-4">
      <div class="destination-card">
        <div class="destination-image-wrap">
          <img src="${d.image}" class="destination-image" alt="${d.name}">
          <button class="heart-button" onclick="toggleFavorite(${d.id})">
            <i class="bi ${favorites.includes(d.id) ? "bi-heart-fill" : "bi-heart"}"></i>
          </button>
          <span class="destination-badge">${d.category}</span>
        </div>
        <div class="destination-body">
          <h3 class="destination-title">${d.name}</h3>
          <p class="destination-description">${d.description}</p>
          <div class="destination-footer">
            <span class="destination-price">$${d.price}<small>/ person</small></span>
            ${saved
              ? `<button class="btn-book" onclick="toggleFavorite(${d.id})">Remove</button>`
              : `<button class="btn-book" onclick="bookTrip(${d.id})">Book Trip</button>`}
          </div>
        </div>
      </div>
    </div>`).join("");
}
// show the categories
function displayDestinations(){
    const search=$("search-input").value.toLowerCase();
    const list =destinations.filter(d =>
    (category === "all" || d.category === category) &&
    (d.name.toLowerCase().includes(search) || d.description.toLowerCase().includes(search))
    );
    $("destination-count").textContent = list.length;
    renderCards(list, "destinations-grid")
}
function displayFavorites(){
    const list = destinations.filter(d => favorites.includes(d.id));
    renderCards(list,"bookmarks-grid",true);
    $("empty-bookmarks").classList.toggle("d-none",list.length>0);
    $("bookmark-count").textContent=favorites.length;

}
function toggleFavorite(id) {
  favorites = favorites.includes(id)
    ? favorites.filter(x => x !== id)
    : [...favorites, id];

  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayDestinations();
  displayFavorites();
}
$("search-input").addEventListener("input", displayDestinations);
function filterCategory(value, button) {
  document.querySelectorAll("[data-category]")
    .forEach(b => b.classList.toggle("active", b === button));

  document.getElementById("category-filter").value = value;
  displayDestinations();
}
// Open booking modal
function bookTrip(id) {
  selectedTrip = destinations.find(d => d.id === id);
  $("modal-img").src = selectedTrip.image;
  $("modal-title").textContent = selectedTrip.name;
  $("modal-location").textContent = selectedTrip.name;
  $("modal-category").textContent = selectedTrip.category;
  $("modal-price").textContent = "$" + selectedTrip.price;
  $("modal-rating").textContent = selectedTrip.rating;
  $("modal-description").textContent = selectedTrip.description;
  modal.show();
}
$("booking-form").addEventListener("submit",function(e){
    e.preventDefault();
    const date =$("book-date").value;
    const travelers =Number($("book-travelers").value);
    if (!selectedTrip || !date || travelers < 1) return;
  trips.push({
    ...selectedTrip,
    tripId: Date.now(),
    date: date,
    travelers: travelers,
    total: selectedTrip.price * travelers
  });
  localStorage.setItem("trips",JSON.stringify(trips));
  displayTrips();
  modal.hide();
  this.reset();
  alert("Trip booked successfully!");
});
// display booked trips
function DisplayTrips(){
    const list = $("itinerary-list");
    if(!list)return;
    list.innerHTML = trips.map(t => `
    <div class="destination-card mb-3 p-3">
      <h3>${t.name}</h3>
      <p>Date: ${t.date}</p>
      <p>Travelers: ${t.travelers}</p>
      <p>Total: $${t.total}</p>
      <button class="btn-book"
        onclick="removeTrip(${t.tripId})">
        Cancel Trip
      </button>
    </div>
  `).join("");
  $("itinerary-count").textContent=trips.length;
  $("itinerary-total").textContent =
    "$" + trips.reduce((sum, t) => sum + t.total, 0);
}
// Remove booked trip
function removeTrip(id) {
  trips = trips.filter(t => t.tripId !== id);
  localStorage.setItem("trips", JSON.stringify(trips));
  displayTrips();
}
// Show app pages
function showPage(page) {
  document.querySelectorAll(".app-view").forEach(p => {
    p.classList.add("d-none");
  });
  $("view-" + page).classList.remove("d-none");
  if (page === "explore") displayDestinations();
  if (page === "bookmarks") displayFavorites();
  if (page === "itinerary") displayTrips();
}
document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.view);
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link === button);
    });
  });
});
// Start the app
displayDestinations();
displayFavorites();
displayTrips();






