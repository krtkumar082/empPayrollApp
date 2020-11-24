let isUpdate=false;
let empPayrollObj={};

window.addEventListener('DOMContentLoaded',(event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input',function(){
      if(name.value.length==0)
          textError.textContent="";
          return;
      try{
          (new EmployeePayrollData()).name = name.value;
          textError.textContent = "";
      }catch(e){
          textError.textContent= e;
      }
  });

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input',function(){
      output.textContent = salary.value;
      });
      checkForUpdate();
  });

const save = () => {
  try{
      let employeePayrollData = createEmployeePayroll();
      createAndUpdateStorage(employeePayrollData);
  }catch(e){
      return;
  }
}

function createAndUpdateStorage(employeePayrollData){
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList != undefined){
      employeePayrollList.push(employeePayrollData);
  }else{
      employeePayrollList = [employeePayrollData]
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () =>{
  let employeePayrollData = new EmployeePayrollData();
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
};

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
  let date = stringifyDate(empPayrollObj._startDate).split(" ");
  let month = new Date(date).getMonth() + 1;
  setValue("#day", date[0]);
  setValue("#month", month);
  setValue("#year", date[2]);
};

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