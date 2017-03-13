(function () {
    angular.module('queueApp').directive('addCustomer', AddCustomer);


    function AddCustomer($http){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&',
				addCustomer: '&'
            },
            templateUrl:'/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.add = function( customer ){
					if( customer.name ){
						var url = '/api/customer/add';
						var config = {
							headers : {
								'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
							}
						}
						
						$http.post( 
							url, JSON.stringify(customer)
						).success(function (data, status) {
							scope.onAdded()();
						}).error(function (data, status) {
							console.log(data);
						});
					}
                }
            }
        }
    }

})()

