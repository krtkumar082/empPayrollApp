let isUpdate=false;
let empPayrollObj={};

window.addEventListener('DOMContentLoaded',(event) => {
  const name = document.querySelector("#name");
  name.addEventListener('input', function(){
  if(name.value.length == 0){
    setTextValue(".text-error", "");
    return;
  }
  try{
    (new EmployeePayrollData()).name = name.value;
    setTextValue(".text-error", "");
  }catch(e){
    setTextValue(".text-error", e);
  }
});

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input',function(){
      output.textContent = salary.value;
      });

const date=document.querySelector('#date');
date.addEventListener("input", function(){
   let startDate=getInputValueById('#day')+" " +getInputValueById('#month')+" " +getInputValueById('#year');
   try{
   new EmployeePayrollData().startDate = new Date(Date.parse(startDate));
    setTextValue(".date-error","");
  }catch(e){
    setTextValue(".date-error",e);
  }
});

checkForUpdate();

});

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try{
    setEmployeePayrollObject();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(site_properties.home_page);
  }catch(e){
      return;
  }
}

function createAndUpdateStorage(){
  let employeePayrollList = JSON.parse(localStorage.getItem("employeePayrollList"));
  if(employeePayrollList != undefined){
     let emp=employeePayrollList.find(emp=>emp._id==empPayrollObj._id);
     if(!emp)employeePayrollList.push(createEmployeePayroll())
  else{
    const index = employeePayrollList.map(emp => emp._id)
                 .indexOf(emp._id);
    employeePayrollList.splice(index, 1, createEmpData(emp._id));
  }
}else
    employeePayrollList=[createEmployeePayroll()];
  alert(employeePayrollList.toString());
  localStorage.setItem("employeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmpData = (id) => {
  let employee = new EmployeePayrollData();
  if(!id) employee.id = createNewId();
  else employee.id = id;
  setEmpPayrollData(employee);
  return employee;
};

const setEmpPayrollData = (employee) => {
  try{
    employee.name = empPayrollObj._name;
  }catch(e){
    setTextValue(".text-error", e);
    throw e;
  }
  employee.picture = empPayrollObj._picture;
  employee.gender = empPayrollObj._gender;
  employee.department = empPayrollObj._department;
  employee.salary = empPayrollObj._salary;
  employee.note = empPayrollObj._note;
  try{
    employee.startDate = new Date(Date.parse(empPayrollObj._startDate));
  }catch(e){
    setTextValue(".date-error", e);
    throw e;
  }
  alert(employee.toString());
};


const createEmployeePayroll = () =>{
  let employeePayrollData = new EmployeePayrollData();
  employeePayrollData.id=createNewId();
  try{
      employeePayrollData.name = getInputValueById('#name');
  }catch(e){
      setTextValue('.text-error',e);
      throw e;
  }

  employeePayrollData.picture=getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
  employeePayrollData.department=getSelectedValues('[name = department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.note = getInputValueById('#notes');
  let date = getInputValueById('#day') + " "+getInputValueById('#month')+" "+getInputValueById('#year');
  employeePayrollData.date = Date.parse(date);
  alert(employeePayrollData.toString());
  return employeePayrollData;
}

const setEmployeePayrollObject = () => {
  empPayrollObj._name= document.getElementById("name").value;
  empPayrollObj._picture = document.querySelector('input[name = profile]:checked').value;
  empPayrollObj._gender = document.querySelector('input[name = gender]:checked').value;
  empPayrollObj._department =getSelectedValues('[name=department]');
  empPayrollObj._salary = document.getElementById("salary").value;
 var day = document.getElementById("day").value;
 var month = document.getElementById("month").value;
 var year = document.getElementById("year").value;
 empPayrollObj._note = document.getElementById("notes").value;
 let date = getInputValueById('#day') + " "+getInputValueById('#month')+" "+getInputValueById('#year');
 empPayrollObj._startDate = date;
};

const createNewId = () => {
  let empId = localStorage.getItem("EmployeeID");
  empId = !empId ? 1 : (parseInt(empId) + 1).toString();
  localStorage.setItem("EmployeeID", empId);
  return empId;
};

const getSelectedValues = (propertyValue) =>{
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
      if(item.checked) selItems.push(item.value);
  });
  return selItems;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}

const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
}

const setForm = () => {
  setValue("#name", empPayrollObj._name);
  setSelectedValues("[name=profile]", empPayrollObj._picture);
  setSelectedValues("[name=gender]", empPayrollObj._gender);
  setSelectedValues("[name=department]", empPayrollObj._department);
  setValue("#salary", empPayrollObj._salary);
  setTextValue(".salary-output", empPayrollObj._salary);
  setValue("#notes", empPayrollObj._note);
  let date =stringifyDate(empPayrollObj._startDate).split(" ");
  let month = new Date(date).getMonth() + 1;
  setValue("#day", date[0]);
  setValue("#month",date[1]);
  setValue("#year", date[2]);
}



const resetForm= () => {
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary','');
  setValue('#note','');
  setSelectedIndex("#day", 0);
  setSelectedIndex("#month", 0);
  setSelectedIndex("#year", 0);
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
     if(Array.isArray(value)){
       if(value.includes(item.value)) item.checked = true;
     }
     else if(item.value == value) item.checked = true;
  });
};

const unsetSelectedValues = (propertValue) => {
  let allItems = document.querySelectorAll(propertValue);
  allItems.forEach(item => {
      item.checked = false;
  });
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}
const checkForUpdate=()=>{
  const empPayrollJson=localStorage.getItem('editEmp');
  isUpdate=empPayrollJson?true:false;
  if(!isUpdate)return;
  empPayrollObj=JSON.parse(empPayrollJson);
  setForm();
}