(function(){
    var html = tpl.top_control_panel;
    $('body').css('padding-top', '50px');
    $('body').append(html);

    // start angular
    angular.bootstrap(document,["phonecatApp"]); 

    // element picker start
    var lastelem;
    var bg_color;
    var picker_model = true;
    document.onmouseover = function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (!picker_model || target.id.startWith('apollo')){
            return;
        }
        document.getElementById('apollo-display').innerHTML = page_util.csspath_with_id(target);
        if (lastelem) {
            lastelem.style.background = bg_color;
        }
        bg_color = target.style.background;
        target.style.background = "#FF9933";
        lastelem = target;
    };

    // nav event combine
    $('#apollo-preview').click(function(e) {
        picker_model = false;
        content_container = show_container()
        pre = $('pre').html(JSON.stringify(config().show_html(), null, 4));
        content_container.append(pre);
        console.log('preview');
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
