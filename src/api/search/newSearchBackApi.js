// api/newSearchBackApi.js

import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8081';

const prefix = `${API_SERVER_HOST}/likes/content/list`;

export const getLikes = async ({ contentid }) => {
    const res = await axios.get(prefix, {
        params: { contentid },
    });

    return res.data.items.content[0].likes_count;
};
// api/newSearchBackApi.js
