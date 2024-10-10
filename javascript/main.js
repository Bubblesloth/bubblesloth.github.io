/*
* ----------------------------------------------------------------------------------------
Author        : Rama Hardian Sidik
Template Name : Freeman - Free Multipurpose Personal One Page Html Template
Version       : 1.0
Filename      : main.js
* ----------------------------------------------------------------------------------------
* ----------------------------------------------------------------------------------------
*/
const freemaninit = (function() {
    "use strict";
    // variable 
    var header = document.querySelector('#headermain');
    var body = document.querySelector('body');
    var continuousElements = document.getElementsByClassName("sectionblock");
    var counter = document.querySelectorAll(".counterwrap__counter");
    var counters = document.querySelectorAll(".counterwrap__counter");
    var mobilelink = document.querySelectorAll('.overlay__listnav li a');
    var mobilenav = document.querySelector('.navicon');
    var mainSection = document.querySelectorAll('main div.sectionblock');
    var menuSection = document.querySelectorAll('.navpage__wrap li a');  //commenter pour désactiver le le navpage mobile
    var goup = document.querySelector('.scroll-top');
    var sliderService = document.getElementById("sliderservice");
    var yearele = document.querySelector('.years');
    var btnContainer = document.getElementById("filterwrap");
    var porto = document.getElementById('porfoliowarp');
    var Shuffle = window.Shuffle;
    var wrapper;
    var dots;
    var typedText = document.querySelector("#typed-text");
    var cursor = document.querySelector(".cursor");
    var textArrayIndex = 0;
    var charIndex = 0;
    var textArray = ["Beginner Game Designer.",  "Beginner Game Programmer.", "Beginner music producer."];
    var year = new Date().getFullYear();
    var revealPoint = 150;
    var interval = 0;
    var loop = 0;
    //var burger = document.querySelector('.mobilenav');
    //detect mobile device
    const isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    checkLoaded();
    function checkLoaded() { 
        if (document.readyState === "complete") { 
             document.querySelector(".preloader").style.display = "none";
        } else { 
          setTimeout(checkLoaded, 1000); 
        } 
      }
    // GLightbox
    const glight = function(e) {
        GLightbox({
            selector: 'glightboxvideo',
        });
        GLightbox();
    };
    const scrolspy = function(e) {
        // for clickable event
        menuSection.forEach(v => {
            v.onclick = (() => {
                setTimeout(() => {
                    menuSection.forEach(j => j.classList.remove('activelink'));
                    v.classList.add('activelink');
                }, 300)
            });
        });
        // for window scroll spy event
        window.onscroll = (() => {
            mainSection.forEach((v, i) => {
                let rect = v.getBoundingClientRect().y
                if (rect < window.innerHeight - 100) {
                    menuSection.forEach(v => v.classList.remove('activelink'));
                    menuSection[i].classList.add('activelink');
                }
            });
        });
    };
    //animated typed init ------------------------
    const erase = function(e) {
        if (charIndex > 0) {
            cursor.classList.remove('blink');
            typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 80);
        } else {
            cursor.classList.add('blink');
            textArrayIndex++;
            if (textArrayIndex > textArray.length - 1) {
                textArrayIndex = 0;
            }
            setTimeout(typeanimation, 1000);
        };
    };
    const typeanimation = function(e) {
        if (charIndex <= textArray[textArrayIndex].length - 1) {
            cursor.classList.remove('blink');
            typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeanimation, 120);
        } else {
            cursor.classList.add('blink');
            setTimeout(erase, 1000);
        }
    };
    /* scroll counter */
    counters.forEach(function(item) {
        item.counterAlreadyFired = false
        item.counterSpeed = item.getAttribute("data-Speed") / 45
        item.counterTarget = +item.innerText
        item.counterCount = 0
        item.counterStep = item.counterTarget / item.counterSpeed
        item.updateCounter = function() {
            item.counterCount = item.counterCount + item.counterStep
            item.innerText = Math.ceil(item.counterCount)
            if (item.counterCount < item.counterTarget) {
                setTimeout(item.updateCounter, item.counterSpeed)
            } else {
                item.innerText = item.counterTarget
            }
        }
    });
    const counternumber = function() {
        const isScrolledIntoView = function(el) {
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;
            // Only completely visible elements return true:
            var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
            // Partially visible elements return true:
            //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
            return isVisible;
        };
        counter.forEach(function(item, id) {
            if (!isScrolledIntoView(item)) return
            item.updateCounter()
            item.counterAlreadyFired = true
        });
    };
    // click button menu burger
    const buttonclick = function(e) {
        // menu mobile toggle
        mobilenav.addEventListener("click", function(e) {
            //your handler here
            this.classList.toggle('active');
            body.classList.toggle('openmenu');
        }, false);
        // mobile link navigation 
        for (var i = 0; i < mobilelink.length; i++) {
            mobilelink[i].addEventListener('click', function(e) {
                mobilenav.classList.toggle('active');
                body.classList.toggle('openmenu');
            }, false);
        };
    };
    // page scroll
    const scrollpage = function(e) {
        // add fixid class
        if (window.pageYOffset > 0) {
            header.classList.add('fixid');
        } else {
            header.classList.remove('fixid');
        }
    };
    //binds event ----------------------------
    const bindEvents = function(e) {
        // window onbuffer
        window.onbeforeunload = function(e) {
            // allways force page to scroll top on refresh
            window.scrollTo(0, 0);
        };
        // document load
        window.addEventListener('DOMContentLoaded', (e) => {
            // button event 
            buttonclick();
            //type animation 
            typeanimation();
            // glightbox 
            glight();
            // year 
            yearele.innerHTML = year;
        });
        window.addEventListener("scroll", (e) => {
            // scrollspy
            scrolspy();
            // scroll window 
            scrollpage();
            // counter 
            counternumber();
        });
    };
    // init - initilizes elements and events
    const AppInit = function(e) {
        bindEvents();
    };
    return {
        AppInit: AppInit
    };

}());

//CLIQUE DE SOURIS PERSO :

document.addEventListener('mousedown', function(event) {
    // Ajouter la classe lorsque le bouton de la souris est enfoncé
    document.body.classList.add('click-active');
});

document.addEventListener('mouseup', function(event) {
    // Retirer la classe lorsque le bouton de la souris est relâché
    document.body.classList.remove('click-active');
}); 


/////////////////////////
///// SOUND MANAGER /////
/////////////////////////


//headerscrollSound

var headerscrollSound = document.getElementById('headerscrollSound');

var navLinks = document.querySelectorAll('.navpage__wrap a');

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        headerscrollSound.play();
    });
});


//SELECT SOUND

var selectSound = document.getElementById('selectSound');

var selectSoundClass = document.querySelectorAll('.clickableItem');

selectSound.volume = 0.2;

selectSoundClass.forEach(function(link) {
    link.addEventListener('mouseenter', function() {
        selectSound.play();
    });
});


//Click Sound

document.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
        
        var clickSound = document.getElementById('clickSound');
        var newClickSound = clickSound.cloneNode();

        // Set the volume to a lower level (e.g., 0.5 for 50% volume)
        newClickSound.volume = 0.2;

        newClickSound.play();

        newClickSound.onended = function() {
            newClickSound.remove();
        };
    }
});


/////////////////////////////
///// END SOUND MANAGER /////
/////////////////////////////

//initilizing app
freemaninit.AppInit();