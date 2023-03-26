using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Post> Sort(this IQueryable<Post> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Title);

            query = orderBy switch
            {
                "id" => query.OrderBy(p => p.Id),
                "idDesc" => query.OrderByDescending(p => p.Id),
                _ => query.OrderBy(n => n.Content)
            };

            return query;
        }

        public static IQueryable<Post> Search(this IQueryable<Post> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Title.ToLower().Contains(lowerCaseSearchTerm));
        }

        //  sau này làm category sẽ thêm chức năng filter dựa theo category
        
    }
}