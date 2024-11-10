using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SleepTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SleepLogs",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SleepTime = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SleepLogs", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "SleepLogs",
                columns: new[] { "Id", "Date", "SleepTime" },
                values: new object[,]
                {
                    { "01325aa5-5b17-4f73-a19d-884b4a160c4b", "2024-08-28", 17952 },
                    { "0fb1e2ed-0a02-4f13-bc82-b7b42d0cb2fd", "2024-09-04", 18276 },
                    { "13e4295b-7e26-40ed-a2cb-626b0eb5ed4b", "2024-09-02", 14528 },
                    { "157c1e45-d352-4e2e-a29a-7296c76b62e1", "2024-08-26", 13300 },
                    { "24880a7b-2930-4b96-8ddc-b32e28fa1413", "2024-08-29", 18051 },
                    { "41977178-7d4a-42db-816c-a71af326f4cc", "2024-09-10", 8237 },
                    { "586a0b2e-fe1e-4ea4-b752-39e1fbabd28d", "2024-09-12", 6126 },
                    { "5c535dbd-d0c5-43bb-8a24-507938fa2e9f", "2024-09-11", 10314 },
                    { "60870e47-ffaf-411e-bde9-2405568b2c2e", "2024-09-05", 8156 },
                    { "6db0de0e-c5cd-4548-ae59-08958f18a805", "2024-08-31", 7757 },
                    { "6f6c28da-bc21-4983-a7ed-1881dffa6205", "2024-08-25", 9063 },
                    { "76cd9fcb-e7fa-4292-8939-2482ae5b6009", "2024-09-01", 14239 },
                    { "772b91cf-4e05-4ebc-835e-4f5fef6d5a16", "2024-09-07", 17898 },
                    { "79e7da68-c628-482d-b254-82b5866face1", "2024-09-06", 17338 },
                    { "99ccaa60-8992-4fc2-9972-dc88dc8c8eb6", "2024-08-27", 11335 },
                    { "9bee459c-969b-4b9b-b8f8-6266b0ef0623", "2024-09-03", 16607 },
                    { "d4188287-b518-4751-b695-1296bb0bdc0b", "2024-09-08", 13824 },
                    { "d8cf77a6-f0e4-456c-a531-8716ae097a55", "2024-08-30", 6860 },
                    { "d90fa6c3-10eb-40d6-b6fa-fbe97cfe9fcd", "2024-09-09", 11654 },
                    { "febf2b3f-68f6-4fc4-9cd4-6d84334e0485", "2024-09-13", 11780 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SleepLogs");
        }
    }
}
