export interface Post{
  id: string;
  title: string;
  description: string;
  content: string; 
  cover?: string;
  authorId: string;
  authorName?:string;
  authorAvatar?:string;
}

export interface Comment {
  postId: string;
  id: string;
  content: string;
  authorId: string;
}