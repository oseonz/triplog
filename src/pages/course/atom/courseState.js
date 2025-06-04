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
