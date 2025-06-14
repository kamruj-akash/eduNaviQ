document.addEventListener("DOMContentLoaded", function () {
  // --- DATA FETCH FUNCTIONS (CORRECTED) ---
  const getStaffData = () => {
    const data = localStorage.getItem("staffData");
    return data ? JSON.parse(data) : {};
  };
  const getTestimonialsData = () => {
    const data = localStorage.getItem("testimonialsData");
    return data ? JSON.parse(data) : {};
  };

  const staffData = getStaffData();
  const testimonialsData = getTestimonialsData();

  // --- UI ELEMENTS ---
  const staffGrid = document.getElementById("staff-grid");
  const testimonialsGrid = document.getElementById("testimonials-grid");
  const modal = document.getElementById("staffModal");
  const closeButton = modal ? modal.querySelector(".close-button") : null;

  // Map platform keys to their Font Awesome icons
  const socialIconMap = {
    linkedin: "fab fa-linkedin",
    github: "fab fa-github-square",
    twitter: "fab fa-twitter-square",
    facebook: "fab fa-facebook-square",
    instagram: "fab fa-instagram-square",
    youtube: "fab fa-youtube",
  };

  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("py-2");
        navbar.classList.remove("py-3");
      } else {
        navbar.classList.add("py-3");
        navbar.classList.remove("py-2");
      }
    });
  }

  // --- RENDER STAFF CARDS ---
  const renderStaffCards = () => {
    if (!staffGrid) return;
    staffGrid.innerHTML = "";

    if (Object.keys(staffData).length === 0) {
      staffGrid.innerHTML = `<p class="text-center col-span-3">No staff members found.</p>`;
      return;
    }

    for (const id in staffData) {
      const employee = staffData[id];
      let socialIconsHTML = "";
      const social = employee.social || {};

      if (Object.keys(social).length > 0) {
        socialIconsHTML += '<div class="social-media-links mb-5">';
        for (const [platform, url] of Object.entries(social)) {
          if (url && socialIconMap[platform]) {
            socialIconsHTML += `<a href="${url}" target="_blank" aria-label="${platform}" class="text-edu-primary text-2xl mx-2 transition-colors duration-300 hover:text-edu-hover"><i class="${socialIconMap[platform]}"></i></a>`;
          }
        }
        socialIconsHTML += "</div>";
      }

      const cardHTML = `
                <div class="staff-card bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-edu-secondary/40" data-staff-id="${
                  employee.id
                }">
                    <img src="${
                      employee.image || "images/staff-placeholder.png"
                    }" alt="${
        employee.name
      } Photo" class="w-32 h-32 rounded-full object-cover mx-auto mb-5 border-4 border-edu-secondary shadow-md">
                    <h3 class="text-xl font-semibold text-edu-primary mb-1">${
                      employee.name
                    }</h3>
                    <p class="text-edu-secondary text-md font-medium mb-2">${
                      employee.title
                    }</p>
                    <p class="text-gray-600 text-sm mb-4 break-all"><i class="fas fa-envelope text-edu-secondary mr-2"></i>${
                      employee.email
                    }</p>
                    ${socialIconsHTML}
                    <button class="view-more-btn bg-edu-secondary text-white px-6 py-3 rounded-full font-semibold uppercase text-xs tracking-wider transition-all duration-300 ease-in-out hover:bg-edu-hover hover:shadow-lg transform hover:scale-105">View More</button>
                </div>
            `;
      staffGrid.insertAdjacentHTML("beforeend", cardHTML);
    }
  };

  // --- RENDER TESTIMONIALS ---
  const renderTestimonials = () => {
    if (!testimonialsGrid) return;
    testimonialsGrid.innerHTML = "";

    if (Object.keys(testimonialsData).length === 0) {
      testimonialsGrid.innerHTML = `<p class="text-center col-span-2">No testimonials yet.</p>`;
      return;
    }

    for (const id in testimonialsData) {
      const item = testimonialsData[id];
      const cardHTML = `
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <p class="text-gray-600 italic mb-4">"${item.quote}"</p>
                    <p class="font-bold text-edu-primary">- ${item.name}</p>
                    <p class="text-sm text-gray-500">${item.title}</p>
                </div>
            `;
      testimonialsGrid.insertAdjacentHTML("beforeend", cardHTML);
    }
  };

  // --- STAFF MODAL LOGIC ---
  const openModal = (staffId) => {
    const data = staffData[staffId];
    if (!data || !modal) return;

    modal.querySelector("#modalStaffImage").src =
      data.image || "images/staff-placeholder.png";
    modal.querySelector("#modalStaffName").textContent = data.name;
    modal.querySelector("#modalStaffTitle").textContent = data.title;
    const emailLink = modal.querySelector("#modalStaffEmail");
    emailLink.textContent = data.email;
    emailLink.href = `mailto:${data.email}`;
    modal.querySelector("#modalStaffPhone").textContent = data.phone || "N/A";
    modal.querySelector("#modalStaffDepartment").textContent =
      data.department || "N/A";
    modal.querySelector("#modalStaffEmployeeId").textContent =
      data.employeeId || "N/A";
    modal.querySelector("#modalStaffBio").textContent =
      data.bio || "No bio available.";

    const socialMediaDiv = modal.querySelector("#modalSocialMedia");
    socialMediaDiv.innerHTML = "";
    const social = data.social || {};
    if (Object.keys(social).length > 0) {
      for (const [platform, url] of Object.entries(social)) {
        if (url && socialIconMap[platform]) {
          const a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.setAttribute("aria-label", platform);
          a.className =
            "text-edu-primary text-3xl mx-2 transition-colors duration-300 hover:text-edu-hover";
          const i = document.createElement("i");
          i.className = socialIconMap[platform];
          a.appendChild(i);
          socialMediaDiv.appendChild(a);
        }
      }
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    }
  };

  // --- EVENT LISTENERS ---
  if (staffGrid) {
    staffGrid.addEventListener("click", (e) => {
      const viewMoreBtn = e.target.closest(".view-more-btn");
      if (viewMoreBtn) {
        openModal(viewMoreBtn.closest(".staff-card").dataset.staffId);
      }
    });
  }

  if (closeButton) closeButton.addEventListener("click", closeModal);
  if (modal)
    modal.addEventListener("click", (e) => e.target === modal && closeModal());
  window.addEventListener(
    "keydown",
    (e) =>
      e.key === "Escape" &&
      modal &&
      !modal.classList.contains("hidden") &&
      closeModal()
  );

  // --- INITIAL RENDER ---
  renderStaffCards();
  renderTestimonials();

  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
});

