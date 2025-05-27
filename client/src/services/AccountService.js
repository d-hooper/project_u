import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class AccountService {
  async editAccount(accountData) {
    try {
      if (accountData.profileImage == '') {
        const response = await api.put('/account', { calorieGoal: accountData.calorieGoal })
        const newAccount = new Account(response.data)
        AppState.account = newAccount
      }
      if (accountData.calorieGoal == 0) {
        const response = await api.put('/account', { picture: accountData.profileImage })
        const newAccount = new Account(response.data)
        AppState.account = newAccount
      }
      const response = await api.put('/account', { picture: accountData.profileImage, calorieGoal: accountData.calorieGoal })
      logger.log('here is your new account', response.data)
      const newAccount = new Account(response.data)
      AppState.account = newAccount
    }
    catch (error) {
      logger.error(error)
    }
  }
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }


}

export const accountService = new AccountService()
