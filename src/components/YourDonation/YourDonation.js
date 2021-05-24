import React, { useContext } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";

export default function YourDonation(props) {
  const { items, setItems, yourItems, setYourItems } = useContext(AppContext);
  const { key, id, src, title, description } = props;
  const handleDelete = (e) => {
    e.preventDefault();
    const item_id = props.id;
    console.log();
    AuthAPIService.deleteItem(item_id)
      .then(() => {
        deleteYourItem(item_id);
        props.history.push("/yourdonations");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const deleteYourItem = (item_id) => {
    setYourItems({
      yourItems: items.filter((item) => item.id !== item_id),
    });
    setItems({
      items: items.filter((item) => item.id !== item_id),
    });
  };

  return (
    <div key={key}>
      <Link to={`donation/${id}`}>
        <Image
          cloudName="hq1rpt94r"
          publicId={`${src}`}
          width="150"
          height="200"
          crop="fill"
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
