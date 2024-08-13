const express = require('express');
const Cafe = require('./cafe');
const Employee = require('./employee');
const router = express.Router();

//Cafe Routes

router.post('/cafe', async (req, res) => {
  const { Name, Description, Location } = req.body;

  try {
    const cafe = new Cafe({Name, Description, Location  });
    await cafe.save();
    res.send(cafe);
    console.log(Name , '- Cafe added Successfully')
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});




router.get('/cafes', async (req, res) => {
  try {
    const cafes = await Cafe.find(req.query);
    res.send(cafes);
    console.log(cafes.length,"cafes reterived")
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.put('/cafe', async (req, res) => {
  
  try {
   console.log(req.body)
    const cafes = await Cafe.findByIdAndUpdate(req.body._id,{Name:req.body.Name,Description:req.body.Description,Location:req.body.Location});
    res.send(cafes);
    console.log(req.body.Name , '- Cafe updated  Successfully')
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});



router.delete('/cafe', async (req, res) => {
  try {
  
    const cafe = await Cafe.findByIdAndDelete(req.body.id);
    res.send(cafe);
    console.log(req.body.id," deleted")
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Employee Routes


router.post('/employee', async (req, res) => {
  const { Name,Email, PhoneNumber,CafeName,DaysWorked } = req.body;

  try {
    const emp = new Employee({Name, Email, PhoneNumber,CafeName,DaysWorked });
    await emp.save();
    res.send(emp);      
    console.log(Name , '- Employee added Successfully')
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/employees', async (req, res) => {
    try {
      const employees = await Employee.find(req.query);
      res.send(employees);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  router.put('/employee', async (req, res) => {
  
    try {
     console.log(req.body)
      const cafes = await Employee.findByIdAndUpdate(req.body._id,{Name:req.body.Name,Email:req.body.Email,PhoneNumber:req.body.PhoneNumber,CafeName:req.body.CafeName,DaysWorked:req.body.DaysWorked});
      res.send(cafes);
      console.log(req.body.Name , '- Employee updated  Successfully')
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  
  
  router.delete('/employee', async (req, res) => {
    try {
    
      const emp = await Employee.findByIdAndDelete(req.body.id);
      res.send(emp);
      console.log(req.body.id," deleted")
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

module.exports = router;