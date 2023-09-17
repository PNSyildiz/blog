import { Post } from "./Home";
import { useState } from "react";
import { useEffect } from "react";

export interface User {
  name: string;
  email: string;
  paswword: string;
  myPosts: Post[];
}

interface SearchProps {
  setSearchedPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const Search: React.FC<SearchProps> = ({ setSearchedPosts }) => {
  const [searchItem, setSearchItem] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const localStorageKeys = Object.keys(localStorage);
    const parsedUsers: User[] = [];
  
    localStorageKeys.forEach((key) => {
      const userString = localStorage.getItem(key);
  
      if (userString !== null) {
        try {
          const user = JSON.parse(userString);
          if (typeof user === 'object' && 'name' in user && 'email' in user && 'password' in user && 'myPosts' in user) {
            parsedUsers.push(user);
          } else {
            console.error(`Data for key '${key}' in localStorage is not a valid User object.`);
          }
        } catch (error) {
          console.error(`Error parsing data for key '${key}' from localStorage: ${error}`);
        }
      }
    });
    setUsers(parsedUsers);
  }, []); 

  const searchForSearchItem = (searchItem: string, users: User[]) =>{
    const results: Post[] = [];
    for (const user of users) {
      for (const post of user.myPosts) {
        if (post.title.toLowerCase().includes(searchItem.toLowerCase()) ||
          post.description.toLowerCase().includes(searchItem.toLowerCase())) {
          results.push(post);
        }
      }
    }
    setSearchedPosts([...results])
  }

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M779.385-153.846 528.923-404.307q-30 25.538-69 39.538-39 14-78.385 14-96.1 0-162.665-66.529-66.566-66.529-66.566-162.577t66.529-162.702q66.529-66.654 162.577-66.654 96.049 0 162.702 66.565Q610.769-676.101 610.769-580q0 41.692-14.769 80.692-14.769 39-38.769 66.693l250.462 250.461-28.308 28.308ZM381.538-390.769q79.616 0 134.423-54.808Q570.769-500.385 570.769-580q0-79.615-54.808-134.423-54.807-54.808-134.423-54.808-79.615 0-134.423 54.808Q192.308-659.615 192.308-580q0 79.615 54.807 134.423 54.808 54.808 134.423 54.808Z" />
      </svg>
      <input
        placeholder="Search here"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <button onClick={() => searchForSearchItem(searchItem, users)}>Search</button>
    </div>
  );
};

export default Search;
