using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{  
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
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
      return await _context.Posts.FindAsync(id);
    }
    }
}