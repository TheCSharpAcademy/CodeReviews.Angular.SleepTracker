using System.Collections.Generic;

namespace SleepTracker.Models;

public class SleepLogDtoPageData(List<SleepLogDto> sleepLogs)
{
    public List<SleepLogDto> SleepLogs {get; set;} = sleepLogs;
    public int CurrentPage {get; set;} = 1;
    public int PageSize {get; set;} = 5;
    public int TotalPages {get; set;}
    public int TotalRecords {get; set;}
}