export interface UniversityRequestInterface{
  vk_id: string;
  city_id: string;
  title: string;
}

export interface UniversityResponseInterface{
  id: string;
  title: string;
  city_id: number;
  vk_id: number;
}
