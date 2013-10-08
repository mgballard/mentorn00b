var hashParams = {};
getHashParams()

$(document).ready(function() {

var n00b;
var mentor;

$('.main').submit(function(e){
	e.preventDefault();
	n00b = $( "input[name='n00b']" ).val();
	mentor = $( "input[name='mentor']" ).val()
	fragment = '#n00b=' + n00b + '&mentor=' + mentor;
	if (n00b.length && mentor.length) {
		window.location = "index3.html"+fragment;
	} else {
		makeAlert('Please complete the form.','alert');

	}
});

$('.circle a').click(function(){
	var parentUlClass = '.' + $(this).parents('ul').attr('class').replace(/\s+/g, '.');

	if($(parentUlClass + ' .selected').length) {
		$(parentUlClass + ' .selected').removeClass('selected');
		$(this).parent().toggleClass('selected');
	} else {
		$(this).parent().toggleClass('selected');
	}

	if($('.selectmentor .selected').length && !$('.selectn00b .selected').length){
		makeAlert("You've selected something to be mentored in, now select something you would like to mentor.")
	} else if(!$('.selectmentor .selected').length && $('.selectn00b .selected').length) {
		makeAlert("You've selected something to mentor, now select something you would like to be mentored in.")
	} else if($('.selectmentor .selected').length && $('.selectn00b .selected').length) {
		makeAlert("Cool!");

		var output = ''+
			'<ul class="large-block-grid-2 small-block-grid-2 circlecrop freestyle">'+
              '<li>'+
                '<div class="circle">'+
                  '<a style="background-image:url(./img/tw_thumb_1.jpg);" href="#">view</a>'+
                '</div>'+
                '<p style="text-align:center;">Looks like Mike is going to be your ' + $('.selectmentor .selected').siblings('.details').find('p').html() + ' mentor...</p>'+
              '</li>'+
              '<li>'+
                '<div class="circle">'+
                  '<a style="background-image:url(./img/tw_thumb_2.jpg);" href="#">view</a>'+
                '</div>'+
                '<p style="text-align:center;">And you are going to teach Jess all about ' + $('.selectn00b .selected').siblings('.details').find('p').html() + '!</p>'+
              '</li>'+
            '</ul>';
		
		makeReveal(output);

	}

	return false;
});

if($('ul.selectmentor').length && $('ul.selectn00b').length) {

	if(hashParams.hasOwnProperty('n00b') && hashParams.hasOwnProperty('mentor')) {
		
		$('ul.selectmentor').append('<li><div class="circle you"><a style="background-image:url(./img/tw_thumb_14.png);" href="#">view</a></div><div class="details"><p>' + hashParams.mentor + ' (You)</p></div></li>');
		$('ul.selectn00b').append('<li><div class="circle you"><a style="background-image:url(./img/tw_thumb_14.png);" href="#">view</a></div><div class="details"><p>' + hashParams.n00b + ' (You)</p></div></li>');

	}
}

  //a function to create an alert box element and add to the DOM
  function makeAlert(text,status) {
    if($('.alert-box').length != 0) {
      $('.alert-box').remove();
    }
    var alert = '<div data-alert class="alert-box ' + status + '"><span class="content">' + text + '</span><a href="#" class="close">&times;</a></div>';
    $(alert).prependTo($('body')).fadeIn('fast');
  }

  function makeReveal(content){
  	var reveal = $('<div id="reveal" class="reveal-modal"></div>');
  	reveal.append(content).appendTo('body').foundation('reveal','open');
  }

});

function getHashParams() {

    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.hash.substring(1);

    while (e = r.exec(q))
       hashParams[d(e[1])] = d(e[2]);
    return hashParams;
}