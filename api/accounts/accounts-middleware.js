const db = require(`../../data/db-config`)
const Accounts = require(`./accounts-model`)


//For the PUT request:
//if there is no name in the req.body check if the account exists and get the old name that way
//same as above for budget

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body
  budgetNum = parseInt(budget)

  if (!name || !budget) {
    next({
      status: 400,
      message: 'name and budget are required'
    })
  }
  else if (name.trim().length > 100 || name.trim().length < 3) {
    next({
      status: 400,
      message: 'name of account must be between 3 and 100'
    })
  }
  else if (budget === NaN || typeof budgetNum !== 'number') {
    next({
      status: 400,
      message: 'budget of account must be a number'
    })
  }
  else if (budgetNum < 0 || budgetNum > 100000000) {
    next({
      status: 400,
      message: 'budget of account is too large or too small'
    })
  }

  req.body.budget = budgetNum
  req.body.name = name.trim()

  return next()
}

//Commented out code below was trying to fix the error of the PUT request where it has to have both the new name and new budget in order to edit the data, instead of just one or the other and then using the old name or budget to fill in the other requirement of the data
exports.checkAccountNameUnique = async (req, res, next) => {
  // const { name, budget } = req.body
  // console.log(`Middleware req.body:`, req.body)
  const [accountNameExist] = await db('accounts').where('name', req.body.name)
  // const account = await Accounts.updateById(req.params.id, req.body)
  // const oldAcct = account.oldAcct

  // if (oldAcct) {
  //   const oldName = oldAcct.name
  //   const oldBudget = oldAcct.budget
  //   // console.log(`Middleware oldName:`, oldName)
  //   // console.log(`Middleware oldBudget:`, oldBudget)

  //   if (!name || oldName || name === undefined && budget) {
  //     console.log(`Middleware:`, { name: oldName, budget: oldBudget })
  //     return { name: oldName, budget: budget }
  //   }
  //   else if (!budget || oldBudget || budget === undefined && name) {
  //     return { name: name, budget: oldBudget }
  //   }
  //   else { return { name: oldName, budget: oldBudget } }
  // }
  if (accountNameExist) {
    next({
      status: 400,
      message: 'that name is taken'
    })
  }
  return next()
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Accounts.getById(req.params.id)

  if (!account) {
    next({
      status: 404,
      message: 'account not found'
    })
  }
  return next()
}

