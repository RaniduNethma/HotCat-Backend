export const tableTypeDefs = `#graphql
  type Table {
    id: Int!
    tableNumber: Int!
    capacity: Int!
    tableType: String!
    tableStatus: String!
    qrCode: String!
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type TableResponse {
    success: Boolean!
    statusCode: Int!
    message: String
    data: Table
  }

  type TablesListResponse {
    success: Boolean!
    statusCode: Int!
    message: String
    data: [Table]
  }

  input CreateTableInput {
    tableNumber: Int!
    capacity: Int!
    tableType: String!
    tableStatus: String!
    qrCode: String!
    isActive: Boolean!
  }

  input UpdateTableInput {
    id: Int!
    tableNumber: Int
    capacity: Int
    tableType: String
    tableStatus: String
    qrCode: String
    isActive: Boolean
  }

  type Query {
    getAllTables(page: Int!): TablesListResponse!
    getAvailableTables(page: Int!): TablesListResponse!
    getTableById(id: Int!): TableResponse!
  }

  type Mutation {
    createTable(input: CreateTableInput!): TableResponse!
    updateTable(input: UpdateTableInput!): TableResponse!
    deleteTable(id: Int!): TableResponse!
  }
`;
