'use strict';
import * as React from 'react';
import Server from '../config';

export const createProfile = async (data = {}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;
    try {
        const res = await fetch(`${Server}/api/profiles/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                },
            body: JSON.stringify(data)
            });
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};