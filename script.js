document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const modal = document.getElementById('staffModal');
    const closeButton = modal.querySelector('.close-button'); 
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');

    // --- Staff Data for index.html (Team Page Display) ---
    // Ensure this data is consistent with staffData in verify.html for verifiable members
    const staffData = {
        1442: {
            name: "Michael Chen",
            title: "Lead Software Engineer",
            email: "michael.chen@edunaviq.tech",
            image: "images/michael.jpg", // Replace with actual image path
            phone: "+1-555-0101",
            department: "Technology Development",
            employeeId: "ET001",
            bio: "Michael is an experienced software engineer specializing in building scalable EdTech platforms. He leads the core system development at EduNaviQ Technology, focusing on innovative solutions and robust architecture. His problem-solving skills are key to our tech advancements.",
            social: [
                { platform: "LinkedIn", url: "#", icon: "fab fa-linkedin" },
                { platform: "Twitter", url: "#", icon: "fab fa-twitter-square" },
                { platform: "Github", url: "#", icon: "fab fa-github-square" }
            ]
        },
        2: {
            name: "Sophia Miller",
            title: "Senior Educational Consultant",
            email: "sophia.miller@edunaviq.tech",
            image: "images/sophia.jpg", // Replace with actual image path
            phone: "+1-555-0102",
            department: "Academic Advisory",
            employeeId: "EC002",
            bio: "Sophia is a dedicated educational consultant with a passion for helping students navigate their academic journeys. She provides expert guidance on course selection, career planning, and skill development, empowering students to achieve their full potential.",
            social: [
                { platform: "LinkedIn", url: "#", icon: "fab fa-linkedin" },
                { platform: "Medium", url: "#", icon: "fab fa-medium" }
            ]
        }
        // Add more staff data here if they should appear on the main team page
    };
    // --- End of Staff Data for index.html ---

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const staffId = this.closest('.staff-card').dataset.staffId;
            const data = staffData[staffId];

            if (data && modal) {
                modal.querySelector('#modalStaffImage').src = data.image;
                modal.querySelector('#modalStaffImage').alt = data.name + " Photo";
                modal.querySelector('#modalStaffName').textContent = data.name;
                modal.querySelector('#modalStaffTitle').textContent = data.title;
                
                const emailLink = modal.querySelector('#modalStaffEmail');
                emailLink.textContent = data.email;
                emailLink.href = `mailto:${data.email}`;
                
                modal.querySelector('#modalStaffPhone').textContent = data.phone || "N/A";
                modal.querySelector('#modalStaffDepartment').textContent = data.department || "N/A";
                modal.querySelector('#modalStaffEmployeeId').textContent = data.employeeId || "N/A";
                modal.querySelector('#modalStaffBio').textContent = data.bio;

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
        });
    });

    function closeModal() {
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; 
        }
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) { 
                closeModal();
            }
        });
    }
    
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});