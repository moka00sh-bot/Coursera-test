const destinations=[
    {
        id:1,
        name:"Santorini, Greece",
        category:"Beach",
        price:850,
        rating:4.9,
        image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
        descripation:"Beautiful beaches and amazing sunsets"
    },
    {
        id:2,
        name:"Swiss Alps, Switzerland", 
        category:"Mountain",
        price:1100,
        rating:4.8,
        image:"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80", 
        descripation:"Amazing mountains and peaceful nature", 
    },
    {
        id:3,
        name:"Kyoto, Japan",
        category: "City",
        price: 920,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
        description: "Discover temples and Japanese culture."
    },
     {
        id: 4,
        name: "Amalfi Coast, Italy",
        category: "Beach",
        price: 980,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80",
        description: "Explore colorful seaside villages."
    },
    {
        id: 5,
        name: "Patagonia, Argentina",
        category: "Adventure",
        price: 1350,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=900&q=80",
        description: "Enjoy glaciers and outdoor adventures."
    },
    {
        id: 6,
        name: "Tokyo, Japan",
        category: "City",
        price: 890,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80",
        description: "Discover modern city life and culture."
    }
];
let favorites=JSON.parse(localStorage.getItem("favorites")) || []; //return the value null if it doesn't exist
let trips=JSON.parse(localStorage.getItem("trips")) || [];// 2. Retrieving a simple string
let category="all";
let selectedTrip=null;
const modal = new bootstrap.Modal(
    document.getElementById("bookingModal")
);// show the bootstrap
function displayDestinations(){
    const search=document.getElementById("search-input").value.toLowerCase();//in to small letters
    const filtered=destinations.filter(d => 
        (category === "all" || d.category === category) && (d.name.toLowerCase().includes(search) || d.description.toLowerCase().includes(search))

    );
    document.getElementById("destination-count").textContent =
        filtered.length;

}

