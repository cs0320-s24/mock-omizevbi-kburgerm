const mockData = [
    ["A1", "A2", "A3", "A4"],
    ["B1", "B2", "B3", "B4"],
    ["C1", "C2", "C3", "C4"],
    ["D1", "D2", "D3", "D4"],
  ];

const mockData2 = [
    ["City", "State", "Zip"],
    ["Providence", "RI", "02912"],
    ["Oakland", "CA", "94501"],
    ["Kirkwood", "CA", "95646"],
  ];




const fileMap = new Map<string, string[][]>();

fileMap.set("mockData", mockData);
fileMap.set("mockData2", mockData2);

const mockSearch = new Map<string, string[]>();

mockSearch.set("providence", ["Providence", "RI", "02912"])

export const viewMap = fileMap;

export const searchMap = mockSearch;