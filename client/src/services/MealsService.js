import { logger } from "@/utils/Logger.js"
import { spoonacularApi } from "./AxiosService.js"




class MealsService {
  async getFoodItemsByQuery(searchQuery) {
    const response = await spoonacularApi.get(`food/ingredients/search?query=${searchQuery}`)
    logger.log(response.data)
  }

}

export const mealsService = new MealsService()