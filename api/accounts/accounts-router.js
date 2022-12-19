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

//Name + Budget are required, even if you only want to change one
// // you have to put in a different name than the old one to change the data for that id - even if you don't want to
router.put('/:id', [checkAccountId, checkAccountPayload, checkAccountNameUnique], async (req, res, next) => {
  try {
    const updateAcct = await Accounts.updateById(req.params.id, req.body)
    res.json(updateAcct)
  }
  catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.deleteById(req.params.id)
    res.json(account)
  }
  catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
