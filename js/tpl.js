var tpl = {
    top_control_panel: ' \
        <div id="apollo"> \
            <div ng-app> \
                <div ng-controller="PhoneListCtrl"> \
                    <ul> \
                        <li ng-repeat="phone in phones"> \
                            <span>{{phone.name}}</span> \
                            <p>{{phone.snippet}}</p> \
                        </li> \
                    </ul> \
                </div> \
            </div> \
            <div id="display"></div> \
        </div>',
};
