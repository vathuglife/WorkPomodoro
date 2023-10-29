using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPomodoro_API.Migrations
{
    /// <inheritdoc />
    public partial class Song_AddPlaylistStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsInPlaylist",
                table: "Songs",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInPlaylist",
                table: "Songs");
        }
    }
}
