export const productTypeDefs = `#graphql
    type Product {
        id: Int!
        name: String!
        description: String
        imageUrl: String
        sortOrder: Int!
        isActive: Boolean!
        stock: Int!
        categoryId: Int!
        category: Category
        createdAt: String
        updatedAt: String
    }

    type ProductResponse {
        success: Boolean!
        statusCode: Int!
        message: String
        data: Product
    }

    type ProductsListResponse {
        success: Boolean!
        statusCode: Int!
        message: String
        data: [Product]
    }

    input CreateProductInput {
        name: String!
        description: String
        imageUrl: String
        sortOrder: Int!
        isActive: Boolean!
        stock: Int!
        categoryId: Int!
    }

    input UpdateProductInput {
        id: Int!
        name: String
        description: String
        imageUrl: String
        sortOrder: Int
        isActive: Boolean
        stock: Int
        categoryId: Int
    }

    type Query {
        getProducts(page: Int!): ProductsListResponse!
        availableProducts(page: Int!): ProductsListResponse!
        productById(id: Int!): ProductResponse!
    }

    type Mutation {
        createProduct(input: CreateProductInput!): ProductResponse!
        updateProduct(input: UpdateProductInput!): ProductResponse!
        deleteProduct(id: Int!): ProductResponse!
    }
`;
