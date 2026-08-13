export const orderTypeDefs = `#graphql
  type OrderItem {
    id: Int!
    productId: Int!
    Quantity: Int!
    unitPrice: Float!
    subTotal: Float!
    orderStatus: String
  }

  type Order {
    id: Int!
    userId: Int
    tableId: Int
    assignedToId: Int
    orderStatus: String!
    orderType: String!
    subTotal: Float!
    discount: Float
    totalAmount: Float!
    paymentStatus: String!
    paymentMethod: String
    completedAt: String
    orderItems: [OrderItem]  # Order එක අස්සෙන් Items ටික ගන්න පුළුවන්
    createdAt: String
    updatedAt: String
  }

  type OrderResponse {
    success: Boolean!
    statusCode: Int!
    message: String
    data: Order
  }

  type OrdersListResponse {
    success: Boolean!
    statusCode: Int!
    message: String
    data: [Order]
  }

  input OrderItemInput {
    productId: Int!
    Quantity: Int!
    orderStatus: String!
  }

  input CreateOrderInput {
    userId: Int
    tableId: Int
    assignedToId: Int
    orderStatus: String!
    orderType: String!
    discount: Float
    paymentStatus: String!
    paymentMethod: String
    completedAt: String
    orderItems: [OrderItemInput!]!
  }

  type Query {
    getAllOrders(page: Int!): OrdersListResponse!
    getOrderById(id: Int!): OrderResponse!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): OrderResponse!
    deleteOrder(id: Int!): OrderResponse!
  }

  type Subscription {
    orderCreated: OrderResponse!
  }
`;
