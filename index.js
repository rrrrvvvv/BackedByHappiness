// these variables refer to the dom elements that need to be updated as the simulation runs, they are not form elements
const counterDiv = document.getElementById('timer-value')
const formParameters = document.getElementById('parameters')
const currentMonthlySpending = document.getElementById('current-monthly-spending')
const totalMonthlySpending = document.getElementById('total-monthly-spending')
const initialUserSpending = document.getElementById('initial-user-spending')
const currentInitialUsers = document.getElementById('current-initial-users')
const currentTotalUsers = document.getElementById('current-total-users')
const currentGrowthRate = document.getElementById('current-growth-rate')
const currentTotalSpending = document.getElementById('current-user-spending')
//for storing and calculations
let counterValue
let delay
let timeoutId
let monthlySpending
let initialUsers
let totalUsers
let growthRate
let totalSpending

function startSimulation () {
  clock(true)
}

function stopSimulation () {
  clock(false)
}

function increaseSpeed () {
  clock('increase')
}

function decreaseSpeed () {
  clock('decrease')
}

function resetSimulation () {
  clock('reset')
  totalMonthlySpending.innerHTML = 0
}

function setCounterValue () {
  counterDiv.innerHTML = counterValue
}

function setMonthlySpending () {
  monthlySpending = parseInt(formParameters.elements['monthly-spending'].value)
  return monthlySpending
}

function setInitialUsers () {
  initialUsers = parseInt(formParameters.elements['initial-users'].value)
  return initialUsers
}

function setGrowthRate () {
  growthRate = parseInt(formParameters.elements['user-growth-rate'].value)
  return growthRate
}

function initialize () {
  delay = 5000
  counterValue = 0
  monthlySpending = 0
  totalUsers = initialUsers
}

function step () {
  clearTimeout(timeoutId)
  setCounterValue()
  updateSimulation()
  counterValue++
  timeoutId = setTimeout(step, delay)
}

function calculateInitialUserSpending () {
  let initialUserSpending = monthlySpending * counterValue * initialUsers
  return initialUserSpending
}

function calculateTotalUsers () {
  if (counterValue > 0) {
    let realGrowthRate = 1 + growthRate / 100
    let totalGrowth = initialUsers * realGrowthRate ** counterValue
    totalUsers = Math.round(totalGrowth)
  } 
  else {
    totalUsers = initialUsers
  }
  return totalUsers
}

function calculateTotalSpending () {
  if (counterValue > 0) {
    
  }
  else {
    totalSpending = calculateInitialUserSpending()
  }
  return totalSpending
}

function clock (counting) {
  switch (counting) {
    case true:
      step()
      break
    case false:
      clearTimeout(timeoutId)
      break
    case 'increase':
      delay /= 1.5
      step()
      break
    case 'decrease':
      delay *= 1.33
      step()
      break
    case 'reset':
      initialize()
      setCounterValue()
      clock(false)
      break
  }
}

function setSimulation () {
  currentMonthlySpending.innerHTML = setMonthlySpending()
  currentInitialUsers.innerHTML = setInitialUsers()
  currentGrowthRate.innerHTML = setGrowthRate()
  return false
}

function updateSimulation () {
  totalMonthlySpending.innerHTML = monthlySpending * counterValue
  initialUserSpending.innerHTML = calculateInitialUserSpending()
  currentTotalUsers.innerHTML = calculateTotalUsers()
  currentTotalSpending.innerHTML = calculateTotalSpending()
}

initialize()
setCounterValue()
