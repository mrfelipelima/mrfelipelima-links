import axios from "axios";

const notionToken = process.env.NOTION_ACCESS_TOKEN;

const notionApi = axios.create({
  baseURL: process.env.NOTION_BASE_URL,
  headers: {
    Authorization: `Bearer ${notionToken}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }
})

export { notionApi };
