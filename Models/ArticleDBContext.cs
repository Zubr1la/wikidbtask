using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace newwiki.Models
{
    public class ArticleDBContext:DbContext
    {

        public ArticleDBContext(DbContextOptions<ArticleDBContext> options) : base(options)
        {

        }

        public DbSet<Article> Articles { get; set; }

    }
}
