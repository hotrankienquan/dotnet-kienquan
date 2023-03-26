export interface Post{
  id: number,
  title: string,
  content: string,
  pictureUrl: string,
  status: number,
  hot:boolean
}


export interface PostParams {
  orderBy: string;
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
}