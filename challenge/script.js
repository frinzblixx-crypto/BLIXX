
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});


document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const photoUpload = document.getElementById('photo-upload');
const galleryGrid = document.getElementById('gallery-grid');

photoUpload.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
            
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.style.animation = 'fadeInUp 0.5s ease';
                
              
                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = file.name;
                
             
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.title = 'Delete photo';
                deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                
                
                deleteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    galleryItem.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        galleryItem.remove();
                    }, 300);
                });
                
             
                galleryItem.appendChild(img);
                galleryItem.appendChild(deleteBtn);
                galleryGrid.appendChild(galleryItem);
                
              
                galleryItem.addEventListener('click', function() {
                    openLightbox(img.src, img.alt);
                });
            };
            
            reader.readAsDataURL(file);
        }
    });
    
 
    photoUpload.value = '';
});


document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const galleryItem = this.parentElement;
        galleryItem.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            galleryItem.remove();
        }, 300);
    });
});


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

function openLightbox(src, alt) {
    lightbox.style.display = 'block';
    lightboxImg.src = src;
    document.querySelector('.lightbox-caption').textContent = alt;
    document.body.style.overflow = 'hidden';
}

function closeLightboxModal() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}


document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        openLightbox(img.src, img.alt);
    });
});

closeLightbox.addEventListener('click', closeLightboxModal);

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightboxModal();
    }
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightboxModal();
    }
});


const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
   
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    
    if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});


let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});


const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
`;
document.head.appendChild(style);


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
