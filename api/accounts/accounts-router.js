const Accounts = require(`./accounts-model`)
const router = require('express').Router()
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require(`./accounts-middleware`)

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

//This is letting an id that does not exist go through for some reason - need to check why.
router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    res.json(account)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', [checkAccountPayload, checkAccountNameUnique], async (req, res, next) => {
  try {
    const addAcct = await Accounts.create(req.body)
    res.status(201).json(addAcct)
  }
  catch (err) {
    next(err)
  }
})

//Still need to check with Postman or HTTPie
router.put('/:id', [checkAccountId, checkAccountPayload, checkAccountNameUnique], async (req, res, next) => {
  try {
    const updateAcct = await Accounts.updateById(id, req.body)
    res.json(updateAcct)
  }
  catch (err) {
    next(err)
  }
});

// getAll,
//   getById,
//   create,
//   updateById,
//   deleteById,

router.delete('/:id', checkAccountId, (req, res, next) => {

})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
