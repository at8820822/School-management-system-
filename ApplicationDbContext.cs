using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Student> Students { get; set; }  // Students Table
    public DbSet<Teacher> Teachers { get; set; }  // Teachers Table
}

// Assuming the Teacher class is missing, here is a possible implementation

