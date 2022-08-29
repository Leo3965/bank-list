'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1}${type}
        </div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });

};
createUsernames(accounts);

const calcBalance = function (movements) {
  // accumulator -> SNOWBALL
  return movements.reduce((acc, cur, i, arr) => acc + cur, 0);
};

const balance = calcBalance(account1.movements);
labelBalance.textContent = `${balance} €`;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd)

const movementsDescriptions = movements.map((mov, i) =>
  `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);


const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);

const max = movements.reduce((acc, mov) => {
  if (mov > acc) acc = mov
  return acc
}, movements[0])

console.log(max)

/////////////////////////////////////////////////
/*
// SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['a', 'b', 'c', 'd', 'e'];
const arr3 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// SHALOW COPY
console.log(arr.slice());
console.log([...arr]);

// SPLICE
console.log(arr.slice(2));
console.log(arr);

// REVERSE
console.log(arr3.reverse());

// CONCAT
const letters = arr2.concat(arr3);
console.log(letters);
console.log([...arr2, ...arr3]);

// JOIN
console.log(letters.join( ' - '));

// AT
console.log(arr[0]);
console.log(arr.at(0));
console.log(arr.at(-1));

// GETTING LAST ELEMENT
console.log(arr[arr.length -1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
*/


//for (const movement of movements) {
// for (const [index, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1} You deposited ${Math.abs(movement)}`);
//   } else {
//     console.log(`Movement ${index + 1} You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log(' --------------- FOREACH --------------- ')
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1} You deposited ${Math.abs(movement)}`);
//   } else {
//     console.log(`Movement ${index + 1} You withdrew ${Math.abs(movement)}`);
//   }
// });