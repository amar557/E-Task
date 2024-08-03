import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Checkbox, FormControlLabel } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
// import { firestore, storage } from "../FireBase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { link } from "../../pages/Link";

function AddProduct() {
  const navigate = useNavigate();
  const galleryImgs = useRef();
  const [galleryImages, setGalleryImages] = useState(null);
  const [colors, setColors] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    colors: [
      {
        price: "",
        color: "",
      },
    ],
    image: "",
  });

  useEffect(() => {
    async function handleDataSubmit(e) {
      const mainref = ref(
        storage,
        `imges/new/${galleryImages.name + Date.now()}`
      );
      try {
        const uploadTask = await uploadBytes(mainref, galleryImages);
        const downloadUrl = await getDownloadURL(uploadTask.ref);
        console.log(downloadUrl);
        setFormData({ ...formData, image: downloadUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    if (galleryImages) handleDataSubmit();
  }, [galleryImages]);

  const handleSubmit = async function (e) {
    e.preventDefault();
    const response = await fetch(`${link}/api/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res = await response.json();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "color" || name === "price") {
      const newColors = [...formData.colors];
      newColors[event.target.dataset.index][name] = value;
      setFormData({
        ...formData,
        colors: newColors,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addNewColor = (e) => {
    e.preventDefault();
    setColors(colors + 1);
    setFormData({
      ...formData,
      colors: [...formData.colors, { price: "", color: "" }],
    });
  };

  return (
    <div className="px-6 bg-slate-100 w-full text-base">
      <div className="flex items-center justify-between w-full">
        <h2 className="capitalize font-semibold text-xl">add product</h2>
        <button
          className="bg-black uppercase rounded-sm text-white flex gap-1 py-2 px-4 items-center justify-center"
          onClick={() => navigate(-1)}
        >
          <GoArrowLeft />
          <span className="font-semibold text-sm">back</span>
        </button>
      </div>

      <form action="" className="w-1/2 mx-auto bg-white p-4 my-8">
        <h1 className="text-xl font-semibold border-b py-4 capitalize">
          product information
        </h1>
        <label
          htmlFor=""
          className="block text-sm capitalize font-semibold my-2"
        >
          Product Name*
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="block p-3 placeholder:capitalize border rounded-md focus:border-blue-200 focus:border outline-none bg-slate-50 w-full"
          placeholder="product name"
          id=""
        />
        <label
          htmlFor=""
          className="block text-sm capitalize font-semibold my-2"
        >
          description
        </label>
        <textarea
          name="description"
          onChange={handleChange}
          value={formData.description}
          id=""
          placeholder="product description"
          rows={4}
          className="p-2 border rounded-md bg-slate-50 placeholder:capitalize block w-full outline-none"
        ></textarea>
        <div className="flex items-end justify-end my-3">
          <button
            className="bg-black text-white rounded-sm uppercase px-3 py-1"
            onClick={addNewColor}
          >
            add new
          </button>
        </div>
        <div className="flex flex-col items-start justify-start">
          {formData.colors.map((color, i) => (
            <div className="flex items-center justify-start gap-5 my-3" key={i}>
              <div className="flex items-center gap-3">
                <label
                  htmlFor=""
                  className="text-sm capitalize font-semibold my-2"
                >
                  price*
                </label>
                <input
                  type="number"
                  name="price"
                  data-index={i}
                  onChange={handleChange}
                  value={color.price}
                  className="block p-3 placeholder:capitalize border rounded-md focus:border-blue-200 focus:border outline-none bg-slate-50 w-11/12"
                  placeholder="price"
                  id=""
                />
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor=""
                  className="text-sm capitalize font-semibold my-2"
                >
                  color
                </label>
                <input
                  type="color"
                  name="color"
                  data-index={i}
                  onChange={handleChange}
                  value={color.color}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label
            htmlFor=""
            className="block text-sm capitalize font-semibold my-2"
          >
            select image:
          </label>
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setGalleryImages(e.target.files[0])}
            ref={galleryImgs}
            hidden
          />
          <label
            htmlFor=""
            className="flex items-center cursor-pointer justify-start border-blue-200 border w-max p-3 text-base transition-all gap-3 hover:bg-blue-200 hover:shadow-2xl shadow-blue-100 capitalize font-semibold my-2"
            onClick={() => galleryImgs.current.click()}
          >
            <FiUploadCloud />
            <span>select image</span>
          </label>
        </div>
        <button
          className="w-full bg-black text-white py-2 rounded-md uppercase my-2"
          type="submit"
          onClick={handleSubmit}
        >
          create list
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
