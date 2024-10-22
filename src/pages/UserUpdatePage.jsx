import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

useEffect(() => {
  getUser();

    async function getUser() {
    const response = await fetch(`https://timotejsproject-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`);
    const data = await response.json();
    setUser(data); // set the user state with the data from local storage
    }
  }, [id]); // <--- "[id]" VERY IMPORTANT!!!


  async function updateUser(userToUpdate) {
       const response = await fetch(`https://timotejsproject-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
         {
        method:"PUT",
        body: JSON.stringify(userToUpdate)
      } 
       ); 
     
    

    localStorage.setItem("users", JSON.stringify(updatedUsers)); // save the users state to local storage
    navigate(`/users/${id}`); // navigate to the user detail page
  }

  function handleCancel() {
    navigate(-1); // go back
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <UserForm onSubmit={updateUser} onCancel={handleCancel} user={user} />
      </div>
    </section>
  );
}
