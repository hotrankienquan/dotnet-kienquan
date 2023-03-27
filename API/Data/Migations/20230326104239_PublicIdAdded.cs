using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migations
{
    /// <inheritdoc />
    public partial class PublicIdAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57b2c719-9af2-4199-81e5-274247034537");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d0618f7e-e503-418a-be41-1fecc366f259");

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Posts",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "65d63b31-5715-4c5b-85b7-ede7f6ee5f87", null, "Member", "MEMBER" },
                    { "d83369f3-de88-473e-80b3-2859c7fb1a13", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "65d63b31-5715-4c5b-85b7-ede7f6ee5f87");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d83369f3-de88-473e-80b3-2859c7fb1a13");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Posts");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "57b2c719-9af2-4199-81e5-274247034537", null, "Member", "MEMBER" },
                    { "d0618f7e-e503-418a-be41-1fecc366f259", null, "Admin", "ADMIN" }
                });
        }
    }
}
