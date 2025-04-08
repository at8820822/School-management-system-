using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Models;


[ApiController]
[Route("api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly JwtTokenGenerator _jwtTokenGenerator;
    private readonly IStudentService _studentService;  // Service to fetch real student data
    private readonly ITeacherService _teacherService;
    public AuthenticationController(IConfiguration configuration, IStudentService studentService, ITeacherService teacherService)
    {
        _jwtTokenGenerator = new JwtTokenGenerator(configuration);
        _studentService = studentService;
        _teacherService = teacherService;
    }

    // Static user list (could be replaced by DB or other source)
    private static readonly List<User> Users = new()
    {
        new User { Username = "admin", Email = "admin@example.com", Password = "admin123", Role = "Admin" },
        new User { Username = "teacher", Email = "teacher@example.com", Password = "teacher123", Role = "Teacher" },
        new User { Username = "student", Email = "student@example.com", Password = "student123", Role = "Student" }
    };

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
    {
        var user = Users.Find(u => u.Email == request.Email && u.Password == request.Password);
        if (user == null)
            return Unauthorized(new { message = "Invalid credentials" });

        var token = _jwtTokenGenerator.GenerateToken(user.Email, user.Role);

        // Get student data if role is Student
        Student? studentData = null;
        if (user.Role == "Student")
        {
            studentData = await _studentService.GetStudentByEmailAsync(user.Email);
        }

        // Get teacher data if role is Teacher (optional, if you need)
        Teacher ? teacherData = null;
        if (user.Role == "Teacher")
        {
            teacherData = await _teacherService.GetTeacherByEmailAsync(user.Email);
        }

        return Ok(new
        {
            Token = token,
            Role = user.Role,
            StudentData = studentData,
            TeacherData = teacherData
        });
    }




    [HttpPost("signup")]
    public IActionResult Signup([FromBody] UserSignupRequest request)
    {
        if (Users.Exists(u => u.Email == request.Email || u.Username == request.Username))
            return BadRequest(new { message = "User with this email or username already exists" });

        Users.Add(new User { Username = request.Username, Email = request.Email, Password = request.Password, Role = request.Role });
        return Ok(new { message = "User registered successfully" });
    }
}






