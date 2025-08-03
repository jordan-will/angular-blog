export interface Post{
  id: string;
  title: string;
  description: string;
  content: string; 
  coverImage?: string;
  authorId: string;
}

export interface Comment {
  postId: string;
  id: string;
  content: string;
  authorId: string;
  profileImage?: string;
  authorName: string;
}