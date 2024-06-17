import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserProps { 
    id: number,
    email: string, 
    name: string, 
    role: string 
  }

const List = () => {
    const [users, setUsers] = useState<UserProps[] | null>(null);
    const navigate = useNavigate();

    useEffect( () => {
        const fetchUsers = async () => {
        try {
            const response = await axios.get<{ data : {data: UserProps[]} }>('http://localhost:8000/api/v1/user/show?sizePerpage=10&search=');
            setUsers(response.data.data.data);
        } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();

    }, []);

    return (
        <div className="container">
          <button className="add-user-button" onClick={() => navigate('/create')}>
            Add User
          </button>
          <table className="user-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No Data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
}

export default List