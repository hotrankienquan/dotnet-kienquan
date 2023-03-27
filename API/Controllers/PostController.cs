using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{  
    
    public class PostController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public PostController(StoreContext context, IMapper mapper, ImageService imageService) {
            _context = context;
            _mapper = mapper;
        _imageService = imageService;
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

        [HttpGet("{id}",Name = "GetPost")]
        public async Task<ActionResult<Post>> GetBaiviet(int id) {
            var post =  await _context.Posts.FindAsync(id);

            if(post == null) return NotFound();

            return post;
        }

        // [HttpGet("filters")]

        //  [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost([FromForm]CreatePostDto postDto)
        {
            var post = _mapper.Map<Post>(postDto);

            if (postDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(postDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                post.PictureUrl = imageResult.SecureUrl.ToString();
                post.PublicId = imageResult.PublicId;
            }

            _context.Posts.Add(post);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetPost", new { Id = post.Id }, post);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

    //    [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Post>> UpdatePost([FromForm]UpdatePostDto postDto)
        {
            var post = await _context.Posts.FindAsync(postDto.Id);

            if (post == null) return NotFound();

            _mapper.Map(postDto, post);

            if (postDto.File != null)
            {
                var imageUploadResult = await _imageService.AddImageAsync(postDto.File);

                if (imageUploadResult.Error != null) 
                    return BadRequest(new ProblemDetails { Title = imageUploadResult.Error.Message });

                if (!string.IsNullOrEmpty(post.PublicId)) 
                    await _imageService.DeleteImageAsync(post.PublicId);

                post.PictureUrl = imageUploadResult.SecureUrl.ToString();
                post.PublicId = imageUploadResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(post);

            return BadRequest(new ProblemDetails { Title = "Problem updating post" });
        }

        // [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null) return NotFound();

            if (!string.IsNullOrEmpty(post.PublicId)) 
                await _imageService.DeleteImageAsync(post.PublicId);

            _context.Posts.Remove(post);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting post" });
        }
    }
}