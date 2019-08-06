# Main part of GraphQL
- **schema**: là tập hợp các type của GraphQL
    - 1 số các type gốc:
        - `type Query { ... }`
        - `type Mutation { ... }`
        - `type Subscription { ... }`
    - với type `query, mutation` thì cần định nghĩa schema, nó là endpoint của GraphQL
    ```
    type RootQuery {
      author(id: Int!): Author
    }
      
    schema {
      query: RootQuery
    }
    ```

- **queries/mutations/subscriptions**: cú pháp giống nhau, nếu mặc định k có từ khóa sẽ là **queries**
    - **queries**
        - Có thể nested các query
        - Có thể dùng các argument
        - Có thể sử dụng biến và đặt tên cho query
        - Dùng để lấy dữ liệu
    - **mutations**
        - Dùng để C, U, D dữ liệu
    - **subscriptions**
        - Hiểu như trigger trong SQL
        - Kết nối real-time
- **resolvers**: thực hiện mỗi khi query/mutation được request, thực hiện các nhiệm vụ khó
    - Truy cập một internal REST endpoint
    - Gọi một microservice
    - Truy cập database để CRUD operations

    ```
    const models = sequelize.models;

    RootQuery: {
      user (root, { id }, context) {
        return models.User.findById(id, context);
      },
      users (root, args, context) {
        return models.User.findAll({}, context);
      },
      // Resolvers for Project and Task go here
    },
        
    /* For reminder, our RootQuery type was:
    type RootQuery {
      user(id: ID): User
      users: [User]
     
      # Other queries
    }
    ```
    - Join các models vs nhau dùng nhiều resolvers hơn
    ```
    User: {
      projects (user) {
        return user.getProjects(); // getProjects is a function managed by Sequelize ORM
      }
    },
        
    /* For reminder, our User type was:
    type User {
      projects: [Project] # We defined a resolver above for this field
      # ...other fields
    }
    */
   ```
   - tạo resolvers cho mutation
   ```
       RootMutation: {
      createUser (root, { input }, context) {
        return models.User.create(input, context);    
      },
      updateUser (root, { id, input }, context) {
        return models.User.update(input, { ...context, where: { id } });
      },
      removeUser (root, { id }, context) {
        return models.User.destroy(input, { ...context, where: { id } });
      },
      // ... Resolvers for Project and Task go here
    }
    ```

# Refs
- https://viblo.asia/p/tim-hieu-graphql-phan-4-graphql-with-nodejs-ByEZk9XY5Q0
- https://viblo.asia/p/tim-hieu-graphql-xay-dung-1-graphql-server-voi-prisma-yMnKM17zK7P
- https://github.com/amaurymartiny/graphql-example/blob/master/graphql/resolvers.js
- https://github.com/prisma/graphql-yoga
- https://softchris.github.io/pages/graphql-express.html#parameterized-query
