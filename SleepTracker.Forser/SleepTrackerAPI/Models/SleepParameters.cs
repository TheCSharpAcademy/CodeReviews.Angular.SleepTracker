namespace SleepTrackerAPI.Models
{
    public class SleepParameters
    {
        public int? SleepType { get; set; }
        public DateTime? StartOfSleep { get; set; }
        public DateTime? EndOfSleep { get; set; }
        const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}