import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import React, { useState , useEffect,useRef} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, DialogActions, DialogContent ,Dialog} from '@mui/material';
import PopupWindow from './popupWindow';
import axios from 'axios';
import { useRouterState } from '@tanstack/react-router'
import '../App.css';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function Employees() {
    const gridRef = useRef(null);
    const [open,setOpen]  = useState(false);
    const [deleteConfirmOpen,setDeleteConfirmOpen]  = useState(false); 
    const [rowData, setRowData] = useState([]);
    const [mode,setMode] = useState('ADD');
    const [selectedRow,setSelectedRow] = useState('');
   const currentRouteState = useRouterState();
    useEffect(() => { getEmpData()}, []);

    const getEmpData = () => {
      let getUrl = 'http://localhost:3000/employees';
         getUrl = currentRouteState.location['search']?.CafeName?.length >0 ? getUrl.concat('?CafeName='+currentRouteState.location['search']?.CafeName) : getUrl;
          axios.get(getUrl)
            .then(response => {
              setRowData(response.data);
            })
            .catch(error => {
              console.error(error);
            });
    }
    const getAllEmpData= () => {
      axios.get('http://localhost:3000/employees')
      .then(response => {
        setRowData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
    

      const editIconRenderer = () => { return <div>   <button className="btn-transparent" onClick={(e)=>handleEdit(e)}> 
      <EditIcon  style={{fontSize:'medium',marginRight:'20px',color:'blue' }}/>  </button>
      <button className="btn-transparent" onClick={ () => setDeleteConfirmOpen(true)}> 
      <DeleteIcon style={{fontSize:'medium',color:'crimson'}}/> </button> 
</div> 
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

  const  handleDelete = (e) => {
      e.preventDefault();
      const result = gridRef.current.api.getSelectedRows()[0]._id;
      console.log(result)
      axios.delete('http://localhost:3000/employee',{data:{'id':result}})
      .then(response => {
        setDeleteConfirmOpen(false);
        getEmpData();
      })
      .catch(error => {
        console.error(error);
      });

  }
 
 
  const handleOpenModal = () => {
    setOpen(!open);
}
const toggleMode = () =>{
  console.log("Mode set to add")
  setMode('ADD');
}

const handleSelect = () => {
  console.log("Select")
  setSelectedRow(gridRef.current.api.getSelectedRows()[0]);
}


    const [colDefs, setColDefs] = useState([

        { field: 'Name' },
        { field: 'Email' },
        { field: 'PhoneNumber' },
        { field: 'DaysWorked' },
        { field: 'CafeName' },
        {field: 'Edit/Delete' , cellRenderer : editIconRenderer
       }
    ]);

    const defaultColDef = {
        flex: 1,
    };

   
    // Container: Defines the grid's theme & dimensions.
    return (
        <div
            className={
                "ag-theme-quartz"
            } style={{height: '60vh',width:'95%',margin:'auto',marginTop:'20px',border:'2px solid beige',borderRadius:'20px'}}
           
        >

            <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} rowSelection={"single"} ref={gridRef} onRowSelected={handleSelect} />

            <Button variant="contained" style={{marginTop:'20px',backgroundColor:'#C9A63B'}}  onClick={handleOpenModal}>  Add Employee  </Button>
            <PopupWindow open={open} type={'EMPLOYEE'} mode={mode} toggleModal={handleOpenModal} editData={selectedRow} toggleMode={toggleMode} refreshData={getAllEmpData} />
            <DeleteConfirmationModal open={deleteConfirmOpen}/>
        </div>
        
    );
};

export default Employees;
