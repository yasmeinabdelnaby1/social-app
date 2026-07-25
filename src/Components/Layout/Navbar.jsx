import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";


import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../context/tokenContext";
import { IoMdCodeWorking } from 'react-icons/io'
import { ImHome } from 'react-icons/im'





export default function NavbarComponent() {
let {setToken , userData } = useContext(tokenContext)
let navigate = useNavigate()

function logoutSystem() {
  localStorage.removeItem('token');
  setToken(null);
  navigate('/auth/login')

}


  return (
    <Navbar  className="bg-gray-100">
      <NavbarBrand>
        <h1>< IoMdCodeWorking size={30} className="m-2"/> </h1>

        <p className="font-bold text-sky-900 text-3xl">  LinkedPost </p>
        <h1>< IoMdCodeWorking size={30} className="m-2" /> </h1>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex " justify="end">

  
      </NavbarContent>

      <NavbarContent as="div" justify="end">
              <NavbarItem>
        <Link to={'/'} color="foreground" href="#" className="pointer  flex justify-center font-semibold p-3">
           < ImHome  size={20}/>   Home
          </Link>

        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src={userData?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as {userData?.name}</p>
              <p className="font-semibold">{userData?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings"><Link to={'/profile'} className=" font-medium">Profile</Link></DropdownItem>
            <DropdownItem onClick={() => { logoutSystem()}} key="logout" color="danger " className="font-medium">
             Log Out 
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

