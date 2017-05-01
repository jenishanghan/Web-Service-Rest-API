
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


function getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}

function CheckErrors(currentForm) {
    $.validator.unobtrusive.parse($(currentForm));
    if (!jQuery(currentForm).valid()) {
        $('.field-validation-error.tooltip-danger').tooltip('hide');
        $('.select-validatethis.tooltip-danger').tooltip('hide');
        $('.jcf-class-validatethis.tooltip-danger').tooltip('hide');

        return false;
    }
    return true;
}

$.validator.setDefaults({
    showErrors: function (errorMap, errorList) {
        
        this.defaultShowErrors();
        var allValidation = this.elements();

        // destroy tooltips on valid elements --remove erro from parent row-block
        var validElement = $("." + this.settings.validClass);
        $.each(validElement, function (i, val) {
            if ($(val).parent().hasClass("btn-group")) {
           
                val = $(val).parent();
            }

            if (!$(val).hasClass('ko-validation')) {
                $(val).removeClass("tooltip-danger").tooltip("destroy").closest('.row-block').removeClass('error');
                $(val).siblings('.select-validatethis').removeClass("tooltip-danger").tooltip("destroy");
                $(val).siblings('.jcf-class-validatethis').removeClass("tooltip-danger").tooltip("destroy");
            }
        });

        // add/update tooltips 
        for (var i = 0; i < errorList.length; i++) {
            var error = errorList[i];

            //$("#" + error.element.id).tooltip();

            $("#" + error.element.id).closest('.row-block').addClass('error');
            $("#" + error.element.id).siblings('.select-validatethis').tooltip("hide");
            if ($("#" + error.element.id).hasClass('jcf-hidden')) {
                if ($("#" + error.element.id).prop('tagName') == 'SELECT') {
                    $("#" + error.element.id).siblings('.select-validatethis')
                        .attr("data-original-title", error.message)
                        .attr("data-html", "true")
                        .addClass("tooltip-danger")
                        .tooltip({ html: true });
                    //.tooltip('show', { html: true });
                } else if ($("#" + error.element.id).attr('type') == 'checkbox') {
                    $("#" + error.element.id).siblings('.jcf-class-validatethis')
                        .attr("data-original-title", error.message)
                    .attr("data-html", "true")
                        .addClass("tooltip-danger")
                        .tooltip({ html: true });//.tooltip('show', { html: true });
                }
            }
            else if ($("#" + error.element.id).parent().hasClass("btn-group")) {
                $("#" + error.element.id).parent(".btn-group")
                   .attr("data-original-title", error.message)
                   .attr("data-html", "true")
                   .addClass("tooltip-danger")
                   .tooltip({ html: true });
            } else {
                $("#" + error.element.id)
                    .attr("data-original-title", error.message)
                    .attr("data-html", "true")
                    .addClass("tooltip-danger")
                    .tooltip({ html: true }); //.tooltip('show', { html: true });//.tooltip({ "html": true });
                //.attr("data-placement", "right")
                //.tooltip({trigger:'click'});
            }
        }
    }
});

// Ajax call code 
// TODO :: This is used in our site to show spinner https://github.com/adonespitogo/angular-loading-spinner
// Ref. : https://github.com/urish/angular-spinner   , http://fgnass.github.io/spin.js/
function AngularAjaxCall($angularHttpObejct, url, postData, httpMethod, callDataType, contentType) {
    //myApp.showPleaseWait();
    if (contentType == undefined)
        contentType = "application/x-www-form-urlencoded;charset=UTF-8";
    
    if (callDataType == undefined)
        callDataType = "json";

    return $angularHttpObejct({
        method: httpMethod,
        responseType: callDataType,
        url: url,
        data: postData,
        headers: { 'Content-Type': contentType }

    }).error(function (data, error) {
        //window.location =  window.BasePath+"home#/error";
    });
    //    .finally(function () {
    //    myApp.hidePleaseWait();
    //});
}

// code for show toaster messages
function ShowMessages(data) {
    if (data.IsSuccess != undefined && data.Message != undefined) {
        if (data.IsSuccess && (data.Message != undefined || data.Message != null || data.Message != '')) {
            ShowMessage(data.Message);
        } else {
            ShowAlertMessage(data.Message, 'error', "error");
        }
    }
}

function ShowMessage(message, type) {
    if (type != undefined && type == 'error')
        toastr.error(message);
    else if (type != undefined && type == 'warning')
        toastr.warning(message);
    else
        toastr.success(message);
}

function ShowAlertMessage(message, type, header) {
    var classname;
    var type;
    var header;
    if (header)
        header = header;
    else
        header = '';

    switch (type) {
        case 'alert':
            classname = 'warning';
            break;
        case 'info':
            classname = 'info';
            break;
        case 'error':
            classname = 'danger';
            break;
        default:
            classname = 'warning';
            type = 'alert';
            break;
    };
    toastr.error(message);

}

