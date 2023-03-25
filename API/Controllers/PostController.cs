using API.Data;
using API.Entities;
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
        public async Task<ActionResult<List<Post>>>
        GetAllBaiviet(){
            return await _context.Posts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetBaiviet(int id) {
            var post =  await _context.Posts.FindAsync(id);

            if(post == null) return NotFound();

            return post;
        }
    }
}