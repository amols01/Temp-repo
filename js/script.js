
//Menu icon navbar---------------------
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}


// scroll section selector active link
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');



window.onscroll = () => {

    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id +']').classList.add('active');
            });
        };
    })


// sticky navbar
    let header = document.querySelector('.header');

    header.classList.toggle('stickey', window.scrollY > 100)

    //remove menu icon navbar when click navbar link (scroll)

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};


//dark-mode logic
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

//Scroll Reveal logic
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .skills-container, .project-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });


//form logic ---------------------------------------------------------------

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission
  
    // Collect form data
    const fullName = this.fullName.value.trim();
    const email = this.email.value.trim();
    const mobile = this.mobile.value.trim();
    const subject = this.subject.value.trim();
    const message = this.message.value.trim();
  
    // Validation checks
    if (!fullName) {
        alert("Full Name is required.");
        return;
    }
  
    if (!email || !validateEmail(email)) {
        alert("Please enter a valid Email Address.");
        return;
    }
  
    if (!mobile || !validateMobile(mobile)) {
        alert("Please enter a valid 10-digit Mobile Number.");
        return;
    }
  
    if (!subject) {
        alert("Subject is required.");
        return;
    }
  
    if (!message || message.length < 10) {
        alert("Message must be at least 10 characters long.");
        return;
    }
  
    // If all validations pass, send the form data
    const formData = {
        fullName,
        email,
        mobile,
        subject,
        message,
    };
  
    try {
        const response = await fetch("https://formspree.io/f/xzzzeknj", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
  
        if (response.ok) {
            alert("Message sent successfully!");
            this.reset(); // Reset the form fields
        } else {
            alert("Failed to send the message. Please try again.");
        }
    } catch (error) {
        console.error("Error sending message:", error);
        alert("An error occurred. Please try again.");
    }
});
  
//Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
// Function To validate mobile number format
function validateMobile(mobile) {
    const mobileRegex = /^[0-9]{10}$/; // Allows only 10-digit numbers
    return mobileRegex.test(mobile);
}
