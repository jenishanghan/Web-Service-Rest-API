controllers.calcController = function ($scope, $http, $location) {
    $scope.ResultURL = "/Calc/GetResult";

    $scope.GetResult = function () {
        $("#btnSubmit").attr("disabled", "disabled");
        var jsonData = angular.toJson($scope.GetResultModel);
            AngularAjaxCall($http, $scope.ResultURL, jsonData, "POST", "json", "application/json").
                success(function (response) {
                    ShowMessages(response);
                    if (response.IsSuccess) {
                        $scope.GetResultModel = response;
                        $("#btnSubmit").removeAttr("disabled");
                    } else {
                        $("#btnSubmit").removeAttr("disabled");
                    }
                });
    };
};