function ShowToaster(type, message, options, callback) {
    toastr.clear();
    toastr.options.closeButton = true;
    toastr.options.timeOut = 1500;
    toastr.options.positionClass = 'toast-top-right';
    if (callback != undefined)
        toastr.options.onHidden = callback;

    if (type == 'success' && message != undefined && message != '') {
        toastr.success(message, '', options);
    }
    else if (type == 'warning' && message != undefined && message != '') {
        toastr.warning(message);
    }
    else if (type == 'error' && message != undefined && message != '') {
        toastr.error(message);
        //if (options == undefined) {
        //    toastr.error(message, '', { timeOut: 0, positionClass: 'toast-top-center', extendedTimeOut: 0, closeButton: true });
        //  //  toastr.success('hi', '', { timeOut: 0000, positionClass: 'toast-top-left', extendedTimeOut: 0, closeButton: true })
        //} else {
        //    toastr.error(message, '', options);
        //}
    }
    else if (type == 'errorDialog' && message != undefined && message != '') {
        //toastr.error(message);
        //if (options == undefined) {
        //    toastr.error(message, '', { timeOut: 0, positionClass: 'toast-top-center', extendedTimeOut: 0, closeButton: true });
        //  //  toastr.success('hi', '', { timeOut: 0000, positionClass: 'toast-top-left', extendedTimeOut: 0, closeButton: true })
        //} else {
        //    toastr.error(message, '', options);
        //}
        ShowDialogMessage("Oops!", BootstrapDialog.TYPE_DANGER, message);
    }
}



var myApp;
myApp = myApp || (function () {
    var pleaseWaitDiv = $('<div class="modal bootstrap-dialog type-primary" id="myModal" style="height:100%;overflow:hidden;"><div class="modal-dialog" style="padding-top: 290px;width:100%; height:100%; position: absolute; margin-top:0; text-align:center;"><div class="modal-content" style="background:transparent; box-shadow:none; border:none;"><div class="modal-body" style="padding:0px"><img height="50" src="/assets/images/ajax-loader.gif"/></div></div></div></div>');
    return {
        showPleaseWait: function () {
            $('body').css('height', '100%');
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        }
    };
})();

function ShowDialogMessage(header, type, message) {

    BootstrapDialog.show({
        type: type,
        title: header,
        message: message,
        closable: false,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Ok',
            cssClass: 'btn-custom-error',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }]
    });

    
}

function SelectDeselectAll(array, value) {
    array.forEach(function (item) {
        item.IsSelected(value);
        return;
    });

}

function SetMessageForPageLoad(data, cookieName) {
    $.cookie(cookieName, JSON.stringify(data), { path: '/' });
}

function ShowPageLoadMessage(cookieName) {
    if ($.cookie(cookieName) != null && $.cookie(cookieName) != "null") {
        //ShowMessages($.parseJSON($.cookie(cookieName)));
        toastr.success(($.cookie(cookieName)));
        $.cookie(cookieName, null, { path: '/' });
    }
}


function SetCookie(data, cookieName) {
    $.cookie(cookieName, data, { path: '/' });
}

function GetCookie(cookieName) {
    if ($.cookie(cookieName) != null) {
        var data = $.cookie(cookieName);
        $.cookie(cookieName, null, { path: '/' });
        return data;
    }
}

function ParseJsonDate(jsondate) {
    return (eval((jsondate).replace(/\/Date\((\d+)\)\//gi, "new Date($1)")));
}

function getDisplayDate(jsondate) {
    return moment(eval((jsondate).replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))).format(DateTimeFormat);
}

// code for save scope and location
function Redirect(location, url) {
    location.path(url);
}

function SaveCommonDirectives($scope, $http, $location) {
    
    // code for redirect to page
    $scope.RedirectToPage = function (path) {
        Redirect($location, path);
    };

    $scope.dateOptions = {
        showOtherMonths: true,
        selectOtherMonths: true,
        autoclose: true,
        dateFormat: 'dd/mm/yy'
    };

    $scope.SetPageTitleAndActiveMenu = function (pageTitle, menuId) {
        window.document.title = $scope.PageTitle;
        document.getElementById("menuproduct").className = "dropdown";
        document.getElementById("menucustomer").className = "dropdown";
        document.getElementById("menuorder").className = "dropdown";
        document.getElementById("menuinquiry").className = "dropdown";
        document.getElementById("menuuser").className = "dropdown";

        var d = document.getElementById(menuId);
        d.className = d.className + " active";
    };
    
    $scope.NoRecordsFound = function (recordCount) {
        if(recordCount == "0"){
            $(".norecordfound").css("display", "block");
        }
    };

    $scope.addTemplateForAngu = function($templateCache) {
        $templateCache.removeAll();
        $templateCache.put('/angucomplete-alt/index.html',
            '<div class="angucomplete-holder" ng-class="{\'angucomplete-dropdown-visible\': showDropdown}">' +
                '  <input id="{{id}}_value" name="{{inputName}}" required=""   ng-class="{\'angucomplete-input-not-empty\': notEmpty}" ng-model="searchStr"  spacenotonfirst="" ng-disabled="disableInput" type="{{inputType}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" ng-focus="onFocusHandler()" class="{{inputClass}}" ng-focus="resetHideResults()" ng-blur="hideResults($event)" autocapitalize="off" autocorrect="off" autocomplete="off" ng-change="inputChangeHandler(searchStr)" />' +
                '  <div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-show="showDropdown">' +
                '    <div class="angucomplete-searching" ng-show="searching" ng-bind="textSearching"></div>' +
                '    <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" ng-bind="textNoResults"></div>' +
                '    <div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseenter="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">' +
                '      <div ng-if="imageField" class="angucomplete-image-holder">' +
                '        <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>' +
                '        <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>' +
                '      </div>' +
                '      <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>' +
                '      <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>' +
                '      <div ng-if="matchClass && result.description && result.description != \'\'" class="angucomplete-description" ng-bind-html="result.description"></div>' +
                '      <div ng-if="!matchClass && result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
        );
    };
}



app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive('colorpicker', function () {
    return {
        restrict: "A",
        scope: {
            ngValue: "="
        },
        link: function (scope, element, attrs) {

            element.blur(function () {
                var currentValue = $(this).val();
                $(this).attr("ng-value", currentValue);
            });

            scope.$watch('ngValue', function (value, oldvalue) {
            });

        }
    };
});


