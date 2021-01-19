const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");

const buildTeam = async() =>
{
    const employees = [];
    let stop;

    do
    {
        let type = await inquirer.prompt
        (
            [{
                type: 'list',
                name: 'employeeType',
                message: 'What type of employee are you adding?',
                choices: ['Manager', 'Engineer', 'Intern']
            }]
        );
        
        console.log(type.employeeType);

        switch(type.employeeType)
        {
            case 'Manager':
                employees.push(await createManager());
                break;
            
            case 'Engineer':
                employees.push(await createEngineer());
                break;
            
            case 'Intern':
                employees.push(await createIntern());
                break;
        }

        stop = await inquirer.prompt
        (
            [{
                type: 'list',
                name: 'continue',
                message: 'Add more employees?',
                choices: ['yes', 'no']
            }]
        );

    console.log(stop.continue)    
    }while(stop.continue === 'yes');

    writeFileAsync(outputPath, render(employees));
}

const createManager = async() =>
{
    let manager = await inquirer.prompt
    ([
        {
            type: 'input',
            name: 'name',
            message: 'Name: '
        },
        {
            type: 'input',
            name: 'id',
            input: 'ID: '
        },
        {
            type: 'input',
            name: 'email',
            input: 'Email: '
        },
        {
            type: 'input',
            name: 'office',
            message: 'Office Number: '
        }
    ]);

    return new Manager(manager.name, manager.id, manager.email, manager.office);
}

const createEngineer = async() =>
{
    let engineer = await inquirer.prompt
    ([
        {
            type: 'input',
            name: 'name',
            message: 'Name: '
        },
        {
            type: 'input',
            name: 'id',
            input: 'ID: '
        },
        {
            type: 'input',
            name: 'email',
            input: 'Email: '
        },
        {
            type: 'input',
            name: 'github',
            message: 'GitHub: '
        }
    ]);

    return new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
}

const createIntern = async() =>
{
    let intern = await inquirer.prompt
    ([
        {
            type: 'input',
            name: 'name',
            message: 'Name: '
        },
        {
            type: 'input',
            name: 'id',
            input: 'ID: '
        },
        {
            type: 'input',
            name: 'email',
            input: 'Email: '
        },
        {
            type: 'input',
            name: 'school',
            message: 'School: '
        }
    ]);

    return new Intern(intern.name, intern.id, intern.email, intern.school);
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
buildTeam();