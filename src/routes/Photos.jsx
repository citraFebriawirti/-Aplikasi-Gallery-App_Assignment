import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);



  const [loading, setLoading] = useState(false);

  const deletePhoto = (id) => {
    // TODO: answer here
    fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
    method: "DELETE", // HTTP method menggunakan PUT
})
      .then((res) => res.json())
      .then((deletedTos) => {
        setPhotos(deletedTos => {
      return deletedTos.filter(photo => photo.id !== id)
    })
  });
  };

  
  useEffect(() => {
    setLoading(true);
    // TODO: answer here
     // mengset data dengan url 
     fetch("https://gallery-app-server.vercel.app/photos")
     .then((res) => res.json())
     .then((json) => setPhotos(json));
      setLoading(false)
  }, []);

 

  return (
    <>
      <div className="container">
        {/* <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div> */}
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
