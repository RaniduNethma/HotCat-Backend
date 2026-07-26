export const authTypeDefs = `#graphql
    type User {
        id: Int!
        userName: String!
        name: String!
        phone: String!
        email: String
        dateOfBirth: String
        userRole: String!
        profileType: String!
        address: String
        city: String
        isActive: Boolean!
        createdAt: String
        updatedAt: String
    }

    type AuthTokens {
        accessToken: String!
        refreshToken: String!
    }

    type AuthData {
        user: User!
        tokens: AuthTokens!
    }

    # Login and Refresh Token ResponseDTO
    type AuthResponse {
        success: Boolean!
        statusCode: Int!
        message: String
        data: AuthData
    }

    # Register, Profile and Logout ResponseDTO
    type UserResponse {
        success: Boolean!
        statusCode: Int!
        message: String
        data: User
    }

    type SimpleResponse {
        success: Boolean!
        statusCode: Int!
        message: String
    }

    input RegisterInput {
        userName: String!
        name: String!
        phone: String!
        email: String
        dateOfBirth: String
        userRole: String!
        password: String!
        profileType: String!
        address: String
        city: String
        priceListId: Int
    }

    input LoginInput {
        userName: String!
        password: String!
    }

    type Query {
        getProfile: UserResponse!
    }

    type Mutation {
        register(input: RegisterInput!): UserResponse!
        login(input: LoginInput!): AuthResponse!
        refreshToken(token: String!): AuthResponse!
        logout: SimpleResponse!
    }
`;
