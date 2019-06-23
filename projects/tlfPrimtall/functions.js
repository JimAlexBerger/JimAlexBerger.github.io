var getFactors = number => {
  for(var i = 2; i <= number; i++){
    if(number % i === 0) return [i].concat(getFactors(number / i));
  }
  return [];
}

var speedTest = number => {
  var time = performance.now();
  getFactors(number);
  return performance.now() - time;
}

var isPrime = number => {
  for(var i = 2; i < number; i++){
    if(number % i === 0) return false;
  }
  return true;
}

function display(n) {
    var arr = [2];
    for ( var i = 3; i < n; i+=2 ) {
        if ( isPrime(i) ) {
            arr.push(i);
        }
    }
    return arr;
}
