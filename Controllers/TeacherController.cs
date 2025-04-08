using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Models;

[Route("api/[controller]")]
[ApiController]
public class TeacherController : ControllerBase
{
    private readonly ITeacherService _teacherService;

    public TeacherController(ITeacherService teacherService)
    {
        _teacherService = teacherService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachers()
    {
        var teachers = await _teacherService.GetAllTeachers();
        return Ok(teachers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Teacher>> GetTeacher(int id)
    {
        var teacher = await _teacherService.GetTeacherById(id);
        if (teacher == null) return NotFound();
        return Ok(teacher);
    }

    [HttpPost]
    public async Task<ActionResult<Teacher>> PostTeacher([FromBody] Teacher teacher)
    {
        var newTeacher = await _teacherService.AddTeacher(teacher);
        return CreatedAtAction(nameof(GetTeacher), new { id = newTeacher.Id }, newTeacher);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTeacher(int id, Teacher teacher)
    {
        var updated = await _teacherService.UpdateTeacher(id, teacher);
        if (!updated) return BadRequest();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeacher(int id)
    {
        var deleted = await _teacherService.DeleteTeacher(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
