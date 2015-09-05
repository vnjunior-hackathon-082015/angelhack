/**
 * Created by s727223 on 05/09/2015.
 */

angular.module('inceptionApp')
  .filter('filterPrivacy', function() {
  return function(items, ownerId, loginInfoId) {
    var filtered = [];
    angular.forEach(items, function(item){
      if (item.privacy == 'onlyme' && ownerId == loginInfoId || item.privacy == 'public'){
        filtered.push(item);
      }
    });
    return filtered;
  };
})
