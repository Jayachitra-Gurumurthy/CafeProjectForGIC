

import {Dialog, DialogActions,DialogContent,DialogTitle,Button,RadioGroup,FormControlLabel,Radio, Typography } from "@mui/material";
import axios from "axios";
import { useState,useEffect } from "react";
import '../App.css';

  function PopupWindow(props) {
        const open = props.open;
        const [cafeData,setCafeData]=useState({name: '' , description:'',location:''})
        const [empData,setEmpData]=useState({ename: '' , email:'',phone:''})
     
       let  formValid = true;
      
        useEffect(() => {
          
          setCafeData({name: '' , description:'',location:''})
          setEmpData({ename: '' , email:'',phone:''})
          if(props.mode==='EDIT' && props.type==='CAFE') {
            setCafeData(prevData => ({ ...prevData, name: props.editData.Name , description:props.editData.Description,location:props.editData.Location}));
         
          }
        }, [props]);

        useEffect(() => {
          
          if(props.mode==='EDIT' && props.type==='EMPLOYEE') {
            console.log(props.editData)
            setEmpData(prevData => ({ ...prevData, ename: props.editData.Name , email:props.editData.Email,phone:props.editData.PhoneNumber}));
         
          }
        }, [props]);

        const handleCancel = (e) => {
          e.preventDefault();
        props.toggleModal();
        props.toggleMode();
        props.refreshData();
        setCafeData({name: '' , description:'',location:''})
        setEmpData({ename: '' , email:'',phone:''})
     
        } 
        const handleChange = (e) => {
          e.preventDefault();
          if(props.type==='CAFE') {
            const value = e.target.value;
            setCafeData({
              ...cafeData,
              [e.target.name]: value
            });
          } 

        else {
          const value = e.target.value;
          setEmpData({
            ...empData,
            [e.target.name]: value
          });
        } 
        }
         
        
        const handleSave = (e) => {
          e.preventDefault();
        formValidation();
       
         if(formValid) {
          props.toggleModal();  
          props.toggleMode();
          if(props.type==='CAFE') {
          if(props.mode==='ADD') {
            const cafedata = {
              Name: cafeData.name,
              Description: cafeData.description,
              Location: cafeData.location 
            };
          axios.post("http://localhost:3000/cafe", cafedata).then((response) => {
            console.log(response.status, response.data.token);
            props.refreshData();
            
           
          });
        }
        else {
          const cafedata = {
            Name: cafeData.name,
            Description: cafeData.description,
            Location: cafeData.location,
            _id:props.editData._id
          };
          console.log(cafedata);
          axios.put("http://localhost:3000/cafe", cafedata).then((response) => {
            console.log(response.status, response.data.token);
            props.refreshData();
           
          });
        }
      } // If Cafe ends 

      else if(props.type==='EMPLOYEE'){

        if(props.mode==='ADD') {
          const empdata = {
            Name: empData.ename,
            Email: empData.email,
            PhoneNumber: empData.phone ,
            CafeName:"Cold Brew",
            DaysWorked:"45"
  
          };
          console.log("emp",empdata)
        axios.post("http://localhost:3000/employee", empdata).then((response) => {
          console.log(response.status, response.data.token);
          props.refreshData();
         
        });
      }
      else {
        const empdata = {
          Name: empData.ename,
          Email: empData.email,
          PhoneNumber: empData.phone ,
          CafeName:empData.cafeName,
          DaysWorked:empData.daysWorked,
          _id:props.editData._id
        };
        console.log(empdata);
        axios.put("http://localhost:3000/employee", empdata).then((response) => {
          console.log(response.status, response.data.token);
          props.refreshData();
         
        });
      }
      }
    
     
        }
      }

        const formValidation = () => {
          
          if(props.type==='CAFE') {
            console.log(cafeData.name.length)
            if(cafeData.name.length < 5 || cafeData.name.length >10) {
              formValid= false;
          
            }
            else if(cafeData.description.length > 256) { 
               formValid= false;
                
            }
            else {
             
              formValid= true;
             
              console.log("Valid data",formValid)
            }
            console.log(formValid)
          }

           
          else if(props.type==='EMPLOYEE') {
           
            if(empData.ename.length < 6 || empData.ename.length >10) {
             formValid= false;
              console.log("Valid data",formValid)
             
            }
            else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(empData.email) ) {
             formValid= false;
              console.log("Valid data",formValid)
              
            }
            else if(empData.phone.length !== 8 ) { 
               formValid= false;
                console.log("Valid data",formValid)
                
            } 
            else if(empData.phone[0]!=='9' && empData.phone[0]!=='8') { 
             formValid= false;
              console.log("Valid data",formValid)
             
          } 
            else
           {
            
            formValid=true;
            console.log("Valid data",formValid)
           }
            
          }
          
        }
        
        return (
          <Dialog open={open}>
            <DialogTitle>
             <Typography style={{color:'#C9A63B',textAlign:'center',margin:'auto'}}> {props.mode} {props.type} </Typography>
            </DialogTitle>
            <DialogContent style={{display:'grid',gap:'10px'}}>
             { props.type==='CAFE' && <> 
              <label> Name </label> <input type="text" name="name" id="name" value={cafeData.name} onChange={handleChange} minLength={6} max={10}/> 
             <label> Description </label> <input type="textbox" name="description" value={cafeData.description} onChange={handleChange} id="desc" maxLength={256}/> 
             <label> Logo </label> <input type="file" id="logo"/> 
             <label> Location </label> <input type="text" id="location" name="location" value={cafeData.location} onChange={handleChange}/> 
              </>
            }
              {props.type==='EMPLOYEE' && <> 
              <label> Name </label> <input type="text" id="ename"  name="ename"  value={empData.ename} onChange={handleChange} /> 
             <label> Email Address </label> <input type="text" id="email"  name="email" value={empData.email} onChange={handleChange} /> 
             <label> Phone Number </label> <input type="text" id="phone"  name="phone"  value={empData.phone} onChange={handleChange}/> 
                 
              <label id="demo-radio-buttons-group-label"   >Gender</label>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
           
              </> }
             
             {props.type==='CAFE'  && <div style={{color:'red'}}> 
              <p style={{color:'black',fontWeight:'bold'}}> Note: Your Data couldn't be accepted if any of the below conditions is not met </p>
             <p> Cafe Name should be between 5-10 characters </p>
             <p> Cafe Description should be maximum 256  characters </p>
             <p> Empty form fields</p>
             </div> }

             {props.type==='EMPLOYEE'  && <div style={{color:'red'}}> 
              <p style={{color:'black',fontWeight:'bold'}}> Note: Your Data couldn't be accepted if any of the below conditions is not met </p>
             <p> Employee Name should be between 6-10 characters  </p>
             <p> Phone number should starts with 8 or 9 , and have 8 digit </p>
             <p> Invalid mail address</p>
             </div> }
            </DialogContent>
            <DialogActions style={{textAlign:'center',margin:'auto'}}>
              <Button variant="contained" style={{backgroundColor:'#C9A63B'}} onClick={(e)=>handleSave(e)} >Save </Button>
              <Button variant="contained" style={{backgroundColor:'grey'}} onClick={(e)=>handleCancel(e)}> Cancel </Button>
            </DialogActions>
          </Dialog>

          
        );
    
} 

export default PopupWindow;