import request from './request';

export function getBookList({ page,limit }: {page:number,limit:number}) {
    return request({
        url: '/book',
        method: 'get',
        data: {
            page,
            limit
        }
    });
}

