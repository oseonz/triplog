import axios from 'axios';

//북마크 저장
export const saveBookmark = async ({
    user_id,
    contentid,
    contenttypeid,
    title,
    addr,
    areacode,
    sigungucode,
    firstimage,
}) => {
    try {
        const response = await axios.post(
            'http://localhost:8081/favorites/save',
            {
                user_id,
                contentid,
                contenttypeid,
                title,
                addr,
                areacode,
                sigungucode,
                firstimage,
            },
        );
        return response.data;
    } catch (err) {
        console.error('북마크 저장 실패:', err);
        throw err;
    }
};

//북마크 삭제
export const deleteBookmark = async ({ user_id, contentid }) => {
    return await axios.delete('http://localhost:8081/favorites/delete', {
        user_id,
        contentid,
    });
};

// 북마크 리스트
export const getBookmarksByUser = async (user_id) => {
    const res = await axios.get(
        `http://localhost:8081/favorites/list?${user_id}`,
    );
    return res.data;
};
