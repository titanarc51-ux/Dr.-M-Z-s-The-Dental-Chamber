document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 800);

    document.getElementById('year').textContent = new Date().getFullYear();

    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { header.classList.add('scrolled'); } 
        else { header.classList.remove('scrolled'); }

        if (window.scrollY > 500) { backToTop.classList.add('show'); } 
        else { backToTop.classList.remove('show'); }
    });

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')){
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    
    revealElements.forEach(el => revealObserver.observe(el));

    const testimonials = [
        { text: "The best dental experience I've ever had! The clinic is spotless, the equipment is top-notch, and the doctors actually take the time to explain everything. Highly recommended!", name: "Sadia Rahman" },
        { text: "I was always terrified of root canals, but Dr. M&Z made it completely painless. The staff is incredibly warm and welcoming. Found my permanent family dentist.", name: "Tanvir Ahmed" },
        { text: "Got my teeth whitened here before my wedding. The results are amazing! Clean environment and very professional behavior from everyone.", name: "Nusrat Jahan" }
    ];

    let currentSlide = 0;
    const reviewText = document.querySelector('.review-text');
    const patientName = document.querySelector('.patient-info h4');
    const dots = document.querySelectorAll('.dot');

    window.changeSlide = function(index) {
        currentSlide = index;
        updateTestimonial();
    };

    function updateTestimonial() {
        reviewText.style.opacity = '0';
        patientName.style.opacity = '0';
        setTimeout(() => {
            reviewText.textContent = `"${testimonials[currentSlide].text}"`;
            patientName.textContent = testimonials[currentSlide].name;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
            reviewText.style.opacity = '1';
            patientName.style.opacity = '1';
        }, 300);
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);

    reviewText.style.transition = 'opacity 0.3s ease';
    patientName.style.transition = 'opacity 0.3s ease';

    const form = document.getElementById('booking-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;

        if(!name || !phone || !date) {
            formMessage.textContent = 'Please fill out all required fields.';
            formMessage.className = 'form-message error';
            return;
        }

        formMessage.textContent = `Thank you, ${name}! Your request for ${date} has been received. We will call you shortly.`;
        formMessage.className = 'form-message success';
        form.reset();
        setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
    });
});
