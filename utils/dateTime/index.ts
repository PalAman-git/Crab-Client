export function endOfDay(date: Date = new Date()){
    const d = new Date(date);
    d.setHours(23,59,59,999);
    return d;
}

export function startOfDay (date:Date = new Date){
    const d = new Date(date);
    d.setHours(0,0,0,0);
    return d;
}