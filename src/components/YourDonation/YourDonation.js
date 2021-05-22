import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";

export default function YourDonation(props) {
  const { deleteYourItem } = useContext(AppContext);
  const { key, id, src, title, description } = props;
  const handleDelete = (e) => {
    e.preventDefault();
    const item_id = props.id;
    console.log();
    AuthAPIService.deleteItem(item_id)
      .then(() => {
        deleteYourItem(item_id);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <div key={key}>
      <Link to={`donation/${id}`}>
        <img className="item-img" src={src}></img>
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
