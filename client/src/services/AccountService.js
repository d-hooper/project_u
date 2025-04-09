import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  // TODO favoriteMeal model to send the right payload!
  async addFoodToFavorites(food) {
    const response = await api.post(`account/meal`, food)
  }
}

export const accountService = new AccountService()
