using System.Linq.Expressions;

namespace SleepTrackerAPI.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly SleepDbContext _context;
        private readonly DbSet<T> _entities;

        public GenericRepository(SleepDbContext context)
        {
            _context = context;
            _entities = _context.Set<T>();
        }

        public async Task CreateAsync(T entity) => await _context.AddAsync(entity);

        public async Task DeleteAsync(int id)
        {
            T exisiting = await _entities.FindAsync(id);
            _entities.Remove(exisiting);
        }

        public IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) 
        {
            return _context.Set<T>()
                .Where(expression)
                .AsNoTracking();
        }

        public async Task<IEnumerable<T>> GetAllAsync() => await _entities.ToListAsync();

        public async Task<T> GetByIdAsync(int id) => await _entities.FindAsync(id);

        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();

        public void UpdateAsync(T entity)
        {
            _context.Update(entity);
        }
    }
}