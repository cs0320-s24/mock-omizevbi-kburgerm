const mockData = [
    ["A1", "A2", "A3", "A4"],
    ["B1", "B2", "B3", "B4"],
    ["C1", "C2", "C3", "C4"],
    ["D1", "D2", "D3", "D4"],
  ];

const fileMap = new Map<string, string[][]>();

fileMap.set("mockData", mockData);

const mockSearch = new Map<string, string[]>();

mockSearch.set("providence", ["Providence", "RI", "02912"])

export const viewMap = fileMap;

export const searchMap = mockSearch;