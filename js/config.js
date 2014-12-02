var config = function(){
    var config_css = {
        'shop_list': {
            'name': {
                'css': 'div > div > div > a > span',
                're': '.*',
            },
        },
    }

    var dom = {}
    scrape_css = function(css, re){
        var elements = $.find(css);
        return elements.map(function(element){return new RegExp(re).exec(element.innerText);});  
    }

    format_collection = function(collection){
        var length_array = [],
            result = [];
        var property_name_list = [];

        for(property_name in collection){
            property_name_list.push(property_name);
            length_array.push(collection[property_name].length);
        };
        var max_length = Math.max.apply(Math, length_array);
        for(var i = 0; i<max_length; i++){
            var item = {};
            for(property_name_index in property_name_list){
                var property_name = property_name_list[property_name_index];
                item[property_name] = collection[property_name][i];
            }
            result.push(item);
        };
        return result;
    };

    for(collection_name in config_css){
        collection = config_css[collection_name];
        var collection_result = {};
        for(property_name in collection){
            property = collection[property_name];
            collection_result[property_name] = scrape_css(property['css'], property['re']);
        }
        dom[collection_name] = format_collection(collection_result);
    }
    return dom;
}
