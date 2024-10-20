import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filter, setFilter] = useState(""); // state to handle the filter
  const [sortBy, setSortBy] = useState("name"); // state to handle the sort
  // users: name of the state
  // setUsers: name of the function to set the state

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const response = await fetch("https://react-user-crud-app-default-rtdb.firebaseio.com/users.json");
    const data = await response.json();
    console.log(data);

    // Transform the data object into an array
    const usersData = Object.keys(data).map(key => {
      return {
        id: key,
        ...data[key]
      };
    });
    console.log(usersData);

    setUsers(usersData);
  }

  // Search, filter and sort the users array
  let filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const titles = [...new Set(users.map(user => user.title))]; // get all the unique titles from the users array

  if (filter != "") {
    filteredUsers = filteredUsers.filter(user => user.title === filter); // filter the users array by the selected title
  }

  filteredUsers.sort((user1, user2) => user1[sortBy].localeCompare(user2[sortBy])); // sort the users array by the selected sort

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Serach by Name <input placeholder="Search" type="search" onChange={e => setSearchTerm(e.target.value)} />
        </label>
        <label>
          Filter by Title
          <select onChange={e => setFilter(e.target.value)}>
            <option value="">select title</option>
            {titles.map(title => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={e => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="title">Title</option>
            <option value="mail">Mail</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map(user => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
