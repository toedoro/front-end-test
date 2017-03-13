(function () {
    angular.module('queueApp').directive('customer', Customer);

	 /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
    function Customer($http){
        return {
            restrict: 'E',
            scope:{
                customer: '=',
                onRemoved: '&',
                onServed: '&'
            },
            templateUrl: '/customer/customer.html',
            link: function(scope){

                // calculate how long the customer has queued for
                scope.customer.queuedTime = new Date() - new Date(scope.customer.joinedTime);

                scope.remove = function(){
                    $http({
                        method: 'DELETE',
                        url: '/api/customer/remove',
                        params: {id: scope.customer.id}
                    }).then(function(res){
                        scope.onRemoved()()
                    })
                };
				
				scope.serve = function( customer ){
					var url = '/api/customer/serve';
					var config = {
						headers : {
							'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
						}
					}
					
                    $http.post( 
						url, JSON.stringify(customer)
					).success(function (data, status) {
						scope.onServed()();
					}).error(function (data, status) {
						console.log(data);
					});
                };
				
            }
        }
    }

})()

