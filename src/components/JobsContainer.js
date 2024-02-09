import { useEffect } from "react"
import Jobs from "./Jobs"
import Wrapper from "../assets/wrappers/JobsContainer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { getAllJobs } from "../features/allJobs/allJobSlice";

const JobsContainer = () => {
    const {jobs, isLoading} = useSelector((store) => store.allJobs);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllJobs());
    },[])

    if(isLoading){
        return <Loading center />
    }

    if(jobs.length == 0){
        return(
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }

  return (
    <Wrapper>
        <h5>jobs info</h5>
        <div className="jobs">
            {jobs.map((job, index)=>{
                return <Jobs key={index} {...job} />
            })}
        </div>
    </Wrapper>
  )
}

export default JobsContainer