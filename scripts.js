// DOMContentLoaded for Quotes Section
document.addEventListener("DOMContentLoaded", () => {
    const carouselInner = document.querySelector(".carousel-inner");
    const loader = document.querySelector(".loader");
    const carousel = document.querySelector("#carouselExampleControls");
  
    // Show loader and hide carousel initially
    loader.style.display = "block";
    carousel.style.display = "none";
  
    // Fetch quotes from the API
    fetch("https://smileschool-api.hbtn.info/quotes")
      .then((response) => response.json())
      .then((quotes) => {
        // Loop through the quotes and create carousel items
        quotes.forEach((quote, index) => {
          const isActive = index === 0 ? "active" : ""; // Set the first item as active
          const carouselItem = `
            <div class="carousel-item ${isActive}">
              <div class="row mx-auto align-items-center">
                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                  <img
                    src="${quote.pic_url}"
                    class="d-block align-self-center rounded-circle"
                    alt="${quote.name}'s Picture"
                  />
                </div>
                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                  <div class="quote-text">
                    <p class="text-white">« ${quote.text} »</p>
                    <h4 class="text-white font-weight-bold">${quote.name}</h4>
                    <span class="text-white">${quote.title}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
          carouselInner.innerHTML += carouselItem;
        });
  
        // Hide loader and show carousel after data is loaded
        loader.style.display = "none";
        carousel.style.display = "block";
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
        loader.style.display = "none"; // Hide loader on error
      });
  });
  
  // Document Ready for Popular Tutorials Section
  $(document).ready(function () {
    const loader = $("#popular-loader");
    const carouselInner = $("#popular-carousel .carousel-inner");
    const url = "https://smileschool-api.hbtn.info/popular-tutorials";
    let tutorials = []; // Store fetched data
    let currentIndex = 0; // Track the current set of cards
  
    // Display Loader
    loader.show();
  
    // Fetch Data from API
    $.getJSON(url, function (data) {
      tutorials = data; // Store the data for later use
      loader.hide(); // Hide the loader after data is fetched
      updateCarousel(); // Display the first set of cards
    });
  
    // Function to update the carousel with the current set of 4 cards
    function updateCarousel() {
      carouselInner.empty(); // Clear the current carousel content
  
      // Get the next 4 tutorials, looping through the data if necessary
      const cards = getVisibleCards().map(createCard).join('');
      carouselInner.append(`<div class="carousel-item active"><div class="row align-items-center justify-content-center">${cards}</div></div>`);
    }
  
    // Function to get the next 4 visible cards, looping if necessary
    function getVisibleCards() {
      const visibleCards = [];
      for (let i = 0; i < 4; i++) {
        // Wrap the index around using modulo, ensuring we always get 4 cards
        const index = (currentIndex + i) % tutorials.length;
        visibleCards.push(tutorials[index]);
      }
      return visibleCards;
    }
  
    // Function to create a single card
    function createCard(tutorial) {
      return `
        <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
          <div class="card">
            <img
              src="${tutorial.thumb_url}"
              class="card-img-top"
              alt="Video thumbnail"
            />
            <div class="card-img-overlay text-center">
              <img
                src="images/play.png"
                alt="Play"
                width="64px"
                class="align-self-center play-overlay"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${tutorial.title}</h5>
              <p class="card-text text-muted">${tutorial["sub-title"]}</p>
              <div class="creator d-flex align-items-center">
                <img
                  src="${tutorial.author_pic_url}"
                  alt="Creator of Video"
                  width="30px"
                  class="rounded-circle"
                />
                <h6 class="pl-3 m-0 main-color">${tutorial.author}</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                <div class="rating">
                  ${renderStars(tutorial.star)}
                </div>
                <span class="main-color">${tutorial.duration}</span>
              </div>
            </div>
          </div>
        </div>`;
    }
  
    // Render Stars
    function renderStars(starCount) {
      let stars = "";
      for (let i = 0; i < 5; i++) {
        stars += `<img
          src="images/star_${i < starCount ? "on" : "off"}.png"
          alt="star"
          width="15px"
        />`;
      }
      return stars;
    }
  
    // Handle next button click
    $("#popular-carousel .carousel-control-next").click(function () {
      // Move to the next set of cards, wrapping around when reaching the end
      currentIndex = (currentIndex + 1) % tutorials.length;
      updateCarousel();
    });
  
    // Handle previous button click
    $("#popular-carousel .carousel-control-prev").click(function () {
      // Move to the previous set of cards, wrapping around when reaching the start
      currentIndex = (currentIndex - 1 + tutorials.length) % tutorials.length;
      updateCarousel();
    });
  });
  
  $(document).ready(function () {
    const loader = $("#latest-loader");
    const carouselInner = $("#latest-videos"); // Target the correct carousel inner ID
    const url = "https://smileschool-api.hbtn.info/latest-videos"; // Update API URL
    let videos = []; // Store fetched data
    let currentIndex = 0; // Track the current set of cards
  
    // Display the loader
    loader.show();
  
    // Fetch data from the API
    $.getJSON(url, function (data) {
      videos = data; // Store the fetched data
      updateCarousel(); // Display the first set of cards
      loader.hide(); // Hide the loader after content is appended
    });
  
    // Function to update the carousel with the current set of 4 cards
    function updateCarousel() {
      carouselInner.empty(); // Clear the current carousel content
  
      // Get the next 4 videos
      const cards = getVisibleCards().map(createCard).join("");
      carouselInner.append(`<div class="carousel-item active">
        <div class="row align-items-center justify-content-center">${cards}</div>
      </div>`);
    }
  
    // Function to get the next 4 visible cards, looping if necessary
    function getVisibleCards() {
      const visibleCards = [];
      for (let i = 0; i < 4; i++) {
        // Wrap the index around using modulo to ensure we get 4 cards
        const index = (currentIndex + i) % videos.length;
        visibleCards.push(videos[index]);
      }
      return visibleCards;
    }
  
    // Function to create a single card
    function createCard(video) {
      return `
        <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
          <div class="card">
            <img
              src="${video.thumb_url}"
              class="card-img-top"
              alt="Video thumbnail"
            />
            <div class="card-img-overlay text-center">
              <img
                src="images/play.png"
                alt="Play"
                width="64px"
                class="align-self-center play-overlay"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${video.title}</h5>
              <p class="card-text text-muted">${video["sub-title"]}</p>
              <div class="creator d-flex align-items-center">
                <img
                  src="${video.author_pic_url}"
                  alt="Creator of Video"
                  width="30px"
                  class="rounded-circle"
                />
                <h6 class="pl-3 m-0 main-color">${video.author}</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                <div class="rating">
                  ${renderStars(video.star)}
                </div>
                <span class="main-color">${video.duration}</span>
              </div>
            </div>
          </div>
        </div>`;
    }
  
    // Function to render stars
    function renderStars(starCount) {
      let stars = "";
      for (let i = 0; i < 5; i++) {
        stars += `<img
          src="images/star_${i < starCount ? "on" : "off"}.png"
          alt="star"
          width="15px"
        />`;
      }
      return stars;
    }
  
    // Handle next button click
    $("#carouselExampleControls3 .carousel-control-next").click(function () {
      currentIndex = (currentIndex + 1) % videos.length;
      updateCarousel();
    });
  
    // Handle previous button click
    $("#carouselExampleControls3 .carousel-control-prev").click(function () {
      currentIndex = (currentIndex - 1 + videos.length) % videos.length;
      updateCarousel();
    });
  });
  
  $(document).ready(function () {
    const apiUrl = "https://smileschool-api.hbtn.info/courses";

    // Cache DOM elements
    const loader = $(".loader");
    const videoCardsContainer = $(".results .row");
    const topicDropdown = $("#topic-dropdown-wrapper .dropdown-menu");
    const sortDropdown = $("#sort-dropdown-wrapper .dropdown-menu");
    const searchInput = $(".search-text-area");

    // Initialize values
    let selectedTopic = "all";
    let selectedSort = "most_popular";
    let searchValue = "";

    // Fetch data and populate UI
    const fetchAndRenderData = () => {
        // Show loader
        loader.show();
        videoCardsContainer.empty();

        // Fetch data
        $.ajax({
            url: apiUrl,
            method: "GET",
            data: { q: searchValue, topic: selectedTopic, sort: selectedSort },
            success: (data) => {
                // Populate dropdowns if not already done
                if (!topicDropdown.children().length) {
                    data.topics.forEach((topic) => {
                        topicDropdown.append(
                            `<a class="dropdown-item" href="#" data-value="${topic}">${topic}</a>`
                        );
                    });
                }
                if (!sortDropdown.children().length) {
                    data.sorts.forEach((sort) => {
                        sortDropdown.append(
                            `<a class="dropdown-item" href="#" data-value="${sort}">${sort.replace("_", " ")}</a>`
                        );
                    });
                }

                // Populate video cards
                data.courses.forEach((course) => {
                    const stars = Array(5)
                        .fill("")
                        .map((_, i) =>
                            i < course.star
                                ? '<img src="images/star_on.png" alt="star on" width="15px" />'
                                : '<img src="images/star_off.png" alt="star off" width="15px" />'
                        )
                        .join("");

                    const card = `
                        <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mb-4">
                            <div class="card">
                                <img
                                    src="${course.thumb_url}"
                                    class="card-img-top"
                                    alt="${course.title} thumbnail"
                                />
                                <div class="card-body">
                                    <h5 class="card-title font-weight-bold">${course.title}</h5>
                                    <p class="card-text text-muted">${course.subtitle}</p>
                                    <div class="creator d-flex align-items-center">
                                        <img
                                            src="${course.author_pic_url}"
                                            alt="${course.author} picture"
                                            width="30px"
                                            class="rounded-circle"
                                        />
                                        <h6 class="pl-3 m-0 main-color">${course.author}</h6>
                                    </div>
                                    <div class="info pt-3 d-flex justify-content-between">
                                        <div class="rating">${stars}</div>
                                        <span class="main-color">${course.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    videoCardsContainer.append(card);
                });

                // Hide loader
                loader.hide();
            },
            error: () => {
                loader.hide();
                alert("An error occurred while fetching data.");
            },
        });
    };

    // Handle dropdown selection
    $(document).on("click", ".dropdown-item", function (e) {
        e.preventDefault();
        const dropdown = $(this).closest(".dropdown");
        const value = $(this).data("value");
        dropdown.find(".dropdown-toggle span").text($(this).text());
        if (dropdown.is("#topic-dropdown-wrapper")) selectedTopic = value;
        if (dropdown.is("#sort-dropdown-wrapper")) selectedSort = value;
        fetchAndRenderData();
    });

    // Handle search input
    searchInput.on("input", function () {
        searchValue = $(this).val();
        fetchAndRenderData();
    });

    // Initial fetch
    fetchAndRenderData();
});
