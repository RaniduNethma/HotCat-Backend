import { Decimal } from "@prisma/client/runtime/client";
import DB from "../configs/dbConfig.js";
import { CreateOrderDTO } from "../types/types.js";

export class OrderService {
  async createOrder(data: CreateOrderDTO) {
    const existingUser = await DB.user.findUnique({
      where: { id: data.userId },
    });

    if (!existingUser) {
      return {
        success: false,
        statusCode: 404,
        message: `User with id ${data.userId} not found`,
        data: null,
      };
    }

    if (!data.items || data.items.length === 0) {
      return {
        success: false,
        statusCode: 400,
        message: "Order must contain at least one item",
        data: null,
      };
    }

    if (data.orderType === "DINE_IN" && !data.tableId) {
      return {
        success: false,
        statusCode: 400,
        message: "DINE_IN orders must have a table assigned",
        data: null,
      };
    }

    const table = await DB.table.findUnique({
      where: { id: data.tableId },
    });

    if (!table) {
      return {
        success: false,
        statusCode: 404,
        message: `Table with id ${data.tableId} not found`,
        data: null,
      };
    }

    const productIds = data.items.map((item) => item.productId);

    const [products, activePriceLists] = await Promise.all([
      DB.product.findMany({
        where: {
          id: { in: productIds },
          isActive: true,
        },
      }),

      DB.priceList.findFirst({
        where: { isActive: true },
        include: {
          priceListItems: {
            where: {
              productId: { in: productIds },
            },
          },
        },
      }),
    ]);

    if (products.length !== productIds.length) {
      const foundIds = products.map((p) => p.id);
      const missingIds = productIds.filter((id) => !foundIds.includes(id));
      return {
        success: false,
        statusCode: 404,
        message: `Products not found or inactive: ${missingIds.join(", ")}`,
        data: null,
      };
    }

    const priceMap = new Map(
      activePriceLists?.priceListItems?.map((item) => [
        item.productId,
        Number(item.price),
      ]) || [],
    );

    const productsWithoutPrice = productIds.filter((id) => !priceMap.has(id));
    if (productsWithoutPrice.length > 0) {
      return {
        success: false,
        statusCode: 404,
        message: `Products without price in active price list: ${productsWithoutPrice.join(", ")}`,
        data: null,
      };
    }

    let subTotal = 0;
    const orderItemsData = data.items.map((item) => {
      const unitPrice = priceMap.get(item.productId)!;
      const itemSubTotal = unitPrice * item.Quantity;

      subTotal += itemSubTotal;

      return {
        productId: item.productId,
        Quantity: item.Quantity,
        unitPrice: unitPrice,
        subTotal: subTotal,
      };
    });

    const discountAmount = data.discount || 0;
    const totalAmount = subTotal - Number(discountAmount);

    if (totalAmount < 0) {
      return {
        success: false,
        statusCode: 400,
        message: "Discount cannot exceed subtotal",
        data: null,
      };
    }

    const order = await DB.order.create({
      data: {
        userId: data.userId,
        tableId: data.tableId,
        assignedToId: data.assignedToId,
        orderStatus: data.orderStatus,
        orderType: data.orderType,
        subTotal: subTotal,
        discount: discountAmount,
        totalAmount: totalAmount,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
        completedAt: data.completedAt,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: {},
      },
    });

    return {
      success: true,
      statusCode: 201,
      message: "Order created successfully",
      data: order,
    };
  }

  async getAllOrders(page: number) {
    const limit: number = 10;
    const skip: number = page > 1 ? (page - 1) * limit : 0;

    const allOrders = await DB.order.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      skip,
    });

    return {
      success: true,
      statusCode: 200,
      message: null,
      data: allOrders,
    };
  }

  async getOrderById(id: number) {
    const order = await DB.order.findUnique({
      where: { id: id },
    });

    if (!order) {
      return {
        success: false,
        statusCode: 404,
        message: `Order with id ${id} not found`,
        data: null,
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: null,
      data: order,
    };
  }
}
