const db = require(`../../data/db-config`)
const Accounts = require(`./accounts-model`)

//For the PUT request:
//if there is no name in the req.body check if the account exists and get the old name that way
//same as above for budget

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body
  budget = parseInt(budget)
  name = name.trim()

  req.body.budget = budget
  req.body.name = name

  if (!name || !budget) {
    next({
      status: 400,
      message: 'name and budget are required'
    })
  }
  else if (name.length > 100 || name.length < 3) {
    next({
      status: 400,
      message: 'name of account must be between 3 and 100'
    })
  }
  else if (typeof budget !== 'number') {
    next({
      status: 400,
      message: 'budget of account must be a number'
    })
  }
  else if (budget < 0 || budget > 100000000) {
    next({
      status: 400,
      message: 'budget of account is too large or too small'
    })
  }

  return next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const [accountNameExist] = await db('accounts').where('name', req.body.name)

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
  console.log(account)

  if (account.length === 0) {
    next({
      status: 404,
      message: 'account not found'
    })
  }
  return next()
}

