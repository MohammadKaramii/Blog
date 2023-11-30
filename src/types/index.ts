export interface Blog {
  blogs: {
    blogs: {
      id: string;
      title: string;
      content: string;
      date: string;
      user: string;
      reactions: {
        thumbsUp: number;
        hooray: number;
        heart: number;
        rocket: number;
        eyes: number;
      };
    }[];
    error?: string | null;
    status?: string;
  };
  error: string | null;
  id: string;
  date: string;
}

export interface Blogs {
  blog: {
    id: string 
    title: string
    content: string
    date: string 
    user: string 
    reactions: {
      thumbsUp: number;
      hooray: number;
      heart: number;
      rocket: number;
      eyes: number;
    };
  };
}

export interface User {
  users: {
    id: string;
    fullname: string;
  }[];
}
