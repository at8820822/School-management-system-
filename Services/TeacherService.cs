using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Models;

public class TeacherService : ITeacherService
{
    private readonly ApplicationDbContext _context;

    public TeacherService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Teacher>> GetAllTeachers()
    {
        return await _context.Teachers.ToListAsync();
    }

    public async Task<Teacher> GetTeacherById(int id)
    {
        return await _context.Teachers.FindAsync(id);
    }
    public async Task<Teacher> GetTeacherByEmailAsync(string email)  // 👈 Implement this
    {
        return await _context.Teachers.FirstOrDefaultAsync(t => t.Email == email);
    }
    public async Task<Teacher> AddTeacher(Teacher teacher)
    {
        _context.Teachers.Add(teacher);
        await _context.SaveChangesAsync();
        return teacher;
    }

    public async Task<bool> UpdateTeacher(int id, Teacher teacher)
    {
        if (id != teacher.Id) return false;

        _context.Entry(teacher).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateConcurrencyException)
        {
            return false;
        }
    }

    public async Task<bool> DeleteTeacher(int id)
    {
        var teacher = await _context.Teachers.FindAsync(id);
        if (teacher == null) return false;

        _context.Teachers.Remove(teacher);
        await _context.SaveChangesAsync();
        return true;
    }
}
