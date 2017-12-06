using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EmployeeUi.Data;

namespace EmployeeUi.Controllers
{
   [Produces("application/json")]
   [Route("api/Employee")]
   public class EmployeeController : Controller
   {
      private readonly DataContext _context;

      public EmployeeController(DataContext context)
      {
         _context = context;
      }

      [Route("~/api/GetAllEmployees")]
      [HttpGet]
      public async Task<ICollection<Employee>> GetAllEmployees()
      {
         return await _context.Employee.ToListAsync();
      }

      [Route("~/api/AddEmployee")]
      [HttpPost]
      public async Task<Employee> AddEmployee([FromBody]Employee item)
      {
         _context.Add(item);
         await _context.SaveChangesAsync();
         return item;
      }

      [Route("~/api/UpdateEmployee")]
      [HttpPut]
      public async Task<Employee> UpdateEmployee([FromBody]Employee item)
      {
         _context.Update(item);
         await _context.SaveChangesAsync();

         return item;
      }

      [Route("~/api/DeleteEmployee/{id}")]
      [HttpDelete]
      public async Task DeleteEmployee(int id)
      {
         var findEmployee = _context.Employee.Find(id);
         if (findEmployee != null)
            _context.Employee.Remove(findEmployee);
         await _context.SaveChangesAsync();
      }
   }
}