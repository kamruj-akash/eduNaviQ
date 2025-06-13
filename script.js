// document.addEventListener('DOMContentLoaded', function() {
//     const currentYearSpan = document.getElementById('currentYear');
//     if (currentYearSpan) {
//         currentYearSpan.textContent = new Date().getFullYear();
//     }

//     const modal = document.getElementById('staffModal');
//     const closeButton = modal.querySelector('.close-button'); 
//     const viewMoreButtons = document.querySelectorAll('.view-more-btn');

//     // --- Staff Data for index.html (Team Page Display) ---
//     // Ensure this data is consistent with staffData in verify.html for verifiable members
//     const staffData = {
//         1442: {
//             name: "Michael Chen",
//             title: "Lead Software Engineer",
//             email: "michael.chen@edunaviq.tech",
//             image: "images/michael.jpg", // Replace with actual image path
//             phone: "+1-555-0101",
//             department: "Technology Development",
//             employeeId: "ET001",
//             bio: "Michael is an experienced software engineer specializing in building scalable EdTech platforms. He leads the core system development at EduNaviQ Technology, focusing on innovative solutions and robust architecture. His problem-solving skills are key to our tech advancements.",
//             social: [
//                 { platform: "LinkedIn", url: "#", icon: "fab fa-linkedin" },
//                 { platform: "Twitter", url: "#", icon: "fab fa-twitter-square" },
//                 { platform: "Github", url: "#", icon: "fab fa-github-square" }
//             ]
//         },
//         2: {
//             name: "Sophia Miller",
//             title: "Senior Educational Consultant",
//             email: "sophia.miller@edunaviq.tech",
//             image: "images/sophia.jpg", // Replace with actual image path
//             phone: "+1-555-0102",
//             department: "Academic Advisory",
//             employeeId: "EC002",
//             bio: "Sophia is a dedicated educational consultant with a passion for helping students navigate their academic journeys. She provides expert guidance on course selection, career planning, and skill development, empowering students to achieve their full potential.",
//             social: [
//                 { platform: "LinkedIn", url: "#", icon: "fab fa-linkedin" },
//                 { platform: "Medium", url: "#", icon: "fab fa-medium" }
//             ]
//         }
//         // Add more staff data here if they should appear on the main team page
//     };
//     // --- End of Staff Data for index.html ---

//     viewMoreButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const staffId = this.closest('.staff-card').dataset.staffId;
//             const data = staffData[staffId];

//             if (data && modal) {
//                 modal.querySelector('#modalStaffImage').src = data.image;
//                 modal.querySelector('#modalStaffImage').alt = data.name + " Photo";
//                 modal.querySelector('#modalStaffName').textContent = data.name;
//                 modal.querySelector('#modalStaffTitle').textContent = data.title;
                
//                 const emailLink = modal.querySelector('#modalStaffEmail');
//                 emailLink.textContent = data.email;
//                 emailLink.href = `mailto:${data.email}`;
                
//                 modal.querySelector('#modalStaffPhone').textContent = data.phone || "N/A";
//                 modal.querySelector('#modalStaffDepartment').textContent = data.department || "N/A";
//                 modal.querySelector('#modalStaffEmployeeId').textContent = data.employeeId || "N/A";
//                 modal.querySelector('#modalStaffBio').textContent = data.bio;

//                 const socialMediaDiv = modal.querySelector('#modalSocialMedia');
//                 socialMediaDiv.innerHTML = '';
//                 if (data.social && data.social.length > 0) {
//                     data.social.forEach(link => {
//                         const a = document.createElement('a');
//                         a.href = link.url;
//                         a.target = '_blank';
//                         a.setAttribute('aria-label', link.platform);
//                         a.className = 'text-edu-primary text-3xl mx-2 transition-colors duration-300 hover:text-edu-hover';
//                         const i = document.createElement('i');
//                         i.className = link.icon;
//                         a.appendChild(i);
//                         socialMediaDiv.appendChild(a);
//                     });
//                 }
                
//                 modal.classList.remove('hidden');
//                 modal.classList.add('flex'); 
//                 document.body.style.overflow = 'hidden'; 
//             }
//         });
//     });

//     function closeModal() {
//         if (modal) {
//             modal.classList.add('hidden');
//             modal.classList.remove('flex');
//             document.body.style.overflow = ''; 
//         }
//     }

