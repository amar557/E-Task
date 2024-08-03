import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cart.slice";
import { link } from "./Link";

const Home = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getItems(params) {
      const items = await fetch(`${link}/api/item/getall`, {
        method: "GET",
      });
      const inJson = await items.json();
      setItems(inJson);
    }
    getItems();
  }, []);
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <Navbar />
      <div className="flex gap-4 my-4">
        {items.map((item) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img
              className="w-full  object-contain"
              src={item.image}
              alt={item.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <p className="text-gray-900 text-lg font-semibold">
                Price: ${item.colors[index].price}
              </p>
              <div className="flex items-center mt-4">
                {item.colors.map((color, i) => (
                  <button
                    key={color._id}
                    className={`w-8 h-8 rounded-full mr-2 border-2 ${
                      selectedColor.color === color.color
                        ? "border-gray-800"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => {
                      handleColorChange(color);
                      setIndex(i);
                    }}
                  />
                ))}
              </div>
              <button
                className="bg-black text-white py-2 px-2 w-full  text-base capitalize rounded-md  my-2"
                onClick={() =>
                  dispatch(
                    addToCart({
                      title: item.title,
                      color: item.colors[index].color,
                      price: item.colors[index].price,
                      image: item.image,
                      id: item._id,
                      quantity: 1,
                    })
                  )
                }
              >
                add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
