import DB from "../configs/dbConfig.js";
import { CreatePriceListDTO, UpdatePriceListDTO } from "../types/types.js";

export class PriceListService {
  async createPriceList(data: CreatePriceListDTO) {
    const existingPriceList = await DB.priceList.findUnique({
      where: { name: data.name },
    });

    if (existingPriceList) {
      return {
        statusCode: 409,
        message: `PriceList name already exists`,
      };
    }

    const priceList = await DB.priceList.create({
      data: {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        isDefault: data.isDefault,
        startDate: data.startDate,
        endDate: data.endDate,

        priceListItems: {
          create: data.items.map((items) => ({
            productId: items.productId,
            price: items.price,
          })),
        },
      },
      include: { priceListItems: true },
    });

    return {
      statusCode: 200,
      message: "Create priceList successful",
      data: priceList,
    };
  }
}
