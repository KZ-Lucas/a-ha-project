import { createRequest } from '@service/ApiService';
import { GetCategoriesResponse, GetExpertsResponse } from '@Ptypes/experts';

const request = createRequest();

export function getCategories(id: string) {
  return request<GetCategoriesResponse>(`categories/${id}`);
}

export function getExperts(query: Record<string, any>) {
  return request<GetExpertsResponse>(`experts/categories`, query);
}
