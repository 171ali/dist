( function($) {
  'use strict';
  	

  	/* Window Load */
	$(window).on('load',function(){
		$('.loader').fadeOut(200);
        $('.line').addClass('active');
	});


    /* Navbar scroll*/
    $('.navbar-nav ul li a').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top)
            }, 1000);
            $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
            return false;
        }
    });



    

    /* Full page scroll*/
    if ($('#pagepiling').length > 0){

        $('#pagepiling').pagepiling({
            scrollingSpeed: 280,
            navigation:false,
            menu: '.navbar-nav',
            anchors: ['home', 'about', 'experience', 'skills', 'projects', 'partners', 'testimonials', 'news', 'contact'],
            afterRender: function(anchorLink, index){ 
              NavbarColor();

            },
            afterLoad: function(anchorLink, index){
                $('.pp-section .intro').removeClass('animate');
                $('.active .intro').addClass('animate');
                NavbarColor();
            }
        });

  

        function NavbarColor(){
         if ($('.pp-section.active').hasClass('navbar-is-white')){
                $('.navbar-desctop').addClass('navbar-white');
                $('.progress-nav').addClass('progress-nav-white');
                $('.navbar-bottom').addClass('navbar-bottom-white');
            }
            else{
                $('.navbar-desctop').removeClass('navbar-white');
                $('.progress-nav').removeClass('progress-nav-white');
                $('.navbar-bottom').removeClass('navbar-bottom-white');
            }
        }
    }


    /* Navbar toggler */
    $('.toggler').on('click',function(){
    	$('body').addClass('menu-is-open');
    });

    $('.close, .click-capture').on('click',function(){
    	$('body').removeClass('menu-is-open');
    });


    /* Navbar mobile */
    $('.navbar-nav-mobile li a').on('click', function(){
    	$('body').removeClass('menu-is-open');
    	$('.navbar-nav-mobile li a').removeClass('active');
    	$(this).addClass('active');
    });

    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });



    /* Change bacgkround on project section*/
    $('.project-box').on('mouseover',function(){
        var index = $('.project-box').index(this);
        $('.bg-changer .section-bg').removeClass('active').eq(index).addClass('active');
    });


    /* Carousel experience*/
    $('.carousel-experience').owlCarousel({
        loop:true,
        margin:45,
        dots:true,
        nav:true,
        smartSpeed:1000,
        items:1
    });

    /* Carousel testimonials */
    $('.carousel-testimonials').owlCarousel({
	    loop:true,
	    margin:10,
        nav:true,
	    dots:false,
	    items:1
	});

    /* Send form */
	if ($('.js-ajax-form').length) {
		$('.js-ajax-form').each(function(){
			$(this).validate({
				errorClass: 'error',
			    submitHandler: function(form){
		        	$.ajax({
			            type: "POST",
			            url:"mail.php",
			            data: $(form).serialize(),
			            success: function() {
		                	$('#success-message').show();
		                },

		                error: function(){
		                	$('#error-message').show();
			            }
			        });
			    }
			});
		});
	}

})(jQuery);

// Download CV
function downloadOrPreview() {
    const userChoice = confirm("Do you want to download the CV? Click Cancel to view it in a new tab.");
    
    if (userChoice) {
        window.location.href = "../../../documentation/doc/Qasim_Ali_Shah_s_Résumé.pdf";
    } else {
        window.open("../../../documentation/doc/Qasim_Ali_Shah_s_Résumé.pdf", '_blank');
    }
}


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr4fFlropBkMDXuH4AngOx4T_h6KBUOXY",
  authDomain: "personal-portfolio-1f11c.firebaseapp.com",
  projectId: "personal-portfolio-1f11c",
  storageBucket: "personal-portfolio-1f11c.appspot.com",
  messagingSenderId: "1030027149203",
  appId: "1:1030027149203:web:c359daba8334c1590d3266",
  measurementId: "G-0LWE07LSQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.getElementById('contact').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get valuesx
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Save data to Firestore
  db.collection('contacts').add({
    name: name,
    email: email,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    console.log('Message saved');
    alert('Thank you for contacting us!');
  }).catch((error) => {
    console.error('Error saving message: ', error);
  });
}
