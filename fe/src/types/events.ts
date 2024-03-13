export interface IEvent<D = string> {
  user?: number;
  id?: number;
  title: string;
  description: string;
  date: D;
  image?: string | File | null;
  latitude: number;
  longitude: number;
}