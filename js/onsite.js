
jQuery(document).ready(function($) {

    $('code.pretty').each(function(i,o){
        $(this).wrap('<pre class="prettyprint " ></pre>').parent('pre').wrap('<p>');
        $(this).parents('p').prepend('<span class="text-small text-italic tag warning" >Code snipet #'+(i+1)+' </span>');
    })
        
});
