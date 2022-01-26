using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace newwiki.Models
{
    public class Article
    {

        [Key]
        public int id { get; set; }

        public int articleType { get; set; }            //1 = Technical issue, 2 = Support issue, 3 = Template

        [Column(TypeName = "nvarchar(50)")]
        public string articleTitle { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string articleDesc { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string postedDate { get; set; }
    }
}
