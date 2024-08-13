import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import React, { useEffect, useState,useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { Button,DialogActions, DialogContent ,Dialog } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useNavigate } from '@tanstack/react-router';
import PopupWindow from './popupWindow';
import axios from 'axios';
import '../App.css';


ModuleRegistry.registerModules([ClientSideRowModelModule]);

function Cafes() {


    const gridRef = useRef(null);
    const [open,setOpen]  = useState(false);
    const [deleteConfirmOpen,setDeleteConfirmOpen]  = useState(false); 
    const [rowData, setRowData] = useState([]);
    const [mode,setMode] = useState('ADD');
    const [selectedRow,setSelectedRow] = useState('');
   const navigate = useNavigate();
   const editIconRenderer = () => { return <div>   <button className="btn-transparent" onClick={(e)=>handleEdit(e)}> 
   <EditIcon  style={{fontSize:'medium',marginRight:'20px',color:'blue' }}/>  </button>
   <button className="btn-transparent"  onClick={ () => setDeleteConfirmOpen(true)}> 
   <DeleteIcon style={{fontSize:'medium',color:'crimson'}}/> </button> 
</div> 
}
const logoRenderer = () => {  return <div> <LocalCafeIcon style={{color:'brown'}}/>  </div>}

const employeeLinkToCafe = () => {
      
  return  <Button onClick={(e)=>handleRoutetoEmployee(e)}> <Chip label="Employee details" />   </Button>
  
}

   const [colDefs, setColDefs] = useState([
    { field: 'Logo',cellRenderer:logoRenderer },
    { field: 'Name' },
    { field: 'Description' },
    { field: 'Employees', cellRenderer: employeeLinkToCafe },
    { field: 'Location' },
    {field: 'Edit/Delete' , cellRenderer : editIconRenderer
   }
]);

 


  useEffect(() => { getCafeData()}, []);

   const getCafeData = () => {
    console.log("Data refresh")
    axios.get('http://localhost:3000/cafes')
    .then(response => {
      // console.log(response.data)
      setRowData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
   }
  
   

    const handleRoutetoEmployee = (e) => {
      e.preventDefault();
      let val = "/employees?CafeName="+gridRef.current.api.getSelectedRows()[0].Name;
      navigate({to:val});
      
    }

    const DeleteConfirmationModal = () => {
      return <Dialog open={deleteConfirmOpen}> 
        <DialogContent> 
          Are you sure to delete the record ?
        </DialogContent>
        <DialogActions style={{textAlign:'center',margin:'auto'}}>
                  <Button variant="contained" style={{backgroundColor:'#C9A63B'}} onClick={(e)=>handleDelete(e)}  >Yes </Button>
                  <Button variant="contained" style={{backgroundColor:'grey'}} onClick={ () => setDeleteConfirmOpen(false)} > No </Button>
                </DialogActions>
      </Dialog>
    }
   
    const handleEdit = (e) => {
      e.preventDefault();
      setOpen(!open);
       setSelectedRow(gridRef.current.api.getSelectedRows()[0]);
      setMode('EDIT');
    }
    const toggleMode = () =>{
      setMode('ADD');
    }

    const  handleDelete = (e) => {
      console.log("Delete")
        e.preventDefault();
        const result = gridRef.current.api.getSelectedRows()[0]._id;
        axios.delete('http://localhost:3000/cafe',{data:{'id':result}})
        .then(response => {
          setDeleteConfirmOpen(false);
          getCafeData();
        })
        .catch(error => {
          console.error(error);
        });

    }
   
    const handleOpenModal = () => {
      setOpen(!open);
  }

  const handleSelect = () => {
    console.log("Select")
    setSelectedRow(gridRef.current.api.getSelectedRows()[0]);
  }

   
  const defaultColDef = {
    flex: 1,
};


  

    return (
        <div className={ "ag-theme-quartz"} style={{height: '70vh',width:'90%',margin:'auto',marginTop:'20px',border:'2px solid beige',borderRadius:'20px'}} >

            <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} rowSelection={"single"} ref={gridRef} onRowSelected={handleSelect}/>

            <Button variant="contained" style={{marginTop:'20px',backgroundColor:'#C9A63B'}} onClick={ handleOpenModal}> Add Cafe </Button>

            <PopupWindow open={open} type={'CAFE'} mode={mode} toggleModal={handleOpenModal} editData={selectedRow} refreshData={getCafeData} toggleMode={toggleMode}/>
            <DeleteConfirmationModal open={deleteConfirmOpen}/>
        </div>
        
    );
};
export default Cafes;