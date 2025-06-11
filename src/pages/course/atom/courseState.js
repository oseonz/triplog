// src/recoil/courseDataAtom.js
import { atom } from 'recoil';

export const courseDataState = atom({
    key: 'courseDataState',
    default: [],
});

export const selectedPlaceState = atom({
    key: 'selectedPlaceState',
    default: null,
});

export const courseListState = atom({
    key: 'courseListState',
    default: [],
});

export const favoriteListState = atom({
    key: 'favoriteListState',
    default: [],
});

export const mapCenterState = atom({
    key: 'mapCenterState',
    default: {
        lat: 37.5665,
        lng: 126.978,
    },
});

export const searchKeywordState = atom({
    key: 'searchKeywordState',
    default: '',
});

export const searchResultState = atom({
    key: 'searchResultState',
    default: {
        typeOneList: [],
        typeTwoList: [],
    },
});

export const myCoursesState = atom({
    key: 'myCoursesState',
    default: [],
});
