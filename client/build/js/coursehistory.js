 $(function(){

    $(".dropdown-menu li a").click(function(){

      $(".dropdown-toggle:first-child").text('Select year: ' + $(this).text());
      $(".dropdown-toggle:first-child").val($(this).text());

   });

});
 //do not increase i here, this doubles every time. this is 2^i.
 for (var i =  0; i < 4; i++) {
 	 $(".table-bordered tbody").append($('tr#placeholder').clone());
 }
