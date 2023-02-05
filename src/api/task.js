import {  gql } from '@apollo/client'

export const fetchAllData = gql`
query GetTasks {
    getAllTask {
      title
      status
      _id
      time
      createdAt
      updatedAt
    }
  }
`

export const addTask = gql`
mutation Mutation($title: String!, $time: String!) {
  addTask(title: $title, time: $time) {
    title
    status
    _id
    time
    createdAt
    updatedAt
  }
}
`
export const editTask = gql`
 

mutation Mutation($editTaskId: ID!, $data: TaskMutation) {
  editTask(id: $editTaskId, data: $data) {
    title
    status
    _id
    time
    createdAt
    updatedAt
  }
}
`

export const deleteTask = gql`
mutation Mutation($deleteTaskId: ID!) {
  deleteTask(id: $deleteTaskId)
}
`