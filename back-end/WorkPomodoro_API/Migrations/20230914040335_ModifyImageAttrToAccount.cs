using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPomodoro_API.Migrations
{
    /// <inheritdoc />
    public partial class ModifyImageAttrToAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                "image",
                "accounts",
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn("image", "accounts");
        }
    }
}
