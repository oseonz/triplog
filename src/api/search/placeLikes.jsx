import axios from "axios";

const API_SERVER_HOST = "http://localhost:8081";

const prefix = `${API_SERVER_HOST}/likes/content/`;

export const getOne = async (contentid) => {
    const res = await axios.get(`${prefix}detail/${contentid}`);
    return res.data;
};

export const getList = async (params) => {
    const {
        user_id,
        areacode,
        contenttypeid,
        sigungucode,
        likes_count,
        page,
        size,
    } = params;

    const res = await axios.get(`${prefix}list`, {
        params: {
            user_id: user_id,
            areacode: areacode,
            contenttypeid: contenttypeid,
            sigungucode: sigungucode,
            likes_count: likes_count,
            page: page,
            size: size,
        },
    });
    return res.data;
};

// export const getOne = async (tno) => {
//   const res = await axios.get(`${prefix}view/${tno}`);
//   return res.data;
// };

export const putOne = () => {};