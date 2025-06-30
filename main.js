//tirn pages when click on next or prev
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick =() => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if(pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        }
        else{
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            },500);
        }
    }
});
const pages  = document.querySelectorAll('.book-page.page-right');
const contactmebtn = document.querySelector('.btn.contact-me');

contactmebtn.onclick = () => {
    pages.forEach((page, index) =>{
        setTimeout(() => {
            page.classList.add('turn');

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500)
        }, (index +1)* 200 + 100)
    })
}

let totalpages =pages.length;
let pagenumber = 0;
function reverseindex() {
    pagenumber--;
    if(pagenumber<0){
        pagenumber =totalpages -1;
    }
}

const backprofilebtn =document.querySelector('.back-profile');

backprofilebtn.onclick = () => {
    pages.forEach((_, index) =>{
        setTimeout(() => {
            reverseindex();
            pages[pagenumber].classList.remove('turn');
            
            setTimeout(() => {
                reverseindex();
                pages[pagenumber].style.zIndex = 10 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}
// openig animation

const coverright= document.querySelector('.cover.cover-right');
const pageleft= document.querySelector('.book-page.page-left');

setTimeout(() =>{
    coverright.classList.add('turn');
}, 2100)
setTimeout(() =>{
    coverright.style.zIndex =-1;
}, 2800)


setTimeout(() => {
  pageleft.style.zIndex = 20;
}, 3200)


 pages.forEach((_, index) => {
   setTimeout(() => {
     reverseindex();
     pages[pagenumber].classList.remove("turn");

     setTimeout(() => {
       reverseindex();
       pages[pagenumber].style.zIndex = 10 + index;
     }, 500);
   }, (index + 1) * 200 + 2100);
 });


 // Add at bottom of file

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    themeIcon.classList.replace('bx-moon', 'bx-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.replace('bx-sun', 'bx-moon');
    localStorage.setItem('theme', 'dark');
  }
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeIcon.classList.replace('bx-moon', 'bx-sun');
}

// Form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const loader = document.querySelector('.loader-wrapper');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  if (!name || !email || !message) {
    showMessage('Please fill all fields', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showMessage('Please enter a valid email', 'error');
    return;
  }
  
  loader.classList.add('active');
  
  // Using SMTPJS for email sending (requires configuration)
  Email.send({
    SecureToken: "YOUR_SECURE_TOKEN", // Get from smtpjs.com
    To: 'your@email.com',
    From: email,
    Subject: `Message from ${name}`,
    Body: message
  }).then(
    () => {
      loader.classList.remove('active');
      showMessage('Message sent successfully!', 'success');
      contactForm.reset();
    },
    (error) => {
      loader.classList.remove('active');
      showMessage(`Error: ${error}`, 'error');
    }
  );
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = '';
  formMessage.classList.add(type);
  
  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.className = '';
  }, 5000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    const nextBtn = document.querySelector('.nextprev-btn:not(.back)');
    if (nextBtn) nextBtn.click();
  } else if (e.key === 'ArrowLeft') {
    const prevBtn = document.querySelector('.nextprev-btn.back');
    if (prevBtn) prevBtn.click();
  } else if (e.key === 'Escape') {
    const backProfile = document.querySelector('.back-profile');
    if (backProfile) backProfile.click();
  }
});

// Add hover effect to skills
const skills = document.querySelectorAll('.skills-content .content span');
skills.forEach(skill => {
  skill.addEventListener('mouseenter', () => {
    skill.style.transform = 'scale(1.1)';
    skill.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
  });
  
  skill.addEventListener('mouseleave', () => {
    skill.style.transform = 'scale(1)';
    skill.style.boxShadow = 'none';
  });
});

// Add page swipe detection on mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  
  if (touchStartX - touchEndX > swipeThreshold) {
    // Swipe left - next page
    const nextBtn = document.querySelector('.nextprev-btn:not(.back)');
    if (nextBtn) nextBtn.click();
  } else if (touchEndX - touchStartX > swipeThreshold) {
    // Swipe right - previous page
    const prevBtn = document.querySelector('.nextprev-btn.back');
    if (prevBtn) prevBtn.click();
  }
}