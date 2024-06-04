using System.Linq.Expressions;

namespace SleepTrackerAPI.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<IEnumerable<T>> GetAllAsync();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        Task<T> GetByIdAsync(int id);
        Task CreateAsync(T entity);
        void UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
    }
}