document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
        return;
    }

    // Default data to initialize with if localStorage is empty
    const initialStaffData = {
        1: { id: 1, name: "Michael Chen", title: "Lead Software Engineer", email: "michael.chen@edunaviq.tech", image: "images/michael.jpg", phone: "+1-555-0101", department: "Technology Development", employeeId: "ET-001", bio: "Michael is an experienced software engineer...", social: { linkedin: '#', github: '#', twitter: '#' } },
        2: { id: 2, name: "Sophia Miller", title: "Senior Educational Consultant", email: "sophia.miller@edunaviq.tech", image: "images/sophia.jpg", phone: "+1-555-0102", department: "Academic Advisory", employeeId: "EC-002", bio: "Sophia is a dedicated educational consultant...", social: { linkedin: '#' } }
    };

    // --- Data Management Functions ---
    const getStaffData = () => {
        const data = localStorage.getItem('staffData');
        if (!data || Object.keys(JSON.parse(data)).length === 0) {
            localStorage.setItem('staffData', JSON.stringify(initialStaffData));
            return initialStaffData;
        }
        return JSON.parse(data);
    };

    const saveStaffData = (data) => {
        localStorage.setItem('staffData', JSON.stringify(data));
    };

    let staff = getStaffData();

    // --- UI Elements ---
    const tableBody = document.getElementById('employeeTableBody');
    const modal = document.getElementById('employeeModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('employeeForm');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const logoutButton = document.getElementById('logoutButton');

    // --- Render Table Function ---
    const renderTable = () => {
        tableBody.innerHTML = '';
        const sortedStaff = Object.values(staff).sort((a, b) => a.id - b.id);
        for (const employee of sortedStaff) {
            const row = `
                <tr class="border-b">
                    <td class="py-3 px-4 font-semibold text-gray-600">${employee.employeeId}</td>
                    <td class="py-3 px-4 text-blue-600">${employee.id}</td>
                    <td class="py-3 px-4">${employee.name}</td>
                    <td class="py-3 px-4">${employee.title}</td>
                    <td class="py-3 px-4">
                        <button class="edit-btn text-blue-500 hover:text-blue-700 mr-3" data-id="${employee.id}" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn text-red-500 hover:text-red-700 mr-3" data-id="${employee.id}" title="Delete"><i class="fas fa-trash"></i></button>
                        <button class="link-btn text-green-500 hover:text-green-700" data-id="${employee.id}" title="Get Verification Link"><i class="fas fa-link"></i></button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        }
    };

    // --- Modal Functions (No changes here) ---
    const openModal = (mode = 'add', employeeId = null) => {
        form.reset();
        document.getElementById('employeeIdInput').value = '';
        if (mode === 'add') {
            modalTitle.textContent = 'Add New Employee';
        } else {
            modalTitle.textContent = 'Edit Employee';
            const employee = staff[employeeId];
            if (employee) {
                document.getElementById('employeeIdInput').value = employee.id;
                document.getElementById('name').value = employee.name;
                document.getElementById('title').value = employee.title;
                document.getElementById('email').value = employee.email;
                document.getElementById('phone').value = employee.phone || '';
                document.getElementById('department').value = employee.department || '';
                document.getElementById('employeeIdField').value = employee.employeeId || '';
                document.getElementById('image').value = employee.image || '';
                document.getElementById('bio').value = employee.bio || '';
                const social = employee.social || {};
                document.getElementById('linkedin').value = social.linkedin || '';
                document.getElementById('github').value = social.github || '';
                document.getElementById('twitter').value = social.twitter || '';
                document.getElementById('facebook').value = social.facebook || '';
                document.getElementById('instagram').value = social.instagram || '';
                document.getElementById('youtube').value = social.youtube || '';
            }
        }
        modal.classList.remove('hidden');
    };

    const closeModal = () => modal.classList.add('hidden');

    // --- Event Handlers ---
    addEmployeeBtn.addEventListener('click', () => openModal('add'));
    cancelBtn.addEventListener('click', closeModal);
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'admin-login.html';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const systemId = document.getElementById('employeeIdInput').value;
        const social = {
            linkedin: document.getElementById('linkedin').value.trim(),
            github: document.getElementById('github').value.trim(),
            twitter: document.getElementById('twitter').value.trim(),
            facebook: document.getElementById('facebook').value.trim(),
            instagram: document.getElementById('instagram').value.trim(),
            youtube: document.getElementById('youtube').value.trim()
        };
        Object.keys(social).forEach(key => !social[key] && delete social[key]);

        const employeeData = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            employeeId: document.getElementById('employeeIdField').value,
            image: document.getElementById('image').value || 'images/staff-placeholder.png',
            bio: document.getElementById('bio').value,
            social: social
        };

        if (systemId) {
            staff[systemId] = { ...staff[systemId], ...employeeData, id: systemId };
        } else {
            const newId = Date.now();
            employeeData.id = newId;
            staff[newId] = employeeData;
        }
        
        saveStaffData(staff);
        renderTable();
        closeModal();
    });

    // === "Click to Copy" ইভেন্ট হ্যান্ডলারটি এখানে আপডেট করা হয়েছে ===
    tableBody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        const deleteBtn = e.target.closest('.delete-btn');
        const linkBtn = e.target.closest('.link-btn');
        
        if (editBtn) {
            openModal('edit', editBtn.dataset.id);
            return; // Stop further execution
        }

        if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            if (confirm(`Are you sure you want to delete employee ${staff[id].name}?`)) {
                delete staff[id];
                saveStaffData(staff);
                renderTable();
            }
            return; // Stop further execution
        }

        if (linkBtn) {
            const id = linkBtn.dataset.id;
            const origin = window.location.origin;
            const pathname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            const verificationUrl = `${origin}${pathname}/verify.html?id=${id}`;

            // Use the Clipboard API to copy the link
            navigator.clipboard.writeText(verificationUrl).then(() => {
                // Success feedback
                const icon = linkBtn.querySelector('i');
                const originalIconClass = 'fas fa-link';
                const originalTitle = 'Get Verification Link';

                // Change to checkmark
                icon.className = 'fas fa-check-circle';
                linkBtn.title = 'Copied!';
                linkBtn.classList.remove('text-green-500', 'hover:text-green-700');
                linkBtn.classList.add('text-teal-600');

                // Revert back after 2 seconds
                setTimeout(() => {
                    icon.className = originalIconClass;
                    linkBtn.title = originalTitle;
                    linkBtn.classList.remove('text-teal-600');
                    linkBtn.classList.add('text-green-500', 'hover:text-green-700');
                }, 2000);

            }).catch(err => {
                console.error('Failed to copy link automatically: ', err);
                // Fallback if clipboard API fails
                window.prompt("Could not copy automatically. Please copy this link manually:", verificationUrl);
            });
        }
    });

    // Initial render
    renderTable();
});