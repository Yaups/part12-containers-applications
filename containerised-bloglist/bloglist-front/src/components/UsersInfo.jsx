import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersInfo = () => {
  const users = useSelector(({ users }) => users)
  const [usersInfo, setUsersInfo] = useState([])

  useEffect(() => {
    if (!users) return

    const namesAndNumbers = []

    users.forEach((entry) => {
      namesAndNumbers.push({
        id: entry.id,
        name: entry.name,
        numberOfBlogs: entry.blogs.length,
      })
    })

    const sortedUserInfo = namesAndNumbers.toSorted(
      (a, b) => b.numberOfBlogs - a.numberOfBlogs,
    )

    setUsersInfo([...sortedUserInfo])
  }, [users])

  return (
    <div>
      <h2 className="title">Users</h2>
      <table className="table is-striped">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Number of blogs</th>
          </tr>
          {usersInfo.map((entry) => (
            <tr key={entry.id}>
              <td>
                <Link to={`/users/${entry.id}`}>{entry.name}</Link>
              </td>
              <td>{entry.numberOfBlogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersInfo
