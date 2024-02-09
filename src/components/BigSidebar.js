import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo } from "./Logo";
import NavLinks from "./NavLinks";
import { toggleSidebar } from "../features/user/UserSlice";

const BigSidebar = () => {
  const {isSideBarOpen} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = ()=>{
    dispatch(toggleSidebar());
  }
  return (
    <Wrapper>
        <div className={isSideBarOpen ? "sidebar-container show-sidebar" : "sidebar-container"}>
          <div className="content">
            <header>
              <Logo />
            </header>
            <NavLinks toggleSidebar={toggle} />
          </div>
        </div>
    </Wrapper>
  )
}

export default BigSidebar