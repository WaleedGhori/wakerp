import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { FaProductHunt } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import { TbHeartRateMonitor } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
const routes = [
    {
        path: '/',
        name: "Dashboard",
        icon: <TbHeartRateMonitor/>,
    },
    {
        path: '/createinvoice',
        name: "Generate Sales",
        icon: <FaFileInvoice/>,
    },
    {
        path: '/addproduct',
        name: "Add Product",
        icon: <FaProductHunt />,
    },

]
const Sidebar = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggle = () =>{
        setOpen(!open)
    }

const hiddenAnimation = {
        hidden:{
            width: 0, 
            padding: 0,
            opacity:0,
            transition:{
            duration:0.5,
            },
        },
        show:{
            width:"140px",
            padding: "5px 15px",
            opacity:1,
            transition:{
            duration:0.2,
            },
        },
    }
const showAnimation = {
        hidden:{
            width: 0, 
            opacity: 0,
            transition:{
            duration:0.5,
            },
        },
        show:{
            width:"auto",
            opacity:1,
            transition:{
            duration:0.2,
            },
        },
    }
    return (
        <div className='main-container'>
            <motion.div animate={{ width: open ? "200px" : "40px" , transition:{
                duration:0.5,
                type:"spring",
                damping:11
            }}} className='h-auto sidebar'>
                <div className="sidehead">
                    {open && <motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden"  className='logo'>WakERP</motion.h1>}
                    <div className="bar cursor-pointer">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                <div className="search">
                    <div className="search-icon">
                        <BiSearch/>
                    </div>
                    <AnimatePresence>
                        {open && <motion.input initial='hidden' animate="show" exit="hidden" variants={hiddenAnimation} type="text" placeholder='Search'/>}
                    </AnimatePresence>
                    </div>
                <section className='routes'>
                    {routes.map((route) => {
                        return (
                            <NavLink activeClassName="active" to={route.path} key={route.name} className='link'>
                                <div className="icon">{route.icon}</div>
                                <AnimatePresence>
                                    {open && <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="route_text">{route.name}</motion.div>}
                                </AnimatePresence>
                                
                            </NavLink>
                        )
                    })}
                </section>
            </motion.div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar