// ----------- Este index pertenece al script del index.html -------------

// Realizado por Sergio Júlbez 1ºINSO A 

// ----------------- Side Bar ------------------------


var isClosed = true;
var root = document.querySelector(":root"); // <- accedo a las variables definidas en css
var isOnDarkMode = false;
var sound = new Audio("media/sergio/sfx/carrera_Recortado.mp3");

function sideBar() {
    rotateMenu()
    if (isClosed) {
        document.getElementById("sideBar").style.width = "250px";
        isClosed = false;
        //changeBgColor();
    } else {
        closeNav();
        //changeBgColor();
    }
}

function closeNav() {
    document.getElementById("sideBar").style.width = "0";
    isClosed = true;  

   
}

// --------------- Otros -------------------------

function rotateMenu() {
    var userMenu = document.getElementById("userMenu");
    userMenu.classList.toggle("rotate");
}


function changeBgColor() {
    var currentBG = document.getElementById("body");
    currentBG.classList.toggle("changeColor");
}


function darkMode() {
    var darkMode = document.getElementById("body");
    darkMode.classList.toggle("darkMode");
    

    if (isOnDarkMode) {
        root.style.setProperty("--cardsBG", "rgb(231, 222, 242)");
        root.style.setProperty("--cardsTextColor", "#1E1E24");
        isOnDarkMode = false;
    } else {
        isOnDarkMode = true;
        root.style.setProperty("--cardsBG", "#1E1E24");
        root.style.setProperty("--cardsTextColor", "rgb(231, 222, 242)");
    }
}


function dummy() {
    alert("Hola, esta funcion no ha sido implementada");
}

function minigame(event, destination) {
    event.preventDefault();
    window.scrollTo({top: destination, behavior: 'smooth'});
}

function onLoad() {
    closeNav();
    showSlides(slideIndex);
    startInterval();
}


window.addEventListener('scroll', function() {

    var coso = document.getElementById("vidd");
    var posicionScroll = window.scrollY;

    if (posicionScroll > (coso.offsetTop - 740)) {
        coso.style.opacity = 1;
    } else {
        coso.style.opacity = 0;
    }
 
});

// ------------------------ Redireciones a otras web ---------------------


function reDirect(arg) {
    let redirectUrl;

    switch (arg) {
        case 1:
            redirectUrl = "html/arturo.html";
            break;
        case 2:
            redirectUrl = "html/mario.html";
            break;
        case 3:
            redirectUrl = "html/victor.html";
            break;
        case 4:
            redirectUrl = "html/fer.html";
            break;
        case 5:
            redirectUrl = "html/pablo.html";
            break;
        default:
            console.error("ERROR: Argumento no reconocido");
            return;
    }

    if (redirectUrl) {
        window.location.assign(redirectUrl);
    } else {
        alert("Esta funcion se ha desactivado debido a que las paginas correspondientes no son del mismo creador.");
        console.error("ERROR: URL no definida para el argumento proporcionado");
    }
}

// ----------------------- Slider -----------------------------



let slideIndex = 1;
const slideTimer = 3500;
var intervalo;
var isLocked = false;
let slides = document.getElementsByClassName("slide");
let lineSlide = document.getElementsByClassName("currentSlide-line");


function nextSlide(fromInterval) {
    showSlides(slideIndex += 1, true);
        
    if (!fromInterval && !isLocked) {
        pushSlide();
        isLocked = true;
    } 

}

function prevSlide() {

    showSlides(slideIndex -= 1, false);
        
    if (!isLocked) {
        pushSlide();
        isLocked = true;
    } 
}

function pushSlide() {
    clearInterval(intervalo);
      
    setTimeout(function() {
        startInterval();
        isLocked = false;
    }, slideTimer);
}

function startInterval() {
    intervalo = setInterval(function()  {
        nextSlide(true);
    }, slideTimer);
}


