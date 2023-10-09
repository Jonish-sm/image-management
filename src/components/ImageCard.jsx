import "./style.css";

function RecipeReviewCard({ value }) {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {value &&
        value.map((item) => (
          <div class="card 1">
            <div class="card_image">
              <img src={`http://localhost:5500/upload/${item.imagePath}`} />
            </div>
            <div class="card_title title-white">
              <p>{item.imageName}</p>
            </div>
            <p style={{textAlign:"center"}}>
              User : <strong> {item.users}</strong>
            </p>
            <p style={{textAlign:"center"}}>{item.des}</p>
          </div>
        ))}
    </div>
  );
}

export default RecipeReviewCard;
