using SleepTrackerAPI.Repository.Helpers;

namespace SleepTrackerAPI.Repository
{
    public class SleepRepository : GenericRepository<Sleep>, ISleepRepository
    {
        private readonly SleepDbContext _context;

        public SleepRepository(SleepDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Sleep> CreateSleepAsync(Sleep sleep)
        {
            var result = _context.Sleeps.AddAsync(sleep);
            await _context.SaveChangesAsync();
            return result.Result.Entity;
        }

        public bool DeleteSleepById(int id)
        {
            Sleep sleep = _context.Sleeps.Find(id);

            if (sleep != null)
            {
                _context.Remove(sleep);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public PagedList<Sleep> GetAll(SleepParameters sleepParameters)
        {
            IQueryable<Sleep> sleepers = _context.Sleeps.AsQueryable();

            if (sleepParameters.SleepType != null && sleepParameters.StartOfSleep != null && sleepParameters.EndOfSleep == null)
            {
                sleepers = FindByCondition(o => o.TypeOfSleep >= sleepParameters.SleepType 
                    && o.StartOfSleep >= sleepParameters.StartOfSleep)
                    .OrderByDescending(o => o.EndOfSleep);
            }
            if (sleepParameters.SleepType != null && sleepParameters.StartOfSleep != null && sleepParameters.EndOfSleep != null)
            {
                sleepers = FindByCondition(o => o.TypeOfSleep >= sleepParameters.SleepType
                    && o.StartOfSleep >= sleepParameters.StartOfSleep
                    && o.EndOfSleep <= sleepParameters.EndOfSleep)
                    .OrderByDescending(o => o.EndOfSleep);
            }
            if (sleepParameters.SleepType != null && sleepParameters.StartOfSleep == null && sleepParameters.EndOfSleep == null)
            {
                sleepers = FindByCondition(o => o.TypeOfSleep >= sleepParameters.SleepType)
                    .OrderByDescending(o => o.EndOfSleep);
            }
            if (sleepParameters.SleepType == null && sleepParameters.StartOfSleep != null && sleepParameters.EndOfSleep == null)
            {
                sleepers = FindByCondition(o => o.StartOfSleep >= sleepParameters.StartOfSleep)
                    .OrderByDescending(o => o.EndOfSleep);
            }
            if (sleepParameters.SleepType == null && sleepParameters.StartOfSleep != null && sleepParameters.EndOfSleep != null)
            {
                sleepers = FindByCondition(o => o.StartOfSleep >= sleepParameters.StartOfSleep
                    && o.EndOfSleep <= sleepParameters.EndOfSleep)
                    .OrderByDescending (o => o.EndOfSleep);
            }
            if (sleepParameters.SleepType == null && sleepParameters.StartOfSleep == null && sleepParameters.EndOfSleep != null)
            {
                sleepers = FindByCondition(o => o.EndOfSleep <= sleepParameters.EndOfSleep)
                    .OrderByDescending(o => o.EndOfSleep);
            }

            return PagedList<Sleep>.ToPagedList(sleepers,
                    sleepParameters.PageNumber,
                    sleepParameters.PageSize,
                    sleepParameters.SleepType);
        }

        public async Task<List<Sleep>> GetAllSleepAsync()
        {
            return await _context.Sleeps.OrderByDescending(o => o.StartOfSleep).ToListAsync();
        }

        public async Task<Sleep> GetSleepByIdAsync(int id)
        {
            return await _context.Sleeps.Where(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Sleep> UpdateSleepAsync(Sleep sleep)
        {
            var result = await _context.Sleeps.FirstOrDefaultAsync(s => s.Id == sleep.Id);

            if (result != null)
            {
                result.StartOfSleep = sleep.StartOfSleep;
                result.EndOfSleep = sleep.EndOfSleep;
                result.TypeOfSleep = sleep.TypeOfSleep;

                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }
    }
}