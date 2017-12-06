using Microsoft.EntityFrameworkCore;

namespace EmployeeUi.Data
{
   public class DataContext : DbContext
   {
      public DataContext(DbContextOptions<DataContext> options) : base(options)
      {
      }

      public DbSet<Department> Department { get; set; }
      public DbSet<Employee> Employee { get; set; }

      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
         modelBuilder.Entity<Employee>().ToTable("Employee");
         modelBuilder.Entity<Department>().ToTable("Department");
      }
   }
}