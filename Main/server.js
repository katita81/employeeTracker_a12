const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db =    mysql.createConnection({
    host:   'localhost',
    user:   'florEchaiz',
    password:   'tjBaKUs6.',
    database:   'employees_db'
});



// GIVEN a command-line application that accepts user input


// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const promptUser = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Select one of the following options',
        name: 'userSelection',
        choices: ['view all departments', 
                'view all roles', 
                'view all employees', 
                'add a department', 
                'add a role', 
                'add an employee', 
                'update an employee role']

    }).then(answer => {
        // find out which they chose

        // WHEN I choose to view all departments
        // THEN I am presented with a formatted table showing department 
        //names and department ids
        if (answer.userSelection === 'view all departments') {
            db.query("select * from department", (err, result) => {
                console.table(result);
                promptUser();
            });
        }

        // WHEN I choose to add a department
        // THEN I am prompted to enter the name of the department and that department is added to the database
        if (answer.userSelection === 'add a department') {
            inquirer.prompt([
               
                {
                    type: 'input',
                    name: 'deparment',
                    message: 'Enter department name: ',
                }
            ])

                .then(input => {
                    var department = input.deparment;
                    // create and eng obj
                    // add our new obj to hour emp
                    db.query(`INSERT INTO department (name) values ('${department}')`)
                    console.log('Added '+ department +' to the database')
                    promptUser();
                })

            




        }

        if (answer.userSelection === 'update an employee role') {
            db.query("select CONCAT(first_name, ' ', last_name) as full_name from employee", (err, result) => {
                var options = [];
                for (var i = 0; i < result.length; i++) {
                    options.push(result[i].full_name)
                }
                console.log(options);
                inquirer.prompt({
                type: 'list',
                message: 'Which employees role do you want to update?',
                name: 'full_name',
                choices: options
                })
                .then(({full_name}) => {
                    db.query("select CONCAT(first_name, ' ', last_name) as full_name from employee", (err, result) => {
                        var options = [];
                        for (var i = 0; i < result.length; i++) {
                            options.push(result[i].full_name)
                        }  
                    })

                    
                });
            });
            
        }
    })
}



// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const init = () => {
    promptUser()
}
init();

