
controllers.countryController = function ($scope, $http, $location) {
    $scope.CurrencyURL = "/Country/GetCountry";

    $scope.GetCurrency = function () {
        debugger;
        $("#btnSubmit").attr("disabled", "disabled");
        var jsonData = angular.toJson($scope.GetCurrencyModel);
        AngularAjaxCall($http, $scope.CurrencyURL, jsonData, "POST", "json", "application/json").
                success(function (response) {
                    ShowMessages(response);
                    if (response.IsSuccess) {
                        debugger;
                        $scope.GetCurrencyModel = response;
                        $("#btnSubmit").removeAttr("disabled");
                    } else {
                        $("#btnSubmit").removeAttr("disabled");
                    }
                });
    };
};