//     if (closeButton) {
//         closeButton.addEventListener('click', closeModal);
//     }

//     if (modal) {
//         modal.addEventListener('click', function(event) {
//             if (event.target === modal) { 
//                 closeModal();
//             }
//         });
//     }
    
//     window.addEventListener('keydown', function(event) {
//         if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
//             closeModal();
//         }
//     });
// });







document.addEventListener('DOMContentLoaded', function() {
    // --- Shared Functions & Data ---
    const getStaffData = () => {
        const data = localStorage.getItem('staffData');
        return data ? JSON.parse(data) : {};
    };

    const staffData = getStaffData();
    const staffGrid = document.getElementById('staff-grid');
    const modal = document.getElementById('staffModal');
    const closeButton = modal.querySelector('.close-button');

    // --- Render Staff Cards on index.html ---
    const renderStaffCards = () => {
        if (!staffGrid) return;
        staffGrid.innerHTML = ''; // Clear existing cards

        if (Object.keys(staffData).length === 0) {
            staffGrid.innerHTML = `<p class="text-center col-span-3">No staff members found. Add members from the admin dashboard.</p>`;
            return;
        }

        for (const id in staffData) {
            const employee = staffData[id];
            const cardHTML = `
                <div class="staff-card bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-edu-secondary/40" data-staff-id="${employee.id}">
                    <img src="${employee.image || 'images/staff-placeholder.png'}" alt="${employee.name} Photo" class="w-32 h-32 rounded-full object-cover mx-auto mb-5 border-4 border-edu-secondary shadow-md">
                    <h3 class="text-xl font-semibold text-edu-primary mb-1">${employee.name}</h3>
                    <p class="text-edu-secondary text-md font-medium mb-2">${employee.title}</p>
                    <p class="text-gray-600 text-sm mb-4 break-all"><i class="fas fa-envelope text-edu-secondary mr-2"></i>${employee.email}</p>
                    <button class="view-more-btn bg-edu-secondary text-white px-6 py-3 rounded-full font-semibold uppercase text-xs tracking-wider transition-all duration-300 ease-in-out hover:bg-edu-hover hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-edu-hover focus:ring-opacity-50">View More</button>
                </div>
            `;
            staffGrid.insertAdjacentHTML('beforeend', cardHTML);
        }
    };

    // --- Modal Logic ---
    const openModal = (staffId) => {
        const data = staffData[staffId];
        if (data && modal) {
            modal.querySelector('#modalStaffImage').src = data.image || 'images/staff-placeholder.png';
            modal.querySelector('#modalStaffImage').alt = data.name + " Photo";
            modal.querySelector('#modalStaffName').textContent = data.name;
            modal.querySelector('#modalStaffTitle').textContent = data.title;
            const emailLink = modal.querySelector('#modalStaffEmail');
            emailLink.textContent = data.email;
            emailLink.href = `mailto:${data.email}`;
            modal.querySelector('#modalStaffPhone').textContent = data.phone || "N/A";
            modal.querySelector('#modalStaffDepartment').textContent = data.department || "N/A";
            modal.querySelector('#modalStaffEmployeeId').textContent = data.id || "N/A";
            modal.querySelector('#modalStaffBio').textContent = data.bio || "No bio available.";
            
            const socialMediaDiv = modal.querySelector('#modalSocialMedia');
            socialMediaDiv.innerHTML = ''; 
            if (data.social && data.social.length > 0) {
                data.social.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.target = '_blank';
                    a.setAttribute('aria-label', link.platform);
                    a.className = 'text-edu-primary text-3xl mx-2 transition-colors duration-300 hover:text-edu-hover';
                    const i = document.createElement('i');
                    i.className = link.icon;
                    a.appendChild(i);
                    socialMediaDiv.appendChild(a);
                });
            }
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    };
    
    // --- Event Listeners ---
    if (staffGrid) {
        staffGrid.addEventListener('click', function(e) {
            const viewMoreBtn = e.target.closest('.view-more-btn');
            if (viewMoreBtn) {
                const staffId = viewMoreBtn.closest('.staff-card').dataset.staffId;
                openModal(staffId);
            }
        });
    }

    if(closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Initial Render
    renderStaffCards();
    const currentYearSpan = document.getElementById('currentYear');
    if(currentYearSpan) {
       currentYearSpan.textContent = new Date().getFullYear();
    }
});