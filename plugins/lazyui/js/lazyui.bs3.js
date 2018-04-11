/** 
 * lazy Ui Components
 * for bootstrap 3
 * by: lazyui
 *
 */

// **toc**



String.prototype.ucFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}




/**
 * > lazyUiForm
 * Version: 0.1
 * URL: github
 * Description: bootstrap tranform
 * Requires: jQuery
 * Author: lutfi arfianto
 * Copyright: (c) 2018
 * License: MIT
 */

;(function($, document, window, undefined) {

    "use strict";

    var pluginName = 'lazyUiForm';

    var defaults = {
        property: 'value',
        layout: 'vertical', // vertical | horizontal | none
        anotherProperty: 10
    };

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // Merge the options given by the user with the defaults
        this.options = $.extend({}, defaults, options)

        // Attach data to the elment
        this.$el      = $(element);
        this.$el.data(name, this);

        this._defaults = defaults;
        
        
        var meta       = this.$el.data(name + '-opts');
        this.opts      = $.extend(this._defaults, options, meta);
        
        this.layout    = $(element).data('layout') || this.opts;

        // Initialization code to get the ball rolling
        this.init();
        this.transform();
    }

    Plugin.prototype = {

        init: function() {
            // Plugin initializer - prepare your plugin

        },

        // main transform caller
        transform: function(){
            var that = this;

            this.$el.removeClass('hidden');

            $(':input,div.form-block', that.$el ).each(function(i,o){

                var tagName = $(o).prop('tagName').toLowerCase().ucFirst();
                var typeAttr = typeof($(o).attr('type')) == "undefined"?"": 
                    $(o).attr('type').toLowerCase().ucFirst();

                var cmd = "tag"+ tagName+typeAttr;

                var caption_save = $(o).attr('caption')==undefined? tagName: $(o).attr('caption').ucFirst();

                $(o).attr('caption', caption_save);

                that[cmd](o);

                that.wrapInputGroup(o);

            })



        },

        tagDiv: function(o){

            this["wrapDiv"+this.layout.ucFirst()](o);

        },


        tagInputText: function(o){

            this["wrap"+this.layout.ucFirst()](o);
            $(o).addClass('form-control').attr('placeholder', $(o).attr('caption'));

        },

        tagInputDate: function(o){
 
             this["wrap"+this.layout.ucFirst()](o);
             $(o).addClass('form-control').attr('placeholder', $(o).attr('caption'));
 
         },

        tagInputHidden: function(o){
            // dummy function
        },

        tagInputPassword: function(o){

            this["wrap"this.layout.ucFirst()](o);
            $(o).addClass('form-control').attr('placeholder', $(o).attr('caption'));

        },

        tagTextarea: function(o){

            this["wrap"+this.layout.ucFirst()](o);
            $(o).addClass('form-control').attr('placeholder', $(o).attr('caption'));

        },

        tagInputCheckbox: function(o){

            this.wrapCustomControl(o);
            $(o).addClass('custom-control-input');

        },

        tagInputRadio: function(o){

            this.wrapCustomControl(o);
            $(o).addClass('custom-control-input');

        },

        tagSelect: function(o){

            this["wrap"+this.layout.ucFirst()](o);
            $(o).addClass('custom-select form-control');

        },

        tagInputFile: function(o){

            this["wrap"+this.layout.ucFirst()](o);
            this.wrapCustomFile(o);
            $(o).addClass('custom-file-input');

        },

        tagButton: function(o){

            $(o).addClass('btn btn-primary');

        },

        tagButtonSubmit: function(o){

            $(o).addClass('btn btn-primary');

        },

        wrapDivVertical: function(o){
            var form_group_class = 'form-group';
            var form_group_label = '<label class="col-form-label">' + $(o).attr('caption') + '</label>';
            var form_group_inner = '<div></div>';

            $(o).addClass(form_group_class);
            $(o).wrapInner(form_group_inner);
            $(o).prepend(form_group_label);
        },

        wrapDivNone: function(o){
            var form_group_class = 'form-group';
            var form_group_inner = '<div></div>';

            $(o).addClass(form_group_class);
            $(o).wrapInner(form_group_inner);
        },

        wrapDivHorizontal: function(o){
            var form_group_class = 'form-group row';
            var form_group_label = '<label class="col-form-label col-md-3">' + $(o).attr('caption') + '</label>';
            var form_group_inner = '<div class="col-md-9"></div>';

            $(o).addClass(form_group_class);
            $(o).wrapInner(form_group_inner);
            $(o).prepend(form_group_label);
        },

        wrapVertical: function(o){

            var form_group_wrap = '<div class="form-group"></div>';
            var form_group_label = '<label class="col-form-label">' + $(o).attr('caption') + '</label>';
            $(o).wrap(form_group_wrap);
            $(o).parent().prepend(form_group_label);

        },

        wrapNone: function(o){

            var form_group_wrap = '<div class="form-group"></div>';
            $(o).wrap(form_group_wrap);

        },

        wrapHorizontal: function(o){

            var form_group_wrap = '<div class="form-group row"></div>';
            var form_group_label = '<label class="col-form-label col-md-3">' + $(o).attr('caption') + '</label>';
            var form_group_input = '<div class="col-md-9" ></div>';
            $(o).wrap(form_group_wrap);
            $(o).wrap(form_group_input);
            $(o).parents('.form-group').prepend(form_group_label);

        },

        wrapCustomControl: function(o){

            var itype = $(o).attr('type');
            var caption = $(o).attr('caption');

            var custom_control_wrap = '<label class="custom-control custom-'+ itype + ' " ></label>';
            var custom_control_desc = '<span class="custom-control-indicator"></span><span class="custom-control-description">'+caption+'</span>';

            $(o).wrap(custom_control_wrap);
            $(o).parent().append(custom_control_desc);

        },

        wrapCustomFile: function(o){

            var custom_control_wrap = '<label class="custom-file" ></label>';
            var custom_control_desc = '<span class="custom-file-control"></span>';

            $(o).wrap(custom_control_wrap);
            $(o).parent().wrap('<div>');
            $(o).parent().append(custom_control_desc);

        },

        wrapInputGroup: function(o){

            var prependIcon = failsave_data(o , 'prepend-icon', '');
            var appendIcon = failsave_data(o, 'append-icon', '');
            var prependStr = failsave_data(o, 'prepend-str', '');
            var appendStr = failsave_data(o, 'append-str', '');

            var has_input_group = prependIcon || appendIcon || prependStr || appendStr ;
            var has_prepend = prependIcon || prependStr ;
            var has_append = appendIcon || appendStr;

            var addOn = '';

            if( has_input_group ){

                var inputGrp = $('<div/>').addClass('input-group');
                var inputGrpAddon = $('<div/>').addClass('input-group-addon');

                $(o).wrap( inputGrp );

                if( has_prepend ){

                    addOn = $(add_icon( prependIcon ) + prependStr)
                        .wrap(inputGrpAddon).parent() ;

                    $(o).parent().prepend( addOn );

                }

                if( has_append ){

                    addOn = $(add_icon( appendIcon ) + appendStr)
                        .wrap(inputGrpAddon).parent() ;

                    $(o).parent().apppend( addOn );

                }

            }

        },



        



    };

    $.fn[pluginName] = function(options) {
        // Iterate through each DOM element and return it
        return this.each(function() {
            // prevent multiple instantiations
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

    // Private function that is only called by the plugin
    var add_icon = function( icon ){
        return '<i class="'+ icon + '"></i>'
    }


})(jQuery, document, window);




/**
 * > lazyUiTabs
 * Version: 0.1
 * URL: lazyui.github.com
 * Description: Lazy UI for Bootstrap 4 UI
 * Requires: jQuery, Bootstrap4
 * Author: lazyui@github.com
 * Copyright: (c) 2018
 * License: MIT
 */

;(function($, document, window, undefined) {
    "use strict";

    var pluginName = 'lazyUiTabs';

    var defaults = {
        property: 'value',
        anotherProperty: 10
    };

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // Merge the options given by the user with the defaults
        this.options = $.extend({}, defaults, options)

        // Attach data to the elment
        this.$el      = $(element);
        this.$el.data(name, this);

        this._defaults = defaults;

        var meta      = this.$el.data(name + '-opts');
        this.opts     = $.extend(this._defaults, options, meta);

        // Initialization code to get the ball rolling
        this.init();
        this.transform();
    }

    Plugin.prototype = {

        init: function() {

        },

        // main caller
        transform: function(){
            var that = this;

            $(that.$el ).each(function(i,o){

                var wrap_html = '<div class="tabs_container" ></div>';

                $(o).wrap(wrap_html);

                $(o).addClass('tab-content');

                if(typeof($(o).attr('id'))=='undefined'){
                    $(o).attr('id','id_lazy_tabs_' + i);
                }

                var nav_type = $(o).data('nav')==undefined?'tabs':$(o).data('nav');

                that['add_'+nav_type](o, that );

            })


        },

        add_tabs: function(o, that){

            var id = $(o).attr('id')+'_nav';

            var tabs_nav = $('<ul/>')
                .addClass("nav nav-tabs")
                .attr('id',id)
                .attr('role',"tablist")
                ;

            $(o).before( $(tabs_nav) );

            var ids = that.make_content_id(o);
            var captions = that.get_caption(o);

            for(var i in ids){
                var caption = captions[i];
                var button = '<a href="#' + ids[i] + '" >'+ caption +'</a>';

                button = $(button)
                    .attr('data-toggle','tab')
                    .attr('role','tab')
                    .attr('aria-controls',ids[i])
                    ;

                var li = $('<li/>')
                    .attr('role','presentation')
                    ;

                if(i==0) 
                    $(li).addClass('active');

                var tabs = $(li).append( $(button) );

                $('#'+id).append( tabs );
            }



        },

        make_content_id: function(o){

            var ids = {};

            $('div' , o).each(function(i,c){
                var id = $(o).attr('id')+'_content_'+i;
                $(c).attr('id', id );
                ids[i] = id;

                $(c).addClass('tab-pane').attr('role','tabpanel');

                if(i==0){
                    $(c).addClass('active')
                }

            })

            return ids;

        },

        get_caption: function(o){

            var caption = {};

            $('div',o).each(function(i,c){
                caption[i] = $(c).attr('caption')==undefined?'Tab'+(i*1+1):
                    $(c).attr('caption').ucFirst();
            })

            return caption;
        }



    };

    $.fn[pluginName] = function(options) {
        // Iterate through each DOM element and return it
        return this.each(function() {
            // prevent multiple instantiations
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };


})(jQuery, document, window);



/**
 * > lazyUiCollapse
 * Version: 0.1
 * URL: lazyui.github.com
 * Description: collapse bootstrap 4
 * Requires: jquery, bootstrap 4
 * Author: lazyui@github.com
 * Copyright: (c) 2018
 * License: MIT
 */

;(function($, document, window, undefined) {
    "use strict";

    var pluginName = 'lazyUiCollapse';

    // >> Option
    var defaults = {
        caption: 'Section'
    };

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options)

        this.$el      = $(element);
        this.$el.data(name, this);

        this._defaults = defaults;

        var meta      = this.$el.data(name + '-opts');
        this.opts     = $.extend(this._defaults, options, meta);

        // Initialization code to get the ball rolling
        this.init();
        this.transform();

    }

    // >> Extends
    Plugin.prototype = {

        init: function() {

        },

        transform: function(){
            var that = this;

            $(that.$el).each(function(i,o){

                $(o).attr('role', 'tablist')
                    .addClass('panel-group')
                    ;

                var elem_id = failsave_id(o, 'id_lazy_collapse_' + i);
                $(o).attr('id',elem_id);

                that.wrap_panel(o, that);

            })

        },

        wrap_panel: function(o, that){

            var ids = that.get_element_id(o);

            $('div', o).each(function(i,e){

                that.set_body(o, i, e, ids, that);

            })

        },

        get_element_id: function(o){

            var parent_id = $(o).attr('id');
            var ids = {};

            $('div',o).each(function(i,e){
                var element_id = failsave_id(e, parent_id + '_panel_' + i );
                ids[i] = element_id;
            })

            return ids;

        },

        set_body: function(o, i, e, ids, that){

            var panel_section = $('<div/>')
                .addClass('panel panel-default collapse-section')
                ;
            
            var collapse_body_html = $('<div></div>')
                .addClass("panel-collapse collapse ") 
                .attr('id', ids[i])
                .attr('role','tabpanel')
                ;

            if(i==0) $(collapse_body_html).addClass('in');

            var card_body_html = '<div class="panel-body"></div>';

            $(e).wrap(panel_section)
                .wrap(collapse_body_html)
                .wrap(card_body_html);


            that.set_header(o, i , e, ids, that);

        },

        set_header: function(o, i , e, ids, that){

            var panel_header = '<div class="panel-heading" role="tab" ></div>';
            var panel_link = $('<a></a>').prependTo( $(e).parents('.collapse-section') );
            var caption = failsave_attr( e , 'caption' , that.opts.caption + ' ' + (i*1+1) ).ucFirst();

            var heading = $(panel_link).attr('data-toggle','collapse')
                .attr('aria-expanded','false')
                .attr('data-parent','#' + $(o).attr('id') )
                .attr('aria-control', ids[i] )
                .attr('href', '#' + ids[i])
                .text( caption )
                .wrap(panel_header)
                .wrap('<h4 class="panel-title"></h4>')
            ;

        }

    };

    $.fn[pluginName] = function(options) {
        // Iterate through each DOM element and return it
        return this.each(function() {
            // prevent multiple instantiations
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };


})(jQuery, document, window);



/**
 * > lazyUiCarousel
 * Version: 0.1
 * URL: lazyui.github.com
 * Description: bootstrap 4 carousel
 * Requires: jQuery, Bootstrap 4
 * Author: lazyui
 * Copyright: (c) 2018
 * License: MIT
 */


;(function($, document, window, undefined) {
    "use strict";

    var pluginName = 'lazyUiCarousel';

    var defaults = {
        indicators: true,
        controls: true,
        captions: true
    };

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // Merge the options given by the user with the defaults
        this.options = $.extend({}, defaults, options)

        // Attach data to the elment
        this.$el      = $(element);
        this.$el.data(name, this);

        this._defaults = defaults;

        var meta      = this.$el.data(name + '-opts');
        this.opts     = $.extend(this._defaults, options, meta);

        // Initialization code to get the ball rolling
        this.init();
        this.transform();
    }

    Plugin.prototype = {

        init: function() {
            // Plugin initializer - prepare your plugin
        },

        transform: function(){

            var that = this;

            $(that.$el).each(function(i,o){

                var id = failsave_id(o, 'id_carousel_' + (i*1+1) );
                $(o).attr('id',id);

                that.set_carousel(o, that);
                if(that.opts.controls)
                    that.set_controls(o, that);

                if(that.opts.indicators)
                    that.set_indicators(o, that);

                if(that.opts.captions)
                    that.set_captions(o, that);

            })

        },

        set_carousel: function(o, that){

            var carousel_inner = '<div class="carousel-inner" role="listbox"></div>';
            var carousel_item = '<div class="item"></div>';

            $(o).addClass('carousel slide').attr('data-ride','carousel')
                .wrapInner( carousel_inner )
            ;

            $('img',$(o)).each(function(i,o){
                $(o).addClass('d-block w-100');
                $(o).wrap( carousel_item );

                if(i==0){
                    $(o).parent().addClass('active');
                }
            })

        },

        set_controls: function(o, that){

            var id = $(o).attr('id');
            var link = '<a></a>';
            var prev_html = '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span>';
            var next_html = '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span>';

            var link_prev = $(link).attr('href','#'+id)
                .attr('role','button')
                .attr('data-slide','prev')
                .attr('class','carousel-control left')
                .html( prev_html )
                ;

            $(link_prev).appendTo(o);

            var link_next = $(link).attr('href','#'+id)
                .attr('role','button')
                .attr('data-slide','next')
                .attr('class','carousel-control right')
                .html( next_html )
                ;

            $(link_next).appendTo(o);

        },

        set_indicators: function(o , that){

            var indicator = '<ol></ol>';
            var id = $(o).attr('id');

            indicator = $(indicator).prependTo(o);

            $(indicator).addClass('carousel-indicators');

            $('img', o).each(function(i,e){
                var item = $('<li>');
                $(item).attr('data-target', '#' + id)
                    .attr('data-slide-to',i)
                ;
                if(i==0){
                    $(item).addClass('active');
                }

                $(item).appendTo( indicator );

            })

        },

        set_captions: function(o, that){

            $('.item', $(o) ).each(function(i,e){

                var caption = $('<div></div>')
                    .addClass('carousel-caption');

                $(this).append( $(caption) );

                var img = $('img', $(this) );

                var _caption = failsave_attr( img , 'caption' , '' ).split('|');

                var carousel_caption = $('.carousel-caption', $(this));

                $('<h3/>').text( _caption[0] ).appendTo( $(carousel_caption) );

                $('<p/>').text( _caption[1] ).appendTo( $(carousel_caption) );

            })

        }







    };

    $.fn[pluginName] = function(options) {
        // Iterate through each DOM element and return it
        return this.each(function() {
            // prevent multiple instantiations
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };


})(jQuery, document, window);




/**
 * > lazyUiModal
 * Version: 0.1
 * URL: lazyui.github.com
 * Description: lazy ui for bootstrap 4
 * Requires: jQuery, Bootstrap 4
 * Author: lazyui
 * Copyright: (c) 2018
 * License: MIT
 */

;(function($, document, window, undefined) {
    // Optional, but considered best practice by some
    "use strict";

    // Name the plugin so it's only in one place
    var pluginName = 'lazyUiModal';

    // Default options for the plugin as a simple object
    var defaults = {
        property: 'value',
        anotherProperty: 10
    };

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // Merge the options given by the user with the defaults
        this.options = $.extend({}, defaults, options)

        // Attach data to the elment
        this.$el      = $(element);
        this.$el.data(name, this);

        this._defaults = defaults;

        var meta      = this.$el.data(name + '-opts');
        this.opts     = $.extend(this._defaults, options, meta);

        // Initialization code to get the ball rolling
        this.init();
        this.transform();

    }

    // Extending plugin
    Plugin.prototype = {

        init: function() {
            // Plugin initializer - prepare your plugin
        },

        transform: function(){

            var that = this;

            $(that.$el).each(function(i,o){

                console.log(o);

                that.make_modal(i, o, that);
                that.add_header(o, that);
                that.add_body(o, that);
                that.add_footer(o, that);

            })

        },

        make_modal: function(i, o, that){

            var id = failsave_id(o, 'id_lazy_modal_' . i);

            $(o).addClass('modal fade')
                .attr('id',id)
                .attr('tabindex','-1')
                .attr('role','dialog')
                .attr('aria-labelledby',id)
                ;

            var inner_modal_2 = '<div class="modal-dialog" role="document"></div>';
            var inner_modal_1 = '<div class="modal-content"></div>';

            $(o).wrapInner(inner_modal_1).wrapInner(inner_modal_2);

        },

        add_header: function(o, that){

            var header = $('.modal-content > header',o);
            var title_text = $(header).text();

            var button_close_html = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

            var header_obj = $('<div class="modal-header"></div>')
                .append('<h4 class="modal-title">'+title_text+'</h4>')
                ;

            $(header_obj).prepend( button_close_html );

            $('.modal-content', o ).prepend( $(header_obj ));
            $('.modal-content > header', o ).remove();

        },

        add_body: function(o, that){

        },

        add_footer: function(o, that){

            var footer = $('.modal-content > footer',o);
            var footer_html = $(footer).html();
            var footer_obj = $('<div class="modal-footer" />').html( footer_html );

            $('.modal-content', o ).append( $(footer_obj ));
            $('.modal-content > footer', o ).remove();

            $('.modal-footer > [data-type="close"]', o).attr('data-dismiss','modal');
            $('.modal-footer > button', o).addClass('btn');

        }, 

    };

    $.fn[pluginName] = function(options) {
        // Iterate through each DOM element and return it
        return this.each(function() {
            // prevent multiple instantiations
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };


})(jQuery, document, window);














function failsave_attr(element, attr, value){
    return typeof( $(element).attr(attr))=='undefined' ?
        value : $(element).attr(attr);
}

function failsave_id(element, name){
    return failsave_attr(element, 'id', name);
}

function failsave_data(element, data, value){
    return typeof( $(element).data(data))=='undefined' ?
        value : $(element).data(data);
}


$('form[data-ui="lazy-form"]').lazyUiForm();
$('[data-ui="lazy-tabs"]').lazyUiTabs();
$('[data-ui="lazy-collapse"]').lazyUiCollapse();
$('[data-ui="lazy-carousel"]').lazyUiCarousel();
$('[data-ui="lazy-modal"]').lazyUiModal();


