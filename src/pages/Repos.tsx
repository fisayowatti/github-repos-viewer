import React from 'react'
import { useLocation } from 'react-router'
import { useQuery } from 'urql'

const ReposQuery = `query($username:String!) { 
  user(login: $username) {
    id,
    avatarUrl,
    name,
    login,
    bio,
    repositories(first: 20) {
      nodes {
        id,
        name,
        description,
        primaryLanguage {
          name,
          color,
        },
        viewerHasStarred,
        updatedAt,
      }
    }
  }
}`

export default function Repos() {

  interface LocationType {
    state: {
      username: string;
    }
  }

  const location: LocationType = useLocation();
  
  const [result] = useQuery(({
    query: ReposQuery,
    variables: { username: location?.state?.username }
  }))

  const {data, fetching, error} = result;


  console.log('res', data?.user, location.state )
  return (
    <div className="bg-white min-h-screen flex flex-row p-8">
      <div className="w-3/12">
        <div className="relative">
          <div className="rounded-full overflow-hidden">
            <img className="w-full" src={data?.user.avatarUrl}/>
          </div>
          <div className="absolute bottom-12 right-4 h-8 w-8 bg-gray-400 rounded-full"></div>
        </div> {/** IMAGE ENDS HERE  */}
        <div className="text-3xl font-bold">{data?.user.name}</div>
        <div className="text-l text-gray-500">{data?.user.login}</div>
        <div className="text-l text-gray-500">{data?.user.bio}</div>
      </div> {/** LEFT SIDE ENDS HERE */}
      <div>
        {data?.user.repositories.nodes.map(repo => (
          <div key={repo.id} className="border">
            <div className="flex flex-row justify-between">
              <div>
                <a href="#"> {repo?.name} </a>
                <div>{repo?.description}</div>
              </div>
              <button className="">Star</button>
            </div>
            <div className="flex flex-row space-x-3">
              { repo?.primaryLanguage && 
                <div className="flex flex-row items-center">
                  <div className="h-3 w-3 rounded-xl" style={{backgroundColor: repo?.primaryLanguage?.color}}></div>
                  <div>{repo?.primaryLanguage?.name}</div>
                </div>
              }
              <div>{repo.updatedAt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
