import request from './request';
import type { VocabularyType } from '@/types/collect-words'
export function addVocabulary({ bookId,vocabulary,translations,examples,vocabularySourceWeb,XPath }: VocabularyType) {
    return request({
        url: '/vocabulary',
        method: 'post',
        data: {
            bookId,
            vocabulary,
            translations,
            examples,
            vocabularySourceWeb,
            XPath
        }
    });
}

export function getVocabularyList({ vocabularySourceWeb }: {vocabularySourceWeb:string}) {
    console.log('vocabularySourceWeb',vocabularySourceWeb)
    return request({
        url: '/vocabulary',
        method: 'get',
        params: {
            vocabularySourceWeb,
            // bookId
        }
    });
}
export function updateVocabulary({ bookId,vocabulary,translations,examples,vocabularySourceWeb,XPath }: VocabularyType) {
    return request({
        url: '/vocabulary',
        method: 'put',
        data: {
            bookId,
            vocabulary,
            translations,
            examples,
            vocabularySourceWeb,
        }
    });
}