import React , {useState, useEffect} from 'react'
import { FaAngleDown, FaArrowDown, FaProductHunt } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const menuAnimation = {
    hidden: {
        height: 0,
        opacity: 0,
        transition: {
        duration: 0.3,when:"afterChilderen",
        },
    },
    show: {
        height: "auto",
        opacity: 1,
        transition: {
        duration: 0.3,when:"beforeChilderen",
        },
    },
}

const menuItemAnimation = {
    hidden:(index)=>({
        padding:0,
        x:"-100%",
        transition:{
            duration:(index+1)*0.1
        }
    }),
    show:(index)=>({
        x:0,
        transition:{
            duration:(index+1)*0.1
        }
    })
}

const SidebarMenu = ({ showAnimation, route, open, setOpen}) => {
    const [openMenu, setOpenMenu] = useState(false)

    const toggle  = () =>{
        setOpenMenu(!openMenu)
        setOpen(true)
    }
    useEffect(() => {
      if (!open){
        setOpenMenu(false)
      }
    }, [open])
    
    return (
        <>
            <div className='menu' onClick={toggle}>
                <div className='menu_items'>
                    <div className="icon m-1">{route.icon}</div>
                    <AnimatePresence>
                        {open && <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="route_text">{route.name}</motion.div>}
                    </AnimatePresence>
                </div>
                {open&&<motion.div animate={openMenu?{rotate:-90}:{rotate:0}}><FaAngleDown/></motion.div>}
            </div>
            <AnimatePresence>
            {openMenu && (<motion.div variants={menuAnimation} initial="hidden" animate="show" exit="hidden" className='menu_container'>
                {route.subRoutes.map((subRoute, index) => (
                      <motion.div variants={menuItemAnimation} custom={index} key={index}>
                        <NavLink to={subRoute.path} className='link'>
                            <div className="icon  p-1 rounded-full ">{subRoute.icon}</div>
                            <AnimatePresence>
                                {open && <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="route_text">{subRoute.name}</motion.div>}
                            </AnimatePresence>
                        </NavLink>
                      </motion.div>
                    ))}
            </motion.div>)}
            </AnimatePresence>
        </>
    )
}

export default SidebarMenu