# Sleep Tracker
## Description
### Sleep Tracker is an application designed to help users monitor their sleep patterns. Users can conveniently track their sleep time by either setting a timer or managing their sleep data manually through CRUD operations.

## Configuration
### API
1. Go to **appsetting.json** and replace **ConnectionStrings:Default** with yours:
```
"ConnectionStrings": {
    "Default": "Server=[...];Port=[...];Database=[...];User Id=[...];Password=[...]"
  }
```
2. Go to **Program.cs** and make sure that you are using appropiate Database with EF:
```
builder.Services.AddDbContext<SleepSessionsContext>(options =>
{
  options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});
```
3. In your Package Manager Console run: 
```
Add-Migration Initial
Update-Database
```

### UI
1. Go to **config/config.ts** and update **url**.
2. Run:
```
npm install
```

## Technologies Used
- C#
- ASP.NET Core Web API
- PostgreSQL
- Entity Framework Core
- Angular
- Angular Material
- Sass

Feel free to explore and enhance your sleep routine with Sleep Tracker!