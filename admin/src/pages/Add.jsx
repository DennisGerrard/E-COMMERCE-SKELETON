import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Women');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (sizes.length === 0) return toast.error('Please select at least one size.');
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]);
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3 bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm max-w-2xl">
      <h2 className="text-xl font-medium mb-4">Add Product</h2>
      
      <div className="w-full mb-2">
        <p className="mb-2 text-sm text-gray-600 font-medium">Upload Images</p>
        <div className="flex gap-2">
          {[1,2,3,4].map((num) => {
            const imgState = [image1, image2, image3, image4][num-1];
            const setImgState = [setImage1, setImage2, setImage3, setImage4][num-1];
            return (
              <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
                <div className={`w-20 h-20 flex items-center justify-center border-2 border-dashed rounded ${imgState ? 'border-rose-400 bg-rose-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                   {imgState ? (
                     <img src={URL.createObjectURL(imgState)} className="w-full h-full object-cover rounded" alt="" />
                   ) : (
                     <span className="text-xl text-gray-400">📷</span>
                   )}
                </div>
                <input onChange={(e) => setImgState(e.target.files[0])} type="file" id={`image${num}`} hidden />
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm text-gray-600 font-medium">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="input-field" type="text" placeholder="Type here" required />
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm text-gray-600 font-medium">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="input-field min-h-[100px]" placeholder="Write content here" required />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1">
          <p className="mb-2 text-sm text-gray-600 font-medium">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded font-sans focus:outline-none focus:border-rose-400 text-sm">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-sm text-gray-600 font-medium">Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded font-sans focus:outline-none focus:border-rose-400 text-sm">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Outerwear">Outerwear</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-sm text-gray-600 font-medium">Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-4 py-2 border border-gray-300 rounded font-sans focus:outline-none focus:border-rose-400 text-sm" type="number" placeholder="25" required />
        </div>
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-sm text-gray-600 font-medium">Product Sizes</p>
        <div className="flex gap-3">
          {["Small", "Medium", "Large", "Extra Large"].map((size) => (
            <div key={size} onClick={() => toggleSize(size)} className={`px-4 py-2 cursor-pointer border rounded text-xs transition-colors ${sizes.includes(size) ? 'bg-rose-100 border-rose-400 text-rose-800 font-medium' : 'bg-gray-50 border-gray-200'}`}>
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 w-full">
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" className="w-4 h-4 accent-rose-500 cursor-pointer" />
        <label className="cursor-pointer text-sm text-gray-700 font-medium" htmlFor="bestseller">Add to Bestseller list</label>
      </div>

      <button type="submit" className="btn-primary mt-6 tracking-wide">ADD PRODUCT</button>
    </form>
  );
};

export default Add;
