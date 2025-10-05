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
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);



  const fetchProduct = async () =>{
    setLoading(true)
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/shop`,{
                params: { search: debouncedSearch, filter, sort, page, limit },
                withCredentials: true
            })
            setProducts(res.data.products);
            setTotalPages(res.data.pages)
            setTotal(res.data.total)
        }catch(err){
            console.error(err)
        } finally{
          setLoading(false)
        }
  }

  useEffect(() => {
    fetchProduct()
  }, [debouncedSearch, filter, sort, page, limit])

  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(searchQuery);
  }, 500);

  return () => {
    clearTimeout(handler);
  };
}, [searchQuery]);


  return (
    <ProductsContext.Provider value={{ fetchProduct, products, setProducts, total, searchQuery, setSearchQuery, filter, setFilter, sort, setSort, page, setPage, limit, setLimit, totalPages, loading }} >
        {children}
    </ProductsContext.Provider>
  )
}

export const useProduct = () => useContext(ProductsContext)