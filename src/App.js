import { useState, useEffect } from "react";
import Imagecard from "./components/imagecard";
import Imagesearch from "./components/imagesearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  console.log(images);

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <Imagesearch searchText={(text) => setTerm(text)} />
      {isLoading ? (
        <h1 className="font-bold text-center mx-auto mt-32">Loading....</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <Imagecard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
