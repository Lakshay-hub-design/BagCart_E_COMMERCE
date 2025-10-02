import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const ProductsContext = createContext()
export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(null)

  const [totalPages, setTotalPages] = useState(1);

  const fetchProduct = async () =>{
        try{
            const res = await axios.get('http://localhost:3000/api/product/shop',{
                params: { search: searchQuery, filter, sort, page, limit },
                withCredentials: true
            })
            setProducts(res.data.products);
            setTotalPages(res.data.pages)
            setTotal(res.data.total)
        }catch(err){
            console.error(err)
        }
  }

  useEffect(() => {
    fetchProduct()
  }, [searchQuery, filter, sort, page, limit])


  return (
    <ProductsContext.Provider value={{ fetchProduct, products, setProducts, total, searchQuery, setSearchQuery, filter, setFilter, sort, setSort, page, setPage, limit, setLimit, totalPages }} >
        {children}
    </ProductsContext.Provider>
  )
}

export const useProduct = () => useContext(ProductsContext)