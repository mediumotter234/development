export default function MovieItem({item, onClick, watchList}) {
  const buttonText = watchList.includes(item) ? "- Remove from watchlist" : "+ Add to watchlist";
  const buttonColor = watchList.includes(item) ? 'purple' : 'green';
  return (
  <div>
      <img src={item.image} alt="movie item" height="330px" width="215px"/>
      <button onClick={() => onClick(item)} style={{backgroundColor:buttonColor, color:'white'}}>
        {buttonText}
      </button>
    <div className="Info">
        <h3>
        {item.name} ({item.year})
        </h3>
        <p>{item.runtime} mins</p>
        <p>{item.rating} stars </p>
        <p>{item.description}</p>
    </div>
  </div>);
}