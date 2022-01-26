using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newwiki.Models;

namespace newwiki.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ArticleDBContext _context;

        public ArticleController(ArticleDBContext context)
        {
            _context = context;
        }

        // GET: api/article
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {

            return await _context.Articles.ToListAsync();
        }

        // GET: api/article/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var choosenArticle = await _context.Articles.FindAsync(id);

            if (choosenArticle == null)
            {
                return NotFound();
            }

            return choosenArticle;
        }


        // GET: api/article/1or2(titleORDesc)/querry
        [HttpGet("{searchType}/{searchText}")]
        public async Task<ActionResult<IEnumerable<Article>>> GetFoundArticles(int searchType, string searchText)
        {

            var foundArticles = from m in _context.Articles select m;

            if (searchType == 1) //Search by Title
            {
                if (!String.IsNullOrEmpty(searchText))
                {
                    foundArticles = foundArticles.Where(s => s.articleTitle!.Contains(searchText));
                    return await foundArticles.ToListAsync();

                }
            }else if (searchType == 2)  //Search by description
            {
                if (!String.IsNullOrEmpty(searchText))
                {
                    foundArticles = foundArticles.Where(s => s.articleDesc!.Contains(searchText));
                    return await foundArticles.ToListAsync();
                }
            }

            return null;
        }


        // PUT: api/article/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, Article choosenArticle)
        {
            choosenArticle.id = id;

            _context.Entry(choosenArticle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/article
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article choosenArticle)
        {
            _context.Articles.Add(choosenArticle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticle", new { id = choosenArticle.id }, choosenArticle);
        }

        // DELETE: api/article/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Article>> DeleteArticle(int id)
        {
            var choosenArticle = await _context.Articles.FindAsync(id);
            if (choosenArticle == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(choosenArticle);
            await _context.SaveChangesAsync();

            return choosenArticle;
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(e => e.id == id);
        }
    }
}