using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{  
    
    public class PostController : BaseApiController
    {
        private readonly StoreContext _context;
        public PostController(StoreContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Post>>>
        GetAllBaiviet([FromQuery] PostParams postParams){
      // return await _context.Posts.ToListAsync();
      var query = _context.Posts
      .Sort(postParams.OrderBy)
      .Search(postParams.SearchTerm)
      .AsQueryable();

      var posts = await PagedList<Post>.ToPagedList(query, postParams.PageNumber, postParams.PageSize);

      Response.AddPaginationHeader(posts.MetaData);
      return posts;
    }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetBaiviet(int id) {
            var post =  await _context.Posts.FindAsync(id);

            if(post == null) return NotFound();

            return post;
        }

        // [HttpGet("filters")]

    }
}