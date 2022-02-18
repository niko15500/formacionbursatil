
$(function ()
{
    function after_form_submitted(data) 
    {
        if(data.result == 'success')
        {
            $('form#reused_form').hide();
            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }

	$('#reused_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

                    $.ajax({
                type: "POST",
                url: 'handler.php',
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json' 
            });        
        
      });	
});
document.addEventListener("DOMContentLoaded", function() {
	let navBtn = this.querySelector(".nav-btn"),
		navCloseBtn = this.querySelector(".nav-close-btn"),
		toggleNav = newState => {
			let attr = "aria-expanded",
				state = navBtn.getAttribute(attr);

			navBtn.setAttribute(attr,newState);
		};
		menuTab = e => {
			let target = this.querySelector(".nav-btn[aria-expanded=true] ~ nav");

			if (target !== null) {
				let navLinks = target.querySelectorAll("a, button"),
					tries = 0,
					last = navLinks.length - 1;
				// try to find focus in open nav
				for (let l of navLinks) {
					if (this.activeElement !== l)
						++tries;
				}
				// put focus on X (first link) if outside or tabbing from last link
				let onLast = this.activeElement === navLinks[last],
					onFirst = this.activeElement === navLinks[0],
					notShifting = !e.shiftKey,
					shifting = e.shiftKey;

				if (tries === navLinks.length || (onLast && notShifting)) {
					e.preventDefault();
					navLinks[0].focus();
				// go to last link if shift-tabbing from X
				} else if (onFirst && shifting) {
					e.preventDefault();
					navLinks[last].focus();
				}
			}
		};

	navBtn.addEventListener("click",() => {
		toggleNav(true);
	});
	navCloseBtn.addEventListener("click",() => {
		toggleNav(false);
	});
	this.addEventListener("keydown",e => {
		// Esc
		if (e.keyCode === 27)
			toggleNav(false);
		// Tab
		else if (e.keyCode === 9)
			menuTab(e);
	});
});

