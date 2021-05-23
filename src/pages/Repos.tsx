import React from 'react'
import { useLocation } from 'react-router'
import { useQuery } from 'urql'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime' 

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
        licenseInfo {
					name,
        },
        forkCount,
      }
    }
  }
}`

dayjs.extend(relativeTime)

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

  console.log('res', data?.user, location.state, dayjs(data?.user?.repositories?.nodes?.[0]?.updatedAt).fromNow() )
  return (
    <div className="bg-white min-h-screen p-4 md:flex md:p-8 md:space-x-8 mx-auto max-w-full md:max-w-screen-xl">
      <div className="flex items-center md:w-3/12 md:flex-col md:items-start">
        <div className="relative w-1/5 md:w-full">
          <div className="rounded-full overflow-hidden">
            <img className="" src={data?.user.avatarUrl}/>
          </div>
          <div className="absolute bottom-12 right-4 h-8 w-8 bg-gray-400 rounded-full hidden md:block"></div>
        </div> {/** IMAGE ENDS HERE  */}
        <div className="flex-col ml-4 md:ml-0 md:mt-4">
          <div className="text-2xl font-bold">{data?.user.name}</div>
          <div className="text-l text-gray-500">{data?.user.login}</div>
          <div className="text-l text-gray-500">{data?.user.bio}</div>
        </div>
      </div> {/** LEFT SIDE ENDS HERE */}
      <div className="md:w-9/12">
        {data?.user.repositories.nodes.map(repo => (
          <div key={repo.id} className="border-b pt-6 pb-3">
            <div className="flex flex-row justify-between mb-4 ">
              <div>
                <a href="#" className="text-blue-600 font-bold text-xl hover:underline"> {repo?.name} </a>
                <div className="text-sm text-gray-600 mt-1 max-w-prose">{repo?.description}</div>
              </div>
              <button className="px-4 py-1 bg-gray-100 text-sm font-medium self-center rounded-lg border">{repo.viewerHasStarred ? 'Unstar' : 'Star'}</button>
            </div>
            <div className="flex flex-row space-x-3 text-xs text-gray-700">
              { repo?.primaryLanguage && 
                <div className="flex flex-row items-center">
                  <div className="h-3 w-3 rounded-xl mr-0.5" style={{backgroundColor: repo?.primaryLanguage?.color}}></div>
                  <div>{repo?.primaryLanguage?.name}</div>
                </div>
              }
              { repo?.forkCount !== 0 &&
                <div>{repo?.forkCount}</div>
              }
              { repo?.licenseInfo &&
                <div>{repo?.licenseInfo?.name}</div>

              }
              <div>{`Updated ${dayjs(repo?.updatedAt).fromNow()}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
