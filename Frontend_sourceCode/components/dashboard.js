import '../App.css';
  
  import image from '../assets/dashboard.png';
  import { Button } from '@mui/material';
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  import { Link } from '@tanstack/react-router';

function Dashboard() {
    return (
        <div style={{display:'flex'}}>
          <img src={image} alt="dashboard" style={{height:'80vh',margin:'5px'}}/>
          <div style={{display:'block',margin:'20px'}}> 
          <h1> Welcome to Coffee on Wheels - Your hassle free Cafe Manager</h1>
          <article style={{alignContent:'justify'}}>We are here to help  restaurants manage their work schedules, time clock, team communication, labor compliance, payroll, 
            tips and more. Save $1,000s every month in reduced labor costs, cut 
            staff call & text chaos by 50%, create schedules with 95% labor accuracy, and manage staff when you're on-the-go.
            We help you to manage your employee details, shift roasters etc., Also to keep track of your chain of restaurants.</article>

            <Link to="/cafes"> <Button variant="contained" style={{marginTop:'20px',backgroundColor:'#C9A63B'}} >Click here to View Cafes</Button>
            </Link>
            <h2 style={{color:'#C9A63B',marginTop:'40px'}}> What we offer    </h2>
            <div style={{display:'flex',gap:'40px'}}> 
            <h4> <CheckCircleIcon style={{fontSize:'medium'}}/> 24 X 7 Customer Support </h4>
            <h4>  <CheckCircleIcon style={{fontSize:'medium'}}/> Employee Payroll Management </h4>
            <h4>  <CheckCircleIcon style={{fontSize:'medium'}}/> Employee Data Maintanence </h4>
            
            </div>
            
            

          </div>
          
         
        </div>
      )
}

export default Dashboard;