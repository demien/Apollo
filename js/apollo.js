(function(){

    var html = '<div id="display" style="top: 0; left: 0; position: fixed; width: 100%; height: 45px; background-color: #3399FF;padding: 10px;display: inline-table;z-index: 2147483500;box-sizing: border-box;line-height: 28px;font-weight:bold;">control panel</div>';
    $('body').css('padding-top', '68px');
    $('body').append(html);

    var lastelem;
    var bg_color;

    document.onmouseover = function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        document.getElementById('display').innerHTML = csspath_without_id(target);

        if (lastelem) {
            lastelem.style.background = bg_color;
        }
        bg_color = target.style.background;
        target.style.background = "#FF9933";
        lastelem = target;
    };

    function xpath(elm) { 
        var allNodes = document.getElementsByTagName('*'); 
        for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) 
        { 
            if (elm.hasAttribute('id')) { 
                    var uniqueIdCount = 0; 
                    for (var n=0;n < allNodes.length;n++) { 
                        if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
                        if (uniqueIdCount > 1) break; 
                    }; 
                    if ( uniqueIdCount == 1) { 
                        segs.unshift('id("' + elm.getAttribute('id') + '")'); 
                        return segs.join('/'); 
                    } else { 
                        segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
                    } 
            } else if (elm.hasAttribute('class')) { 
                segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
            } else { 
                for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
                    if (sib.localName == elm.localName)  i++; }; 
                    segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
            }; 
        }; 
        return segs.length ? '/' + segs.join('/') : null; 
    };


    function csspath_without_id(el){
        var names = [];
        while (el.parentNode){
            if (el==el.ownerDocument.documentElement)
                names.unshift(el.tagName);
            else{
                for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
                names.unshift(el.tagName+":nth-child("+c+")");
            }
            el=el.parentNode;
        }
        return names.join(" > ");
    };

    function csspath_with_id(el){
        var names = [];
        while (el.parentNode){
            if (el.id){
                names.unshift('#'+el.id);
                break;
            }else{
                if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
                else{
                    for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
                    names.unshift(el.tagName+":nth-child("+c+")");
                }
                el=el.parentNode;
            }
        }
        return names.join(" > ");
    }
})();

