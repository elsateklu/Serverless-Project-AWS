// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import 'source-map-support/register'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'
// import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { getUserId } from '../utils'
// import { createTodo } from '../../businessLogic/todos'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createToDo } from '../../businessLogic/ToDo'

//export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // TODO: Implement creating a new TODO item
  console.log('Processing Event ', event)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  // TODO: Implement creating a new TODO item
  const toDoItem = await createToDo(newTodo, jwtToken)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: toDoItem
    })
  }
}
// handler.use(
//   cors({
//     credentials: true
//   })
// )
