import request from './request';
import type { VocabularyType } from '@/types/collect-words'
export function addVocabulary({ vocabulary,translations,examples,vocabularySourceWeb }: VocabularyType) {
    return request({
        url: '/vocabulary',
        method: 'post',
        data: {
            vocabulary,
            translations,
            examples,
            vocabularySourceWeb
        }
    });
}