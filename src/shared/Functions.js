// Is the number a prime?
const isPrime = num => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

// Build an array of prime numbers
const getPrimeList = n => {
  let arr = [2];
  for (let i = 3; i < n; i = i + 2) {
    if (isPrime(i)) {
      arr.push(i);
    }
  }
  return arr;
};

module.exports = {
  isPrime,
  getPrimeList
};
