using SchoolManagementSystem.Models;

public interface ITeacherService
{
    Task<IEnumerable<Teacher>> GetAllTeachers();
    Task<Teacher> GetTeacherByEmailAsync(string email);
    Task<Teacher> GetTeacherById(int id);
    Task<Teacher> AddTeacher(Teacher teacher);
    Task<bool> UpdateTeacher(int id, Teacher teacher);
    Task<bool> DeleteTeacher(int id);
}
