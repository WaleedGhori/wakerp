import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import {FaProductHunt } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {RxUpdate} from "react-icons/rx"
import {CiViewList} from "react-icons/ci"
import {MdDelete} from  "react-icons/md"
import { TbHeartRateMonitor } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import { FaBars,FaUserAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import SidebarMenu from './SidebarMenu';
const routes = [
    {
        path: '/dashboard',
        name: "Dashboard",
        icon: <TbHeartRateMonitor />,
    },
    {
        path: '/createinvoice',
        name: "Generate Sales",
        icon: <FaFileInvoice />,
    },
    {
        path: '/addproduct',
        name: "Product",
        icon: <FaProductHunt />,
        subRoutes: [
            {
                path: "/product/getproduct",
                name: "View Product",
                icon: <CiViewList/>
            },
            {
                path: "/product/addproduct",
                name: "Add Product",
                icon: <AiOutlinePlusCircle />
            },
            {
                path: "/product/updateproduct",
                name: "Update Product",
                icon: <RxUpdate/>
            },
            {
                path: "/product/deleteproduct",
                name: "Delete Product",
                icon: <MdDelete/>
            }
        ]
    },
    {
        path: '/createuser',
        name: "Create User",
        icon: <FaUserAlt />,
    },

]
const Sidebar = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open)
    }

    const hiddenAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            width: "140px",
            padding: "5px 15px",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    }
    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            width: "auto",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    }
    return (
        <div className='main-container'>
            <motion.div animate={{
                width: open ? "200px" : "40px", transition: {
                    duration: 0.5,
                    type: "spring",
                    damping: 11
                }
            }} className={`sidebar`}>
                <div className="sidehead">
                    <AnimatePresence>
                        {open && <motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden" className='logo'>WakERP</motion.h1>}
                    </AnimatePresence>
                    <div className="bar cursor-pointer">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <div className="search">
                    <div className="search-icon">
                        <BiSearch />
                    </div>
                    <AnimatePresence>
                        {open && <motion.input initial='hidden' animate="show" exit="hidden" variants={hiddenAnimation} type="text" placeholder='Search' />}
                    </AnimatePresence>
                </div>
                <section className='routes'>
                    {routes.map((route) => {
                        // here we say if any subroutes have so show it otherwise go on return
                        if (route.subRoutes) {
                            return <SidebarMenu showAnimation={showAnimation} route={route} open={open} setOpen={setOpen} key={route.name} />
                        }
                        return (
                            <NavLink activeClassName="active" to={route.path} key={route.name} className='link'>
                                <div className="icon m-1">{route.icon}</div>
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