using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Models;
using System.Linq;
using System.Security.Claims;

[ApiController]
[Route("api/protected")]
public class ProtectedController : ControllerBase
{
    private static readonly List<User> Users = new()
    {
        new User { Username = "admin", Email = "admin@example.com", Password = "admin123", Role = "Admin" },
        new User { Username = "teacher", Email = "teacher@example.com", Password = "teacher123", Role = "Teacher" },
        new User { Username = "student", Email = "student@example.com", Password = "student123", Role = "Student" }
    };

    // Endpoint accessible by any authenticated user
    [Authorize]
    [HttpGet("user")]
    public IActionResult GetUserData()
    {
        var userEmail = User.FindFirstValue(ClaimTypes.Name);  // Extract user email from JWT token
        var user = Users.FirstOrDefault(u => u.Email == userEmail);
        if (user == null) return Unauthorized(new { message = "User not found" });

        return Ok(new { message = "Welcome " + user.Username, user = user });
    }

    // Endpoint accessible only by Admin
    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public IActionResult GetAdminData()
    {
        return Ok(new { message = "Hello, Admin! You can access all data." });
    }

    // Endpoint accessible only by Teacher
    [Authorize(Roles = "Teacher")]
    [HttpGet("teacher")]
    public IActionResult GetTeacherData()
    {
        var userEmail = User.FindFirstValue(ClaimTypes.Name);
        var user = Users.FirstOrDefault(u => u.Email == userEmail);
        if (user == null) return Unauthorized(new { message = "Teacher not found" });

        return Ok(new { message = "Hello, Teacher! You can only access your data.", teacher = user });
    }

    // Endpoint accessible only by Student
    [Authorize(Roles = "Student")]
    [HttpGet("student")]
    public IActionResult GetStudentData()
    {
        var userEmail = User.FindFirstValue(ClaimTypes.Name);
        var user = Users.FirstOrDefault(u => u.Email == userEmail);
        if (user == null) return Unauthorized(new { message = "Student not found" });

        return Ok(new { message = "Hello, Student! You can only access your data.", student = user });
    }
}
