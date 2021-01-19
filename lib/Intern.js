// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Intern = function(name, id, email, school)
{
    this.name = name;
    this.id = id;
    this.email = email;
    this.school = school;
    this.getSchool = () =>
    {
        return this.school;
    }
    this.getRole = () =>
    {
        return "Intern";
    }
};

module.exports = Intern;