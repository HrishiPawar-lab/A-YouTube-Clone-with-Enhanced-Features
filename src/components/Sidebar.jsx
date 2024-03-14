import React from 'react'
import { categories } from '../utils/Constants.jsx';



const Sidebar = ({ category, setCategory }) => {
    return (
        <div
        >
            {
                categories.map((c, index) => {
                    return (
                        <div className='' key={c.name}>
                            <button onClick={() => {
                                window.scrollTo(0, 10)
                                setCategory(c.name)
                            }} className={`category-btn ${category === c.name ? 'selected' : 'asas'}`}>
                                <span style={{ marginRight: "10px" }}>
                                    {c.icon}
                                </span>
                                {c.name}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar;
