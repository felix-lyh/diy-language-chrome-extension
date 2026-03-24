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

export function getVocabularyList({ vocabularySourceWeb }: VocabularyType) {
    return request({
        url: '/vocabulary',
        method: 'get',
        data: {
            vocabularySourceWeb
        }
    });
}
