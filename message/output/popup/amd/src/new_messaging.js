define(
[
    'jquery',
    'core/templates',
    'core/notification'
],
function(
    $,
    Templates,
    Notification
) {
	var init = function(root) {
		root = $(root);
		
	    $(".toggle-messages").click(function() {
	        $(".messageoverlay").toggleClass('active');
	    });

	   	$(".contact.active").click(function() {
	        $(".messageoverlay").toggleClass('showmessaging');
	        $(".messages").animate({
	        	scrollTop: $(document).height() 
	        }, "fast");
	    });

	    $(".returntocontacts").click(function() {
	    	$(".messageoverlay").toggleClass('showmessaging');
	    });


	    function newMessage() {
	        message = $(".message-input input").val();
	        if($.trim(message) == '') {
	            return false;
	        }
	        Templates.render('message_popup/new_message', {
                message: message,
                path: M.cfg.wwwroot + '/message/output/popup/pix'
            }).then(function(html, js) {
	            Templates.appendNodeContents('.messages ul', html, js);
	            $(".messages").animate({ scrollTop: $(document).height() }, "fast");
	            $('.contact.active .preview').html('<span>You: </span>' + message);
	        }).catch(Notification.exception);	        
	    };

	    $('.submit').click(function() {
	      newMessage();
	    });

	    $(window).on('keydown', function(e) {
	      if (e.which == 13) {
	        newMessage();
	        return false;
	      }
	    });
    };

    return {
        init: init
    };
});