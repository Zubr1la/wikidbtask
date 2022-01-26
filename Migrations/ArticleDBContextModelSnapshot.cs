﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using newwiki.Models;

namespace newwiki.Migrations
{
    [DbContext(typeof(ArticleDBContext))]
    partial class ArticleDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("newwiki.Models.Article", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("articleDesc")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("articleTitle")
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("articleType")
                        .HasColumnType("int");

                    b.Property<string>("postedDate")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("id");

                    b.ToTable("Articles");
                });
#pragma warning restore 612, 618
        }
    }
}
