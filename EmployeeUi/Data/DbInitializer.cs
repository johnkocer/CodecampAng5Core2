using EmployeeUi.Data;
using System;
using System.Linq;

namespace EmployeeUi.Data
{
   public static class DbInitializer
   {
      public static void Initialize(DataContext context)
      {
         context.Database.EnsureCreated();

         // Look for any employee.
         if (context.Employee.Any())
         {
            return;   // DB has been seeded
         }

         var departments = new Department[]
         {
            new Department{Head="Grove",Location="SE AZ",  Name="Computer Science"},
            new Department{Head="Walker",Location="NC",  Name="Mathematic"}
         };

         foreach (Department d in departments)
         {
            context.Department.Add(d);
         }
         context.SaveChanges();
         int departmentId = context.Department.ToList().FirstOrDefault().Id;

         var employees = new Employee[]
         {

                new Employee { DepartmentId = departmentId, Gender = "Male", Name = "Mike", Salary = 8000  },
                new Employee { DepartmentId = departmentId, Gender = "Male", Name = "Adam", Salary = 5000   },
                new Employee { DepartmentId = departmentId, Gender = "Female", Name = "Jacky", Salary = 9000  },
         };

         foreach (Employee e in employees)
         {
            context.Employee.Add(e);
         }
         context.SaveChanges();

      }
   }
}