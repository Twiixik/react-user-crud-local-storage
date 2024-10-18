import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

export default function CreatePage() {
  const navigate = useNavigate();

  async function createUser(newUser) {
    const response = await fetch("https://timotejsproject-default-rtdb.europe-west1.firebasedatabase.app/users.json", {
      method: "POST",
      body: JSON.stringify(newUser)
    });

    if(response.ok) {
      navigate("/"); // navigate to the home page
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Create New User</h1>
        <UserForm onSubmit={createUser} onCancel={handleCancel} />
      </div>
    </section>
  );
}
