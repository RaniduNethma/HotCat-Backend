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
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,

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

  async allPriceLists(page: number) {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

    const allPriceLists = await DB.priceList.findMany({
      take: limit,
      skip,
      include: { priceListItems: true },
    });

    return {
      statusCode: 200,
      data: allPriceLists,
    };
  }

  async availablePriceLists(page: number) {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

    const availablePriceLists = await DB.priceList.findMany({
      take: limit,
      skip,
      where: { isActive: true },
      include: { priceListItems: true },
    });

    return {
      statusCode: 200,
      data: availablePriceLists,
    };
  }

  async priceListById(id: number) {
    const priceListById = await DB.priceList.findUnique({
      where: { id: id },
      include: { priceListItems: {} },
    });

    if (!priceListById) {
      return {
        statusCode: 404,
        message: `PriceList with id ${id} not found`,
      };
    }

    return {
      statusCode: 200,
      data: priceListById,
    };
  }

  async updatePriceList(data: UpdatePriceListDTO) {
    const existingPriceList = await DB.priceList.findUnique({
      where: { id: data.id },
    });

    if (!existingPriceList) {
      return {
        statusCode: 404,
        message: `PriceList with id ${data.id} not found`,
      };
    }

    const updatedPriceList = await DB.priceList.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        isDefault: data.isDefault,
        startDate: data.startDate,
        endDate: data.endDate,
        priceListItems: {
          deleteMany: {},
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
      message: "PriceList data updated successfully",
      data: updatedPriceList,
    };
  }
}
