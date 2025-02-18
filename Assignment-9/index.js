function openForm(service) {
    document.getElementById('appointmentForm').style.display ='block';
    document.getElementById('service').value = service;
}

function closeForm() {
    document.getElementById('appointmentForm').style.display = 'none';
}

function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const datetime = document.getElementById('datetime').value;
    const terms = document.getElementById('terms').checked;
    
    document.getElementById('nameError').innerText = name ? '' : 'Name is required';
    document.getElementById('emailError').innerText = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email';
    document.getElementById('phoneError').innerText = /^\d{10}$/.test(phone) ? '' : 'Phone must be 10 digits';
    document.getElementById('dateError').innerText = new Date(datetime) > new Date() ? '' : 'Date must be in the future';
    document.getElementById('termsError').innerText = terms ? '' : 'You must agree to the terms';
    
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{10}$/.test(phone) || new Date(datetime) <= new Date() || !terms) {
        isValid = false;
    }
    
    if (isValid) {
        const appointmentList = document.getElementById('appointmentEntries');
        const li = document.createElement('li');
        li.innerText = `${name} - ${document.getElementById('service').value} - ${datetime} (Pending)`;
        appointmentList.appendChild(li);
        localStorage.setItem('appointments', appointmentList.innerHTML);
        closeForm();
        alert(`Thank you, ${name}! Your appointment for ${document.getElementById('service').value} on ${datetime} is confirmed.`);
    }
}

function loadAppointments() {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
        document.getElementById('appointmentEntries').innerHTML = savedAppointments;
    }
}

window.onload = loadAppointments;
