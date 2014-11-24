var html = '<div id="display" style="top: 0; left: 0; position: fixed; width: 100%; height: 45px; background-color: gray;padding: 10px;display: inline-table;z-index: 2147483500;box-sizing: border-box;line-height: 28px;">control panel</div>';
$('body').css('padding-top', '68px');
$('body').append(html);
// $('body').append('<p id="display"></p>');
alert('hello');
var lastelem;
// $(":root").mouseover(function(e) {
    // console.log('hi');
    // console.log(e.target.siblings);
// });

document.onmouseover = function (e) {
    var event = e || window.event;

    if (lastelem) {
        lastelem.style.border = "1px solid #fff";
        lastelem.style.background = "white";
    }

    var target = event.target || event.srcElement;
    document.getElementById('display').innerHTML = fullPath(target);
    // document.getElementById('display').innerHTML = target.previousSibling.tagName + 
    //     " | " + target.tagName + " | " + (target.nextSibling ? target.nextSibling.tagName : "X");
    // $('display').html = createXPathFromElement(target)
    target.style.border = "1px solid";
    target.style.background = "yellow";
    lastelem = target;

    // var path= GetAppliedCssRules(target);
    // console.log(fullPath(target));
    // var txy= getPageXY(target);
    // console.log(path);
    // console.log(txy);
};

function getPathTo(element) {
    if (element.id!=='')
        return 'id("'+element.id+'")';
    if (element===document.body)
        return element.tagName;

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
}

function getPageXY(element) {
    var x= 0, y= 0;
    while (element) {
        x+= element.offsetLeft;
        y+= element.offsetTop;
        element= element.offsetParent;
    }
    return [x, y];
}

function createXPathFromElement(elm) { 
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

// function GetAppliedCssRules(element) {
//     var appliedRules = [];
//     for (var x = 0; x < document.styleSheets.length; x++) {
//         var rules = document.styleSheets[x].cssRules;
//         for (var i = 0; i < rules.length; i++) {
//             if (element.is(rules[i].selectorText)) {
//                 appliedRules.push(rules[i].selectorText);
//             }
//         }
//     }
//     return appliedRules;
// };

function fullPath(el){
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
