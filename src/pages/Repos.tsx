import React from 'react'
import { useQuery } from 'urql'

const ReposQuery = `query($username:String!) { 
  user(login: $username) {
    repositories(first: 20) {
      nodes {
        id,
        name,
        description,
        languages(first: 3) {
          nodes{
            name,
            color,
          },
        },
        viewerHasStarred
        
      }
    }
  }
}`

export default function Repos() {
  
  const [result] = useQuery(({
    query: ReposQuery,
    variables: { username: 'fisayowatti' }
  }))
  console.log('res', result)
  return (
    <div>
      This is repos
    </div>
  )
}
