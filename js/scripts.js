
(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 600;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 700);
		}
        hidePreloader();
        stocko()
        stocks()
	});

	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 2000, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


    /* Rotating Text - Morphtext */
	$("#js-rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "fadeIn",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 2500,
		complete: function () {
			// Called after the entrance animation is executed.
		}
    });
    

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 3,
		spaceBetween: 20,
        breakpoints: {
            // when window is <= 992px
            992: {
                slidesPerView: 2
            },
            // when window is <= 768px
            768: {
                slidesPerView: 1
            } 
        }
    });

    
    /* Lightbox - Magnific Popup */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Filter - Isotope */
    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
    
    // filter items on button click
    $('.filters-button-group').on( 'click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
    
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });	
    });
    

    /* Counter - CountTo */
	var m = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (m == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 3000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			m = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });


    /* Call Me Form */
    $("#callMeForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            lformError();
            lsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            lsubmitForm();
        }
    });

    function lsubmitForm() {
        // initiate variables with form content
		var name = $("#lname").val();
		var email = $("#lemail").val();
		var select = $("#lselect").val();
        var terms = $("#lterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/callmeform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    lformSuccess();
                } else {
                    lformError();
                    lsubmitMSG(false, text);
                }
            }
        });
	}

    function lformSuccess() {
        $("#callMeForm")[0].reset();
        lsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function lformError() {
        $("#callMeForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function lsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Contact Form */
   /* $("#contactForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            cformError();
            csubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            csubmitForm();
        }
    });
*/
    function csubmitForm() {
        // initiate variables with form content
		var name = $("#cname").val();
		var email = $("#cemail").val();
        var message = $("#cmessage").val();
        var terms = $("#cterms").val();
        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
	}

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Privacy Form */
    $("#privacyForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
		var name = $("#pname").val();
		var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
	}

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
        //Date live function
        /*  var thedate   = new Date();
        var dayofweek = thedate.getUTCDay();
        var hourofday = thedate.getUTCHours();
        var orinstock = true
        var sminstock = true
        function live()
        {
        // replace with 4 for thursday and 5 for fri. hours of day is normal uk time hourofday > 15 && paste in
        if (dayofweek >= 4) {
        var liveb = document.getElementById("liveb"); 
        liveb.setAttribute("class", "btn-solid-reg"); 
        var liveb2 = document.getElementById("liveb2"); 
        liveb2.setAttribute("class", "btn-solid-reg"); 
        var liveb3 = document.getElementById("liveb3"); 
        liveb3.setAttribute("class", "btn-solid-reg"); 
        var liveb4 = document.getElementById("liveb4"); 
        liveb4.setAttribute("class", "btn-solid-reg"); 
        var d;
        d=document.getElementById("liven");
        d.innerHTML="Preorder now open - limited stock available";
        var e;
        e=document.getElementById("liven2");
        e.innerHTML="Preorder now open - limited stock available";
        var f;
        f=document.getElementById("liven3");
        f.innerHTML="<strong><i>N.B.: Limited stock available! Order now to avoid disappointment</i></strong>";
        var g;
        g=document.getElementById("liven4");
        g.innerHTML="<strong><i>N.B.: Limited stock available! Order now to avoid disappointment - don't worry if you miss out though, we'll have a new batch soon.</i></strong>";
        return true;
        }
        var liveb = document.getElementById("liveb"); 
        liveb.setAttribute("class", "btn-solid-no"); 
        var liveb2 = document.getElementById("liveb2"); 
        liveb2.setAttribute("class", "btn-solid-no");
        var liveb3 = document.getElementById("liveb3"); 
        liveb3.setAttribute("class", "btn-solid-un"); 
        var liveb4 = document.getElementById("liveb4"); 
        liveb4.setAttribute("class", "btn-solid-un"); 
        var d;
        d=document.getElementById("liven");
        d.innerHTML="<strong><i>Preorder opening at 3pm on Friday - limited stock available</i></strong>";
        var e;
        e=document.getElementById("liven2");
        e.innerHTML="<strong><i>Preorder opening at 3pm on Friday - limited stock available</i></strong>";
        var f;
        f=document.getElementById("liven3");
        f.innerHTML="N.B.: Our limited stock is almost available for preorder. Check back in the next few days.";
        var g;
        g=document.getElementById("liven4");
        g.innerHTML="N.B.: Our limited stock is almost available for preorder. Check back in the next few days.";
        return false;
        } */

    
    function stocko()
    {
        var orinstock = 1
        if (orinstock == 1) {
        var liveb = document.getElementById("livebo1"); 
            liveb.setAttribute("class", "btn-solid-reg"); 
        var liveb4 = document.getElementById("livebo"); 
            liveb4.setAttribute("class", "btn-solid-reg"); 
        
        var d;
            d=document.getElementById("liveno1");
            d.innerHTML="<strong><i>Order now - limited stock available</i></strong>";
        var f;
            f=document.getElementById("liveno");
            f.innerHTML="<strong><i>Please note delivery will take place after the current UK lockdown, due to issues with construction.</i></strong>";
        } else {
        
        var liveb2 = document.getElementById("livebo1"); 
            liveb2.setAttribute("class", "btn-solid-un"); 
        var liveb4 = document.getElementById("livebo"); 
            liveb4.setAttribute("class", "btn-solid-no");
            liveb4.href = ""
        var d;
            d=document.getElementById("liveno1");
            d.innerHTML="<strong><i>Out of stock. Don't worry, we're getting some more stock ready for next week!</i></strong>";
        var e;
            e=document.getElementById("liveno");
            e.innerHTML="<strong><i>Currently out of stock. Click for more details</i></strong>";
        }
    }
    function stocks() {
        var sminstock = 1
        if (sminstock == 1) {
        var liveb = document.getElementById("livebs1"); 
            liveb.setAttribute("class", "btn-solid-reg"); 
        var liveb3 = document.getElementById("livebs"); 
            liveb3.setAttribute("class", "btn-solid-reg");     
        var e;
            e=document.getElementById("livens1");
            e.innerHTML="<strong><i>New lower price - now only £20. Order now - limited stock available</i></strong>";
        var g;
            g=document.getElementById("livens");
            g.innerHTML="<strong><i>Please note delivery will take place after the current UK lockdown, due to issues with construction.</i></strong>";
        } else {
        var liveb3 = document.getElementById("livebs1"); 
            liveb3.setAttribute("class", "btn-solid-un"); 
        var liveb2 = document.getElementById("livebs"); 
            liveb2.setAttribute("class", "btn-solid-no"); 
            liveb2.href = ""
        var f;
            f=document.getElementById("livens");
            f.innerHTML="<strong><i>Out of stock. Don't worry, we're getting some more stock ready for next week!</i></strong>";
        var g;
            g=document.getElementById("livens1");
            g.innerHTML="<strong><i>Currently out of stock. Click for more details</i></strong>";
        }
    }
    
    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 600;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);