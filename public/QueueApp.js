(function () {

    angular.module('queueApp', []).controller('queueCtrl', queueCtrl);

    /**
     * Bonus points - manipulating the without waiting for the
     * server request
     */
    function queueCtrl($scope, $http) {

        $scope.customers = [];
        $scope.customersServed = [];
        _getCustomers();
        _getServedCustomers();

        $scope.onCustomerAdded = function(){
			console.log('onCustomerAdded');
            _getCustomers();
        }

        $scope.onCustomerRemoved = function(){
			console.log('onCustomerRemoved');
            _getCustomers();
        }
		
        $scope.onCustomerServed = function(){
			console.log('onCustomerServed');
            _getCustomers();
            _getServedCustomers()
        }

        function _getServedCustomers(){
            return $http.get('/api/customers/served').then(function(res){
                $scope.customersServed = res.data;
            });
        }

        function _getCustomers(){
            return $http.get('/api/customers').then(function(res){
                $scope.customers = res.data;
            });
        }
    }


})()

