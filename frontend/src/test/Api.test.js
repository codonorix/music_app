import React from 'react';
import App from "../App";

test('server is working correctly', async () => {
    const res = await fetch(`https://itunes.apple.com/search?term=queen&media=music`);
    const result = await res.json();
    expect(result.results[0].kind).toBe('song');
});

