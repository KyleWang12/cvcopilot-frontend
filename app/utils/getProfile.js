'use client';
import * as React from 'react';
import Server from '../config';


export const getProfile = React.cache(async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;
    try {
        const res = await fetch(`${Server}/api/profiles/me/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                }
            });
        if(res.status != 200) {
            localStorage.removeItem('user');
            return null;
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
});