import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService.js'
import BaseController from '../utils/BaseController.js'
import { daysService } from '../services/DaysService.js'
import { mealsService } from '../services/MealsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/days', this.getDaysByAccountId)

  }


  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getDaysByAccountId(req, res, next) {
    try {
      const userId = req.userInfo.id
      const days = await daysService.getDaysByAccountId(userId)
      res.send(days)
    } catch (error) {
      next(error)
    }
  }


}