function showSlides(n, fromNext) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transition = "margin 1s"; 

        var marginLeftValue;

        if (fromNext) {
            marginLeftValue = (i - slideIndex + 1) * 100 + "%";
        } else {
            marginLeftValue = (slideIndex - i - 1) * -100 + "%";
        }

        slides[i].style.marginLeft = marginLeftValue;
       
    }

    slides[slideIndex - 1].style.marginLeft = "0"; 
    


    // barras que indican en que slider estas

    for (let i = 0; i < lineSlide.length; i++) {
        lineSlide[i].style.backgroundColor = "";  
    }
  
    lineSlide[slideIndex - 1].style.backgroundColor = "rgba(19, 255, 212, 0.522)";
    
}
  
// ---------------------- mini juego ------------------------

let numbers = [1, 2, 3, 4];
let currentIndex = 1;
let fallos = 0;
var started = false;
var msg = document.getElementById("stats");
var seg = 0;
var mseg = 0;
var crono;

function generateNumbers() {
    numbers.sort(function() {
        return Math.random() - 0.5;
    });
}

function resetGame() {

    setTimeout(function () {
        generateNumbers();
        currentIndex = 1;
        fallos = 0;
        displayNumbers();

        document.getElementById("arriba-izq").style.backgroundColor = "#383D3B";
        document.getElementById("abajo-izq").style.backgroundColor = "#383D3B";
        document.getElementById("arriba-drch").style.backgroundColor = "#383D3B";
        document.getElementById("abajo-drch").style.backgroundColor = "#383D3B";
    },100)
    msg.innerHTML = `Tiempo: ${seg}:${mseg}`;
    started = false
}

function checkVictory() {
    if (currentIndex === (numbers.length+1) || (fallos + currentIndex) === (numbers.length+1)) {
        clearInterval(crono);
        currentIndex = 1;
        fallos = 0;
        msg.innerHTML = `Tiempo: ${seg}:${mseg}`;
        started = false
    } else {
        return;
    }
}

function displayNumbers() {
    var tyre1 = document.getElementById("arriba-izq");
    var tyre2 = document.getElementById("abajo-izq");
    var tyre3 = document.getElementById("arriba-drch");
    var tyre4 = document.getElementById("abajo-drch");

    tyre1.innerHTML = numbers[0];
    tyre2.innerHTML = numbers[1];
    tyre3.innerHTML = numbers[2];
    tyre4.innerHTML = numbers[3];

   // alert(tyre1.innerHTML + "|" + numbers[0] + "-" + tyre2.innerHTML + "|" + numbers[1] + "-" + tyre3.innerHTML + "|" + numbers[2] + "-" + tyre4.innerHTML + "|" + numbers[3]);
}

function handleClick(tyreId) {

    if (!started) return;

    var tyre = document.getElementById(tyreId);
    
    if (parseInt(currentIndex + fallos) === parseInt(tyre.innerHTML)) {
        currentIndex++;
        tyre.style.backgroundColor = "green";
    } else {
        fallos++;
        tyre.style.backgroundColor = "red";
    }
    checkVictory()
}


function rueda1() {
    handleClick("arriba-izq");
}

function rueda2() {
    handleClick("abajo-izq");
}

function rueda3() {
    handleClick("arriba-drch");
}

function rueda4() {
    handleClick("abajo-drch");
}

function startGame() {
   
    seg = 0;
    mseg = 0;

    setTimeout(() => {
        sound.play();
    }, 500);

    setTimeout(() => {
        msg.innerHTML = "Preparado?";
    }, 1000);

    setTimeout(() => {
        msg.innerHTML = "Listo?";
    }, 2000);

    setTimeout(() => {
        msg.innerHTML = "YA!";
        resetGame();
        started = true;
    }, 3000);

    setTimeout(() => {
        crono = setInterval(() => {
            mseg += 10;


            if (mseg >= 1000) {
                mseg = 0;
                seg++;
            }

            let tiempoFormateado = `${seg.toString().padStart(2, "0")}:${mseg.toString().padStart(3, "0")}`;
            document.getElementById("stats").innerHTML = `Tiempo: ${tiempoFormateado}`;

        }, 10);
    }, 3250);
}
