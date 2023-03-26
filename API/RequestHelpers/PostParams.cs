namespace API.RequestHelpers
{
    public class PostParams : PaginationParams
    {
        public string SearchTerm { get; set; }
        public string OrderBy { get; set; }
    }
}