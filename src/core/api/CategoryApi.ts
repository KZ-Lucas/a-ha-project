import { createRequest } from '@service/ApiService';
import { getCategoriesResponse, getExpertsResponse } from '@Ptypes/experts';

const request = createRequest();

export function getCategories(id: string) {
  return request<getCategoriesResponse>(`categories/${id}`);
}

export function getExperts(query: Record<string, any>) {
  return request<getExpertsResponse>(`experts/categories`, query);
}