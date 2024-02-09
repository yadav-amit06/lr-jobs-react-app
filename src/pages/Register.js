import { FromRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/UserSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const {user, isLoading} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const name = e.target.name;
    const value =  e.target.value;
    setValues({...values, [name]:value});
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    const {name, email, password, isMember} = values;
    if(!email || !password || (!isMember && !name)){
      toast.error("Please fill out all fields");
      return;
    }
    if(isMember){
      dispatch(loginUser({email: email, password: password}));
      return;
    }
    dispatch(registerUser({name, email, password}));
  }

  const ToggleMember = ()=>{
    setValues({...values, isMember: !values.isMember});
  }

  useEffect(()=>{
    if(user){
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  },[user])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && 
          <FromRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
          />
        }
        <FromRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FromRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          {isLoading ? 'loading...' : 'Submit'}
        </button>
        <p>
          {values.isMember ? "Not a Member yet?" : "Already a Member"}
          <button type="button" onClick={ToggleMember} className="member-btn">
            {values.isMember ? "Register": "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register