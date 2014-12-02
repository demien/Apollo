var page_util = {
    xpath: function(elm){
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
    },

    csspath_without_id: function(el){
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
    },

    csspath_with_id: function(el){
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
}
