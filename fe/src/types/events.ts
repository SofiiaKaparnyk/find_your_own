export interface IEvent<T = string> {
  user: number;
  id: number;
  title: string;
  description: string;
  date: T;
  image?: string | null;
  latitude: number;
  longitude: number;
}