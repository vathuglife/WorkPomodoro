using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPomodoro_API.Migrations
{
    /// <inheritdoc />
    public partial class DockerDbMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "accounts",
                columns: table => new
                {
                    uid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "char(60)", unicode: false, fixedLength: true, maxLength: 60, nullable: false),
                    role = table.Column<string>(type: "char(2)", unicode: false, fixedLength: true, maxLength: 2, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: true),
                    image = table.Column<byte[]>(type: "varbinary(max)", nullable: false, defaultValueSql: "(0x)")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__accounts__DD701264A3FCF6EB", x => x.uid);
                });

            migrationBuilder.CreateTable(
                name: "Songs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    duration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    thumbnail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    accountUid = table.Column<int>(type: "int", nullable: false),
                    audioBase64 = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Songs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Songs_accounts_accountUid",
                        column: x => x.accountUid,
                        principalTable: "accounts",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tasks",
                columns: table => new
                {
                    tid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    type = table.Column<bool>(type: "bit", nullable: true),
                    uid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tasks__DC105B0FD8ECF246", x => x.tid);
                    table.ForeignKey(
                        name: "FK__tasks__uid__17036CC0",
                        column: x => x.uid,
                        principalTable: "accounts",
                        principalColumn: "uid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Songs_accountUid",
                table: "Songs",
                column: "accountUid");

            migrationBuilder.CreateIndex(
                name: "IX_tasks_uid",
                table: "tasks",
                column: "uid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Songs");

            migrationBuilder.DropTable(
                name: "tasks");

            migrationBuilder.DropTable(
                name: "accounts");
        }
    }
}
