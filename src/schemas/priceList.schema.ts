export const priceListTypeDefs = `#graphql
  type PriceListItem {
    id: Int!
    productId: Int!
    price: Float!
  }

  type PriceList {
    id: Int!
    name: String!
    description: String!
    isActive: Boolean!
    isDefault: Boolean!
    startDate: String
    endDate: String
    priceListItems: [PriceListItem]
    createdAt: String
    updatedAt: String
  }

  type PriceListResponse {
    success: Boolean!
    statusCode: Int!
    message: String
    data: PriceList
  }

  type PriceListsListResponse {
    success: Boolean!
    statusCode: Int!
    message: String
    data: [PriceList]
  }

  input PriceListItemInput {
    productId: Int!
    price: Float!
  }

  input CreatePriceListInput {
    name: String!
    description: String!
    isActive: Boolean!
    isDefault: Boolean!
    startDate: String
    endDate: String
    items: [PriceListItemInput!]!
  }

  input UpdatePriceListInput {
    id: Int!
    name: String
    description: String
    isActive: Boolean
    isDefault: Boolean
    startDate: String
    endDate: String
    items: [PriceListItemInput!]
  }

  type Query {
    allPriceLists(page: Int!): PriceListsListResponse!
    availablePriceLists(page: Int!): PriceListsListResponse!
    priceListById(id: Int!): PriceListResponse!
  }

  type Mutation {
    createPriceList(input: CreatePriceListInput!): PriceListResponse!
    updatePriceList(input: UpdatePriceListInput!): PriceListResponse!
    deletePriceList(id: Int!): PriceListResponse!
  }
`;
