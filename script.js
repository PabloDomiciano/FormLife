document.addEventListener("DOMContentLoaded", function () {
  // Loading Screen
  setTimeout(function () {
    document.querySelector(".loading-screen").style.opacity = "0";
    setTimeout(function () {
      document.querySelector(".loading-screen").style.display = "none";
    }, 500);
  }, 1500);

  // Mobile Menu
  const mobileMenu = document.querySelector(".mobile-menu");
  const navList = document.querySelector(".nav ul");

  mobileMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    navList.classList.toggle("active");
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.classList.contains("mobile-link")) {
        mobileMenu.classList.remove("active");
        navList.classList.remove("active");
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Animate Stats Counter
  const statNumbers = document.querySelectorAll(".number");

  function animateCounters() {
    statNumbers.forEach((number) => {
      const target = parseInt(number.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(counter);
          number.textContent = target;
        } else {
          number.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stats")) {
          animateCounters();
        }

        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".about, .services, .plans, .testimonials, .contact")
    .forEach((section) => {
      observer.observe(section);
    });

  // Testimonials Slider Navigation
  const slider = document.querySelector(".testimonials-slider");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // Form Submission
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const submitButton = this.querySelector(".submit-button");
      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;

      setTimeout(function () {
        submitButton.textContent = "Mensagem Enviada!";
        setTimeout(function () {
          submitButton.textContent = "ENVIAR MENSAGEM";
          submitButton.disabled = false;
          contactForm.reset();

          // Reset labels
          document
            .querySelectorAll(".form-group input, .form-group select")
            .forEach((input) => {
              if (input.value === "") {
                input.nextElementSibling.style.top = "15px";
                input.nextElementSibling.style.left = "15px";
                input.nextElementSibling.style.fontSize = "1rem";
                input.nextElementSibling.style.background = "transparent";
                input.nextElementSibling.style.color =
                  "rgba(255, 255, 255, 0.7)";
              }
            });
        }, 2000);
      }, 1500);
    });
  }

  // Add mobile-link class to nav links for mobile menu closing
  document.querySelectorAll(".nav a").forEach((link) => {
    link.classList.add("mobile-link");
  });
});

// Função para ler parâmetros da URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Manipular o envio do formulário
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obter os valores do formulário
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var message = document.getElementById("message").value;
      var interest =
        document.getElementById("interest").options[
          document.getElementById("interest").selectedIndex
        ].text;

      // Criar mensagem para WhatsApp
      var whatsappMessage =
        `Olá, Form Life! Meu nome é ${name}.\n\n` +
        `E-mail: ${email}\n\n` +
        `Mensagem: ${message}\n\n` +
        `Principal interesse: ${interest}\n`;

      // Codificar a mensagem para URL
      var encodedMessage = encodeURIComponent(whatsappMessage);

      // Redirecionar para WhatsApp
      window.location.href = `https://wa.me/5544999194205?text=${encodedMessage}`;
    });
  }
});
