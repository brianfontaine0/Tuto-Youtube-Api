export interface CommentsType {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface LikesType {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface PostsType {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  shares: number;
  tags: string[];
  category: string;
  image: string;
}

export interface SettingsType {
  id: string;
  userId: string;
  theme: string;
  language: string;
  notifications: boolean;
  privacy: string;
  twoFactorAuth: boolean;
  dataSharing: boolean;
}

export interface UsersType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export interface ViewsType {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}