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
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const dateError = document.querySelector(".date-error");
    startDate.addEventListener("input", async function(){
       try{
         (new EmployeePayrollData()).startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        dateError.textContent = "";
        console.log(day, month, year);
      }catch(e){
        dateError.textContent = "Invalid Date";
      }
    });
    
    });

function save(){
    var name= document.getElementById("name").value;
    var picture = document.querySelector('input[name = profile]:checked').value;
    var gender = document.querySelector('input[name = gender]:checked').value;
    var department =document.querySelector('input[name = department]:checked').value;
    var salary = document.getElementById("salary").value;
   var day = document.getElementById("day").value;
   var month = document.getElementById("month").value;
   var year = document.getElementById("year").value;
    var note = document.getElementById("notes").value;
    var startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
  
   const employee = new EmployeePayrollData(name, picture, gender, department, salary, startDate, note);
  
   alert("Thank you. your data is saved" + employee.toString());
  }