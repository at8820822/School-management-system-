using System.Collections.Generic;
using System.Threading.Tasks;

public interface IStudentService
{
    //define bussines logic inside interface
    
   
 

    Task<IEnumerable<Student>> GetAllStudentsAsync();
    Task<Student> GetStudentByIdAsync(int id);

    Task<Student> GetStudentByEmailAsync(string email);
    Task<Student> CreateStudentAsync(Student student);
    Task<bool> UpdateStudentAsync(int id, Student student);
    Task<bool> DeleteStudentAsync(int id);
}
