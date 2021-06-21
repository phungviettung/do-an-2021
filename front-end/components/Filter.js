import React, {useState, useEffect} from 'react'


import filterSearch from '../utils/filterSearch'
import {getData} from '../utils/fetchData'
import {useRouter} from 'next/router'

const Filter = ({state}) => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')
    const [materialItem, setMaterial] = useState('')

    const {categories} = state
    const {material} = state

    const router = useRouter()


    

    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({router, category: e.target.value})
    }
    const handleMaterial = (e) => {
        setMaterial(e.target.value)
        filterSearch({router, material: e.target.value})
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }

    useEffect(() => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])

    return (
        
            <div className="input-group ">
            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select className="custom-select text-capitalize"
                value={category} onChange={handleCategory}>
                    <option value="all">Chọn chủ đề </option>
                    {
                        categories.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select className="custom-select text-capitalize"
                value={materialItem} onChange={handleMaterial}>
                    <option value="all">Chọn loại thiết kế </option>
                    {
                        material.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <form autoComplete="off" className="mt-2 col-md-6 px-0">
                <input type="text" className="form-control" list="title_product" placeholder="Nhập để tìm kiếm"
                value={search.toLowerCase()} onChange={e => setSearch(e.target.value)} />
            </form>

            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select className="custom-select text-capitalize"
                value={sort} onChange={handleSort}>

                     <option value="-createdAt">Mới hơn lên trước</option>
                     <option value="oldest">Cũ hơn lên trước</option>
                     <option value="-sold">Phổ biến hơn lên trước</option>
                     <option value="-price">Giá từ cao xuống thấp</option>
                     <option value="price">Giá từ thấp lên cao</option>

                </select>
            </div>


        </div>
    )
}

export default Filter
