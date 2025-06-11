// api/newSearchBackApi.js

import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8081';

// const prefix = `${API_SERVER_HOST}/likes/content/list`;
const prefix = `${API_SERVER_HOST}/likes/content/count`;

export const getLikes = async (contentid) => {
    const res = await axios.get(prefix, {
        params: { contentid },
    });
    console.log('contentid : ', contentid)
    console.log('getLikes 응답:', res.data);
    // return res.data.items.content[0].likes_count;
    return res.data.count;
};
// api/newSearchBackApi.js
