using Microsoft.EntityFrameworkCore.Migrations;

namespace newwiki.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    articleType = table.Column<int>(type: "int", nullable: false),
                    articleTitle = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    articleDesc = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    postedDate = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Articles");
        }
    }
}