// This new code block should be added at the end of your existing script.js file,
// right before the closing curly brace `}` of the DOMContentLoaded event listener.

// --- SIGN UP MODAL LOGIC ---
const openSignupModalBtn = document.getElementById("openSignupModalBtn");
const signupModal = document.getElementById("signupModal");

if (signupModal) {
  const closeSignupModalBtn = document.getElementById("closeSignupModalBtn");
  const signupFormContainer = document.getElementById("signupFormContainer");
  const signupSuccess = document.getElementById("signupSuccess");
  const signupForm = document.getElementById("signupForm");
  const closeSuccessBtn = document.getElementById("closeSuccessBtn");

  const openSignupModal = () => {
    // Reset to form view every time it opens
    signupFormContainer.classList.remove("hidden");
    signupSuccess.classList.add("hidden");
    signupModal.classList.remove("hidden");
    signupModal.classList.add("flex"); // Use flex to enable centering
    document.body.style.overflow = "hidden";
  };

  const closeSignupModal = () => {
    signupModal.classList.add("hidden");
    signupModal.classList.remove("flex");
    document.body.style.overflow = "";
  };

  if (openSignupModalBtn) {
    openSignupModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSignupModal();
    });
  }

  if (closeSignupModalBtn) {
    closeSignupModalBtn.addEventListener("click", closeSignupModal);
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", closeSignupModal);
  }

  // Close modal by clicking on the overlay
  signupModal.addEventListener("click", (e) => {
    if (e.target === signupModal) {
      closeSignupModal();
    }
  });

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // In a real application, you would send form data to a server here.
      // For now, we'll just show the success message.
      signupFormContainer.classList.add("hidden");
      signupSuccess.classList.remove("hidden");
    });
  }
}
