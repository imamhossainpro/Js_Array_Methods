//Select Html Elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleMoneyBtn = document.getElementById('double_money');
const showMillionaiesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('caltulate_wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fatching Data From 'Random User API'
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.round(Math.random() * 1000000)
    
    };
    addData(newUser);
};

//Double Money
function doubleMoney (){
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })
    updateDom();
};
//Sort Money
function sortMoney (){
    data.sort((a, b) => b.money - a.money)
    updateDom();
};
//Filter Millionaire 
function filterMillionaire (){
    data = data.filter(user =>  user.money > 1000000)
    updateDom();
};

//Calculate Welth using Reduce 
function calculateWealth(){
    const Wealth = data.reduce((acc, user) => (acc + user.money), 0);
    const wealthElem = document.createElement('div');
    wealthElem.innerHTML = `<h3><strong>Total Wealth:</strong>${formatMoney(Wealth)}</h3>`;
    main.appendChild(wealthElem);
}

// Add Data
function addData (obj) {
    data.push(obj)
    updateDom();
};

//Update Dom
function updateDom (providedData = data){
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong> ${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element);
    })
};

function formatMoney(number){
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 

};
// Event Lisener 
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortMoney);
showMillionaiesBtn.addEventListener('click', filterMillionaire);
calculateWealthBtn.addEventListener('click', calculateWealth)