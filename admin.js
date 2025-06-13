document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
        return;
    }

    const initialStaffData = {
        1: {
            id: 1, name: "Michael Chen", title: "Lead Software Engineer", email: "michael.chen@edunaviq.tech", image: "images/michael.jpg", phone: "+1-555-0101", department: "Technology Development", employeeId: "ET001", bio: "Michael is an experienced software engineer specializing in building scalable EdTech platforms...", social: [{ platform: "LinkedIn", url: "#", icon: "fab fa-linkedin" }, { platform: "Twitter", url: "#", icon: "fab fa-twitter-square" }, { platform: "Github", url: "#", icon: "fab fa-github-square" }]
        },
        2: {
            id: 2, name: "Sophia Miller", title: "Senior Educational Consultant", email: "sophia.miller@edunaviq.tech", image: "images/sophia.jpg", phone: "+1-555-0102", department: "Academic Advisory", employeeId: "EC002", bio: "Sophia is a dedicated educational consultant with a passion for helping students navigate their academic journeys...", social: [{ platform: "LinkedIn", url: "#", icon: "fab fa-linkedin" }, { platform: "Medium", url: "#", icon: "fab fa-medium" }]
        }
    };

    // --- Data Management Functions ---
    const getStaffData = () => {
        const data = localStorage.getItem('staffData');
        if (!data) {
            // If no data in localStorage, initialize with default data
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

    // --- Render Functions ---
    const renderTable = () => {
        tableBody.innerHTML = '';
        if (Object.keys(staff).length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4">No employees found.</td></tr>`;
            return;
        }
        for (const id in staff) {
            const employee = staff[id];
            const row = `
                <tr class="border-b">
                    <td class="py-3 px-4">${employee.id}</td>
                    <td class="py-3 px-4">${employee.name}</td>
                    <td class="py-3 px-4">${employee.title}</td>
                    <td class="py-3 px-4">
                        <button class="edit-btn text-blue-500 hover:text-blue-700 mr-3" data-id="${employee.id}"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn text-red-500 hover:text-red-700" data-id="${employee.id}"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        }
    };

    // --- Modal Functions ---
    const openModal = (mode = 'add', employeeId = null) => {
        form.reset();
        if (mode === 'add') {
            modalTitle.textContent = 'Add New Employee';
            document.getElementById('employeeIdInput').value = '';
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
                document.getElementById('image').value = employee.image || '';
                document.getElementById('bio').value = employee.bio || '';
            }
        }
        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
    };

    // --- Event Handlers ---
    addEmployeeBtn.addEventListener('click', () => openModal('add'));
    cancelBtn.addEventListener('click', closeModal);
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'admin-login.html';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('employeeIdInput').value;
        const employeeData = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            image: document.getElementById('image').value || 'images/staff-placeholder.png',
            bio: document.getElementById('bio').value,
            social: [] // Social links can be added here if form fields exist
        };

        if (id) { // Editing existing employee
            staff[id] = { ...staff[id], ...employeeData };
        } else { // Adding new employee
            const newId = Date.now(); // Simple way to generate a unique ID
            employeeData.id = newId;
            staff[newId] = employeeData;
        }
        
        saveStaffData(staff);
        renderTable();
        closeModal();
    });

    tableBody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        const deleteBtn = e.target.closest('.delete-btn');
        
        if (editBtn) {
            const id = editBtn.dataset.id;
            openModal('edit', id);
        }

        if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            if (confirm(`Are you sure you want to delete employee ${staff[id].name}?`)) {
                delete staff[id];
                saveStaffData(staff);
                renderTable();
            }
        }
    });

    // Initial render
    renderTable();
});