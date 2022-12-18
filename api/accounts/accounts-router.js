const Accounts = require(`./accounts-model`)
const router = require('express').Router()
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require(`./accounts-middleware`)

// getAll,
// getById,
// create,
// updateById,
// deleteById,

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {

})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', [checkAccountNameUnique, checkAccountPayload], async (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
