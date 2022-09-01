'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account = {
  owner: "Leonardo Freitas",
  movements: [455.23, 500_000, -306.5, 130, -642.21, 1600, -50, 200],
  interestRate: 1.2, // %
  pin: 1234,

  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-08-25T14:11:59.604Z",
    "2022-08-28T17:01:17.194Z",
    "2022-08-31T17:36:17.929Z",
    new Date().toISOString(),
  ],
  currency: "BRL",
  locale: "pt-PT", // de-DE
};

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-08-25T14:11:59.604Z",
    "2022-08-28T17:01:17.194Z",
    "2022-08-31T17:36:17.929Z",
    "2022-09-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account, account1, account2, account3, account4];

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
const containeSign = document.querySelector('.sign');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnSign = document.querySelector('.form__btn--sign');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputSignName = document.querySelector('.form__input--name');
const inputSignPin = document.querySelector('.form__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calcDaysPassed = (date1, date2) => {
  return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
};

const formatDate = function (date, locale, onlyDays = false) {
  // Not using API
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  // const hour = `${date.getHours()}`.padStart(2, '0');
  // const minutes = `${date.getMinutes()}`.padStart(2, '0');
  // return  `${day}/${month}/${year}, ${hour}:${minutes}`;

  if (onlyDays) {
    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return `${day}/${month}/${year}`;
  }

    // Using API
    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

  return new Intl.DateTimeFormat(locale, options).format(now);
};

const formatCurrency = function(value, locale, currency) {
  // BRL, USD, EUR
  const options = {
    style: 'currency',
    currency: currency,
    };

  return Intl.NumberFormat(locale, options).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  // slice creates a copy
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const now = new Date(acc.movementsDates[i]);
    const date = formatDate(now, currentAccount.locale, true);

    const formattedMov = formatCurrency(mov, currentAccount.locale, currentAccount.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1}${type}
        </div>
        <div class="movements__date">${date}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

btnSign.addEventListener('click', function(e) {
  e.preventDefault();
  const name = inputSignName.value;
  const pin = Number(inputSignPin.value);

  if (name  && pin) {
    const username = usernameGanerator(name);
    const exist = accounts.some( c => c.username === username);

    if (exist) {
      window.alert('Are there already a user with this username please try another one');
    } else {
      const newAccount = {
        owner: name,
        movements: [-200, 2200],
        interestRate: 1.3,
        pin: pin,
        username: username,
        movementsDates: [
          "2022-08-01T17:36:17.929Z",
          new Date().toISOString(),
        ],
        currency: "BRL",
        locale: "pt-PT",
      };

      accounts.push(newAccount);
      
      window.alert(`Welcome ${name}, you were registered successfully`);
    }
    inputSignName.value = inputSignPin.value = '';
  }
});

const usernameGanerator = name => {
  return name
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
};

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = usernameGanerator(acc.owner);
  });
};

createUsernames(accounts);

const calcBalance = function (acc) {
  // accumulator -> SNOWBALL
  const balance = acc.movements.reduce((acc, cur, i, arr) => acc + cur, 0);
  acc.balance = balance;
  labelBalance.textContent = formatCurrency(balance, currentAccount.locale, currentAccount.currency);
};


const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, currentAccount.locale, currentAccount.currency);

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(Math.abs(out), currentAccount.locale, currentAccount.currency);

  const interest = acc.movements.filter(mov => mov > 1)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(interest, currentAccount.locale, currentAccount.currency);
};


const getAccount = function (username) {
  return accounts.find(acc => acc.username === username);
};

const checkUserCredentials = function (acc, pin) {
  return acc && acc?.pin === pin;
};

const resetTimer = () => {
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
}

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
     // In each call, print the remaining time to UI
     labelTimer.textContent = `${min}:${sec}`;
     
     // When 0 seconds, stop timer log out user
     if (time === 0) {
       clearInterval(timer);
       labelWelcome.textContent = 'Lob in to get started';
       containerApp.style.opacity = 0;
       containeSign.style.display = 'flex';
      }
      time--;
  };

 // Setting time to 5 minutes
 let time = 300;
 // Call timer every second
 tick()
 const timer = setInterval(tick, 1000);
 return timer;
};

// Event handler
let currentAccount, timer;

// Experiment API
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = getAccount(inputLoginUsername.value);

  // if (currentAccount?.pin === Number(inputLoginPin.value)) {
  if (checkUserCredentials(currentAccount, +(inputLoginPin.value))) {
    // Display UI ans welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    // Update current date
    containeSign.style.display = 'none';
    containerApp.style.opacity = 100;

    // day/month/year
    const now = new Date();
    labelDate.textContent = formatDate(now, currentAccount.locale);

    // Clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    resetTimer();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value.toLowerCase());

  inputTransferTo.value = inputTransferAmount.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
  }
  updateUI(currentAccount);

  // Reset the timer
  resetTimer();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
  setTimeout(() => {
       // Add movement
   currentAccount.movements.push(amount);
   // Add loan date
   currentAccount.movementsDates.push(new Date().toISOString());
   // Update UI
   updateUI(currentAccount);
   }, 2500);
  }

  resetTimer();

  inputLoanAmount.value = '';
});


btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const closeAccount = getAccount(inputCloseUsername.value);
  if (checkUserCredentials(closeAccount, +(inputClosePin.value))) {
    // const index = accounts.findIndex(acc => acc.username === closeAccount.username);
    const index = accounts.indexOf(closeAccount);

    // Delete the user
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  };

  inputCloseUsername.value = inputClosePin.value = '';
});

let sort = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  sort = !sort;
  btnSort.textContent = '';
  btnSort.insertAdjacentHTML('afterbegin', sort ? '<span>&uparrow; SORT</span>' : '<span>&downarrow; SORT</span>');
  displayMovements(currentAccount, sort);
});