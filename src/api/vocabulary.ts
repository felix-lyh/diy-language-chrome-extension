import request from './request';
import type { VocabularyType } from '@/types/collect-words'

export function getBookList({ page,limit }: {page:number,limit:number}) {
    return request({
        url: '/vocabulary/books',
        method: 'get',
        data: {
            page,
            limit
        }
    });
}
export const getChapters = ({bookId,limit=0,page=1}:{bookId:string,limit:number,page:number}) => {
    return request({
        url: `/vocabulary/${bookId}/chapter`,
        method: 'get',
        params: { bookId,limit, page },
    });
};

export function addVocabulary({ bookId,chapterId,vocabulary,translations,examples,SourceWeb,XPath }: VocabularyType) {
    return request({
        url: '/vocabulary/books/chapters/vocabulary',
        method: 'post',
        data: {
            bookId,
            chapterId,
            vocabulary,
            translations,
            examples,
            SourceWeb,
            XPath
        }
    });
}

export function getVocabularyList({ SourceWeb }: {SourceWeb:string}) {
    console.log('SourceWeb',SourceWeb)
    return request({
        url: '/vocabulary',
        method: 'get',
        params: {
            SourceWeb,
            // bookId
        }
    });
}
export function updateVocabulary({ bookId,chapterId,vocabulary,translations,examples,SourceWeb }: VocabularyType) {
    return request({
        url: '/vocabulary/books/chapters/vocabulary',
        method: 'put',
        data: {
            bookId,
            chapterId,
            vocabulary,
            translations,
            examples,
            SourceWeb,
        }
    });
}