(function(){
    var html = tpl.top_control_panel;
    $('body').css('padding-top', '60px');
    $('body').append(html);

    // start angular
    angular.bootstrap(document,["Apollo"]);    

    // element picker start
    var last_em;
    var bg_color;
    var picker_model = true;

    // remove a event
    $('a').removeAttr('href');
    $('a').removeAttr('onClick');

    apollo = angular.element($('#apollo-display')).scope();
    console.log(apollo);

    document.onmouseover = function (e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        $('#apollo-display').html(page_util.csspath_with_id(target));
        if (last_em) {
            $(last_em).removeClass('apollo-hover');
            $(last_em).removeAttr('utc14href');
            $(last_em).unbind('click');
        }
        if (!picker_model || target.id.startWith('apollo')){
            return;
        }
        $(target).attr('utc14href', '');
        $(target).addClass('apollo-hover');
        $(target).click(function(){
            apollo.add_property(page_util.csspath_with_id(target));
            apollo.$digest();
        });
        last_em = target;
    };

    // nav event combine
    $('#apollo-preview').click(function(e) {
        picker_model = false;
        content_container = show_container()
        pre = $('pre').html(JSON.stringify(config().show_html(), null, 4));
        content_container.append(pre);
    });

    $('#apollo-set').click(function(e) {
        picker_model = true;
        content_container = $('#apollo-content-container');
        content_container.fadeOut("fast");
    });

    $('#apollo-edit-config').click(function(e) {
        picker_model = false;
        content_container = show_container()
        pre = $('pre').html(JSON.stringify(config().show_config(), null, 4));
        content_container.append(pre);
    });

    show_container = function(){
        content_container = $('#apollo-content-container');
        content_container.css('display', 'None');
        apollo_top_panel = $('#apollo-top-panel');
        content_container_height = $(window).height() - apollo_top_panel.height() + 20;
        content_container.css('height', content_container_height);
        content_container.css('top', apollo_top_panel.height() + 20);
        content_container.fadeIn("fast");
        return content_container
    }

    String.prototype.startWith = function(s){
        if(s==null||s==""||this.length==0||s.length>this.length)
            return false;
        if(this.substr(0,s.length)==s)
            return true;
        else
            return false;
        return true;
    };


})();
