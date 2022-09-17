import { AxiosRequestConfig } from 'axios';

import { HTTP_CLIENT } from '@/api';
import { Post } from '@/api/rest/posts/types';
import { PaginationParamsType } from '@/types';

export class Posts {
  static async getAllWithPagination(
    pagination?: PaginationParamsType,
    options?: AxiosRequestConfig<any> | undefined,
  ): Promise<Post[]> {
    const page = pagination ? pagination.page : 2;
    const limit = pagination ? pagination.limit : 5;

    const { data } = await HTTP_CLIENT.get<Post[]>('/posts', {
      params: {
        _limit: limit,
        _page: page,
      },
    });

    return data;
  }
}
