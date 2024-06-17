import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RolesProps {
    id: number,
    name: string
  }
  
interface FormData {
    name: string;
    email: string;
    role_id : number[]
}

const Create = () => {
    const [roles, setRoles] = useState<RolesProps[] | null>(null);
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', role_id: [] });
    const navigate = useNavigate();

    useEffect( () => {
        const fetchRoles = async () => {
            try {
            const response = await axios.get<{ data: RolesProps[] }>('http://localhost:8000/api/v1/role/list');
            setRoles(response.data.data);
            } catch (error) {
            console.error('Error fetching users:', error);
            }
        }

        fetchRoles();
    
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
            setFormData(prevState => ({
                ...prevState,
                role_id: [...prevState.role_id, parseInt(value)],
            }));
            } else {
            setFormData(prevState => ({
                ...prevState,
                role_id: prevState.role_id.filter(id => id !== parseInt(value)),
            }));
            }
        } else {
            setFormData({
            ...formData,
            [name]: value,
            });
        }
    };
    
    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:8000/api/v1/user/store', formData);
            
            alert('successfully created');
            navigate('/');

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || error.message);
            } else if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred.');
            }
        }
    };

    return (
        <div className="container">
          <form className="create-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" type="email" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input id="name" name="name" type="text" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <div className="checkbox-group">
                {roles ? (
                  roles.map(role => (
                    <div key={role.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={`role_${role.id}`}
                        name="role_id"
                        value={role.id}
                        onChange={handleInputChange}
                      />
                      <label htmlFor={`role_${role.id}`}>{role.name}</label>
                    </div>
                  ))
                ) : (
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="role_admin"
                      name="role_id"
                      value="1"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="role_admin">Administrator</label>
                  </div>
                )}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-create" type="button" onClick={handleSubmit}>
                Create
              </button>
              <button className="btn-cancel" type="button" onClick={() => navigate('/')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
    );
}

export default Create