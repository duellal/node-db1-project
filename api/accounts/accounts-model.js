const db = require(`../../data/db-config`)

const getAll = async () => {
  const allAccounts = await db('accounts')
  return allAccounts
}

const getById = async id => {
  const account = await db('accounts').where('id', id).first()
  return account
}

const create = async account => {
  const [accountId] = await db('accounts').insert(account)
  const createdAcct = await getById(accountId)
  return createdAcct
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id)
  const updatedAcct = await getById(id)
  return updatedAcct
}

const deleteById = async id => {
  const deletedAcct = await getById(id)
  await db('accounts').del().where('id', id)
  return deletedAcct
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
