(function(){
    var html = tpl.top_control_panel;
    $('body').css('padding-top', '50px');
    $('body').append(html);
    alert(JSON.stringify(config()));
    var lastelem;
    var bg_color;

    document.onmouseover = function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        document.getElementById('display').innerHTML = page_util.csspath_with_id(target);

        if (lastelem) {
            lastelem.style.background = bg_color;
        }
        bg_color = target.style.background;
        target.style.background = "#FF9933";
        lastelem = target;
    };

})();
