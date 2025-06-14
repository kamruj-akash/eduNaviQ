document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
        return;
    }

    // --- INITIAL DATA (IF LOCALSTORAGE IS EMPTY) ---
    const initialStaffData = { 
        1: { id: 1, name: "Michael Chen", title: "Lead Software Engineer", employeeId: "ET-001", email: "michael.chen@edunaviq.tech", image: "images/michael.jpg", phone: "+1-555-0101", department: "Technology Development", bio: "Michael is an experienced software engineer...", social: { linkedin: '#' } },
        2: { id: 2, name: "Sophia Miller", title: "Senior Educational Consultant", employeeId: "EC-002", email: "sophia.miller@edunaviq.tech", image: "images/sophia.jpg", phone: "+1-555-0102", department: "Academic Advisory", bio: "Sophia is a dedicated educational consultant...", social: { linkedin: '#' } }
    };
    const initialTestimonialsData = {
        't1': { id: 't1', name: 'Anika Tabassum', title: 'Computer Science Student', quote: "EduNaviQ's AI recommendations were spot on! It helped me choose the perfect major that aligned with my skills and interests. Highly recommended!" },
        't2': { id: 't2', name: 'Rohan Ahmed', title: 'Business Administration Aspirant', quote: "The SOP assistance feature is a lifesaver. I was struggling with my application, but EduNaviQ provided the structure and confidence I needed." }
    };

    // --- LOCAL STORAGE FUNCTIONS ---
    const getFromStorage = (key, initialData) => {
        const data = localStorage.getItem(key);
        if (!data || Object.keys(JSON.parse(data)).length === 0) {
            localStorage.setItem(key, JSON.stringify(initialData));
            return initialData;
        }
        return JSON.parse(data);
    };

    const saveToStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    let staff = getFromStorage('staffData', initialStaffData);
    let testimonials = getFromStorage('testimonialsData', initialTestimonialsData);

    // --- UI ELEMENTS ---
    const employeeTableBody = document.getElementById('employeeTableBody');
    const employeeModal = document.getElementById('employeeModal');
    const employeeForm = document.getElementById('employeeForm');
    const testimonialTableBody = document.getElementById('testimonialTableBody');
    const testimonialModal = document.getElementById('testimonialModal');
    const testimonialForm = document.getElementById('testimonialForm');
    const logoutButton = document.getElementById('logoutButton');
    
    // --- Confirmation Modal Elements ---
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    let confirmDeleteBtn = document.getElementById('confirmDeleteBtn'); // Use 'let' to reassign later

    // --- RENDER FUNCTIONS ---
    const renderEmployeeTable = () => {
        employeeTableBody.innerHTML = '';
        Object.values(staff).sort((a,b) => a.id - b.id).forEach(employee => {
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
                </tr>`;
            employeeTableBody.insertAdjacentHTML('beforeend', row);
        });
    };

    const renderTestimonialsTable = () => {
        testimonialTableBody.innerHTML = '';
        Object.values(testimonials).forEach(item => {
            const row = `
                <tr class="border-b">
                    <td class="py-3 px-4 font-semibold">${item.name}</td>
                    <td class="py-3 px-4 text-gray-600 italic">"${item.quote.substring(0, 50)}..."</td>
                    <td class="py-3 px-4">
                        <button class="edit-testimonial-btn text-blue-500 hover:text-blue-700 mr-3" data-id="${item.id}" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="delete-testimonial-btn text-red-500 hover:text-red-700" data-id="${item.id}" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
            testimonialTableBody.insertAdjacentHTML('beforeend', row);
        });
    };
    
    // --- MODAL LOGIC (Employee, Testimonial, Confirmation) ---
    const openEmployeeModal = (mode = 'add', employeeId = null) => {
        employeeForm.reset();
        document.getElementById('employeeIdInput').value = '';
        if (mode === 'add') {
            employeeModal.querySelector('#modalTitle').textContent = 'Add New Employee';
        } else {
            employeeModal.querySelector('#modalTitle').textContent = 'Edit Employee';
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
        employeeModal.classList.remove('hidden');
    };
    const closeEmployeeModal = () => employeeModal.classList.add('hidden');

    const openTestimonialModal = (mode = 'add', id = null) => {
        testimonialForm.reset();
        document.getElementById('testimonialIdInput').value = '';
        if (mode === 'add') {
            testimonialModal.querySelector('#testimonialModalTitle').textContent = 'Add New Testimonial';
        } else {
            testimonialModal.querySelector('#testimonialModalTitle').textContent = 'Edit Testimonial';
            const item = testimonials[id];
            if (item) {
                document.getElementById('testimonialIdInput').value = item.id;
                document.getElementById('studentName').value = item.name;
                document.getElementById('studentTitle').value = item.title;
                document.getElementById('quote').value = item.quote;
            }
        }
        testimonialModal.classList.remove('hidden');
    };
    const closeTestimonialModal = () => testimonialModal.classList.add('hidden');
    
    // --- Confirmation Modal Functions ---
    const closeConfirmationModal = () => {
        confirmationModal.classList.add('hidden');
    };
    
    const openConfirmationModal = (message, onConfirm) => {
        confirmationMessage.textContent = message;
        confirmationModal.classList.remove('hidden');
        
        const newConfirmBtn = confirmDeleteBtn.cloneNode(true);
        confirmDeleteBtn.parentNode.replaceChild(newConfirmBtn, confirmDeleteBtn);
        confirmDeleteBtn = newConfirmBtn;

        confirmDeleteBtn.addEventListener('click', () => {
            onConfirm();
            closeConfirmationModal();
        });
    };


    // --- EVENT LISTENERS ---
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'admin-login.html';
    });
    
    cancelDeleteBtn.addEventListener('click', closeConfirmationModal);


    // --- Employee Listeners ---
    document.getElementById('addEmployeeBtn').addEventListener('click', () => openEmployeeModal('add'));
    document.getElementById('cancelBtn').addEventListener('click', closeEmployeeModal);
    // == NEW: Listener for the 'X' button on the employee modal ==
    document.getElementById('closeEmployeeModalBtn').addEventListener('click', closeEmployeeModal);
    
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const systemId = document.getElementById('employeeIdInput').value;
        const social = { linkedin: document.getElementById('linkedin').value.trim(), github: document.getElementById('github').value.trim(), twitter: document.getElementById('twitter').value.trim(), facebook: document.getElementById('facebook').value.trim(), instagram: document.getElementById('instagram').value.trim(), youtube: document.getElementById('youtube').value.trim() };
        Object.keys(social).forEach(key => !social[key] && delete social[key]);
        const employeeData = { name: document.getElementById('name').value, title: document.getElementById('title').value, email: document.getElementById('email').value, phone: document.getElementById('phone').value, department: document.getElementById('department').value, employeeId: document.getElementById('employeeIdField').value, image: document.getElementById('image').value || 'images/staff-placeholder.png', bio: document.getElementById('bio').value, social: social };
        if (systemId) {
            staff[systemId] = { ...staff[systemId], ...employeeData, id: systemId };
        } else {
            const newId = Date.now();
            employeeData.id = newId;
            staff[newId] = employeeData;
        }
        saveToStorage('staffData', staff);
        renderEmployeeTable();
        closeEmployeeModal();
    });

    employeeTableBody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        const deleteBtn = e.target.closest('.delete-btn');
        const linkBtn = e.target.closest('.link-btn');

        if (editBtn) {
            openEmployeeModal('edit', editBtn.dataset.id);
        } else if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            const message = `Are you sure you want to delete the employee "${staff[id].name}"? This action cannot be undone.`;
            openConfirmationModal(message, () => {
                delete staff[id];
                saveToStorage('staffData', staff);
                renderEmployeeTable();
            });
        } else if (linkBtn) {
            const id = linkBtn.dataset.id;
            const verificationUrl = `${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/verify.html?id=${id}`;
            navigator.clipboard.writeText(verificationUrl).then(() => {
                const icon = linkBtn.querySelector('i');
                icon.className = 'fas fa-check-circle';
                setTimeout(() => { icon.className = 'fas fa-link'; }, 2000);
            }).catch(err => console.error('Failed to copy: ', err));
        }
    });

    // --- Testimonial Listeners ---
    document.getElementById('addTestimonialBtn').addEventListener('click', () => openTestimonialModal('add'));
    document.getElementById('cancelTestimonialBtn').addEventListener('click', closeTestimonialModal);
    document.getElementById('closeTestimonialModalBtn').addEventListener('click', closeTestimonialModal);

    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('testimonialIdInput').value;
        const testimonialData = { name: document.getElementById('studentName').value, title: document.getElementById('studentTitle').value, quote: document.getElementById('quote').value };
        if (id) {
            testimonials[id] = { ...testimonials[id], ...testimonialData };
        } else {
            const newId = 't' + Date.now();
            testimonialData.id = newId;
            testimonials[newId] = testimonialData;
        }
        saveToStorage('testimonialsData', testimonials);
        renderTestimonialsTable();
        closeTestimonialModal();
    });

    testimonialTableBody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-testimonial-btn');
        const deleteBtn = e.target.closest('.delete-testimonial-btn');
        if (editBtn) {
            openTestimonialModal('edit', editBtn.dataset.id);
        } else if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            const message = `Are you sure you want to delete the testimonial from "${testimonials[id].name}"? This action cannot be undone.`;
            openConfirmationModal(message, () => {
                delete testimonials[id];
                saveToStorage('testimonialsData', testimonials);
                renderTestimonialsTable();
            });
        }
    });

    // --- INITIAL RENDER ---
    renderEmployeeTable();
    renderTestimonialsTable();
});