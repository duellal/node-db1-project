const db = require(`../../data/db-config`)

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.params
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
  else if (typeof budget !== 'number') {
    next({
      status: 400,
      message: 'budget of account must be a number'
    })
  }
  else if (budget < 0 || budget > 100000000) {
    next({
      status: 400,
      message: 'buget of account is too large or too small'
    })
  }
  return next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const accountNameExist = await db('account').where('name', req.params.name)

  if (accountNameExist) {
    next({
      status: 400,
      message: 'that name is taken'
    })
  }
  return next()
}

exports.checkAccountId = async (req, res, next) => {
  const account = await db('accounts').where(`id`, req.params.id)

  if (!account) {
    next({
      status: 404,
      message: 'account not found'
    })
  }
  return next()
}

