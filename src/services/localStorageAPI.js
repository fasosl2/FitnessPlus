export const generateId = (table)=>{
    return table.reduce((prev, current) => (prev > current.id) ? prev : current.id, 0) + 1
}

export const saveStoredTable = async (table,tableName)=>{
    localStorage.setItem(tableName,JSON.stringify(table))
}

export const getStoredTable = async (table) => {
    return JSON.parse(localStorage.getItem(table)) || [];
}