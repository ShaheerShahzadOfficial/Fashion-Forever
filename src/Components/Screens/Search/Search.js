import "./Search.css"
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Search = () => {
    const [keyword, setKeyword] = useState("")

    const history = useHistory()
    const searchSubmitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/products/${keyword}`)
        } else {
            history.push(`/products`)

        }
    }

    return (
        <Fragment>
            <form className='searchBox' onSubmit={searchSubmitHandler} >
                <input type="search" placeholder='Search A Product ...' onChange={e => setKeyword(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </Fragment>)
}

export default Search