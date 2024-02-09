import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobsInfo from './JobsInfo';
import moment from 'moment';
import { deleteJob } from '../features/jobs/jobSlice';

const Jobs = ({id, position, company, jobLocation, jobType, dateCreated, jobStatus}) => {
  const dispatch = useDispatch();
  const date = moment(dateCreated).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobsInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobsInfo icon={<FaCalendarAlt />} text={date} />
          <JobsInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link to='/add-jobs' 
              className='btn edit-btn' 
              onClick={()=> console.log("edit job")}
            >
              Edit
            </Link>
            <button type='button' 
              className='btn delete-btn'
              onClick={()=> dispatch(deleteJob(id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Jobs