import request from './request';
import type { VocabularyType } from '@/types/collect-words'
export function addVocabulary({ bookId,vocabulary,translations,examples,SourceWeb,XPath }: VocabularyType) {
    return request({
        url: '/vocabulary',
        method: 'post',
        data: {
            bookId,
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
export function updateVocabulary({ bookId,vocabulary,translations,examples,SourceWeb }: VocabularyType) {
    return request({
        url: '/vocabulary',
        method: 'put',
        data: {
            bookId,
            vocabulary,
            translations,
            examples,
            SourceWeb,
        }
    });
}