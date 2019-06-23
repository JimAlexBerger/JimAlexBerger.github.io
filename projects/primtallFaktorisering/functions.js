function getFactors(number){
  for(var i = 2; i <= number; i++){
    if(number % i === 0) return [i].concat(getFactors(number / i));
  }
  return [];
}

function speedTest(number){
  var time = performance.now();
  getFactors(number);
  return performance.now() - time;
}
