window.addEventListener('DOMContentLoaded', (event) => {

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function(){
    output.textContent = salary.value;
  });
  
  const name = document.querySelector("#name");
  const textError = document.querySelector(".text-error");
  name.addEventListener('input', function(){
    if(name.value.length == 0){
      textError.textContent = "";
      return;
    }
    try{
      (new EmployeePayrollData()).name = name.value;
      textError.textContent = "";
    }catch(e){
      textError.textContent = e;
    }
  });
  
  const startDate = document.querySelector("#startDate");
  const day = document.querySelector("#day");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");
  const dateError = document.querySelector(".date-error");
  startDate.addEventListener("input", async function(){
     try{
     new EmployeePayrollData().startDate = new Date( Date.UTC(year.value, month.value - 1, day.value));
      dateError.textContent = "";
    }catch(e){
      dateError.textContent = e;
    }
  });
  });
  
  const save = () => {
     try{
       let employee = saveData();
       createAndUpdateStorage(employee);
     }catch(e){
       return;
     }
  };
  
  function createAndUpdateStorage(employee){
    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeeList != undefined) employeeList.push(employee);
    else employeeList = [employee];
  
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeList));
    alert(employeeList.toString());
  }
  
  const getSelectedValues = (property) => {
    let allItems = document.querySelectorAll(property);
    let setItems = [];
    allItems.forEach(item => {
      if(item.checked) setItems.push(item.value);
    });
    return setItems;
  };
  
  function saveData(){
    let employee = new EmployeePayrollData();
    employee.name= document.getElementById("name").value;
    employee.picture = document.querySelector('input[name = profile]:checked').value;
    employee.gender = document.querySelector('input[name = gender]:checked').value;
    employee.department =getSelectedValues('[name=department]');
    employee.salary = document.getElementById("salary").value;
   var day = document.getElementById("day").value;
   var month = document.getElementById("month").value;
   var year = document.getElementById("year").value;
    employee.note = document.getElementById("notes").value;
    employee.startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
   return employee;
  }
  
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
  };
  
  const unsetSelectedValues = (propertyValue) =>{
   let allItems = document.querySelectorAll(propertyValue);
   allItems.forEach(item => {
     item.checked = false;
   });
  };
  
  const resetForm = () => {
    setValue("#name", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#salary", "");
    setValue("#notes", "");
    setValue("#day","1");
    setValue("#month","January");
    setValue("#year", "2020");
  };