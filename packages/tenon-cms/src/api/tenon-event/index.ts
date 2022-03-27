import { $delete, $get, $post } from "../request"

const prefix = "/tenon-event";

export const getPageEvents = (pageId) => $get(`${prefix}/getEvents/${pageId}`);

export const updateEvent = (params) => $post(`${prefix}/updateEvent`, params);

export const deleteEvent = (eventId) => $delete(`${prefix}/deleteEvent`, { eventId });

export const addEvent = (params) => $delete(`${prefix}/addEvent`, params);