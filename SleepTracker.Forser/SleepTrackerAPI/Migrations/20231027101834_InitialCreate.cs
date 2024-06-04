using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SleepTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sleeps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartOfSleep = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndOfSleep = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TypeOfSleep = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sleeps", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sleeps");
        }
    }
}
