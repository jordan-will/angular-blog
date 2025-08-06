export interface Post{
  id: string;
  title: string;
  description: string;
  content: string; 
  coverImage?: string;
  authorId: string;
  authorName:string;
  authorAvatar:string|null;
}

export interface Comment {
  postId: string;
  id: string;
  content: string;
  authorId: string;
  authorAvatar?: string;
  authorName: string;
}