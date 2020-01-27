const { GraphQLServer } = require('graphql-yoga')
const todos = require('./todos');


const typeDefs = `
  type Todo {
      id: ID!
      title: String!
      completed: Boolean!
  }

  type Query {
      allTodos: [Todo!]!
  }

  type Mutation {
    createTodo(title: String!, completed: Boolean!): Todo!
    updateTodo(id: ID!, completed: Boolean): Todo!
    deleteTodo(id: ID!): Todo!
  }
`

const resolvers = {
  
    Query: {
        allTodos:() => todos
    },   
    Mutation: {
      createTodo: (_, {title, completed, }) => { 
        const todo ={
          id: Math.floor(Math.random() * 1000),
          title,
          completed
        }
        todos.push(todo);
        return todo;
      },

      updateTodo: (_, {id, completed}) => {
        const todo = todos.find(todo => todo.id == id)
        todo.completed = completed
        return todo
      },

      deleteTodo: (_, {id}) => {
        const todoIndex = todos.findIndex(todo => todo.id == id)
        const todo = todos[todoIndex];
        todos.splice(todoIndex,1);
        return todo;
      }
    } 
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))