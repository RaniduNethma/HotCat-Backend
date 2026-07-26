export const categoryTypeDefs = `#graphql

    # Category database schema
    type Category {
        id: Int!
        name: String!
        description: String!
        imageUrl: String
        sortOrder: Int!
        isActive: Boolean!
        createdAt: String
        updatedAt: String
    }

    # one Category response from service
    type CategoryResponse {
        success: Boolean!
        statusCode: Int!
        message: String
        data: Category
    }

    # many Category response from service
    type CategoriesListResponse {
        success: Boolean!
        statusCode: Int!
        message: String
        data: [Category]
    }

    # Request DTO for Create Category
    input CreateCategoryInput {
        name: String!
        description: String!
        imageUrl: String
        sortOrder: Int
        isActive: Boolean
    }

    # Request DTO for Update Category
    input UpdateCategoryInput {
        id: Int!
        name: String
        description: String
        imageUrl: String
        sortOrder: Int
        isActive: Boolean
    }

    # GET Queries
    type Query {
        getCategoryById(id: Int!): CategoryResponse!
        getAllCategories(page: Int!): CategoriesListResponse!
    }

    # POST, PUT, Delete Mutations
    type Mutation {
        createCategory(input: CreateCategoryInput!): CategoryResponse!
        updateCategory(input: UpdateCategoryInput!): CategoryResponse!
        deleteCategory(id: Int!): CategoryResponse!
    }
`;
