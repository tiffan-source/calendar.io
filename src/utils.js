let translateMonth = (index)=>{
    let month = [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
    ];

    return month[index];
}

let translateDay = (index)=>{
    let day = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ];

    return day[index];
}
/**
 * 
 * @param {Date} date 
 * @param {string} mode 
 * @returns {String}
 */

let date2String = (date, mode = "days") => {    
    if(mode == "days")
        return translateDay(date.getDay()) +
        " " + date.getDate() + " " +
        translateMonth(date.getMonth())
    else if(mode == "month")
        return translateMonth(date.getMonth()) + " " +
        date.getFullYear()
}

/**
 * Verifie si la chaine est une date au format ISO
 * @param {String} str
 * @returns {boolean}
 */

let isIsoDate = (str) => {
    if (!/\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.\d{3}Z)?/.test(str)) return false;
    const d = new Date(str); 
    return d instanceof Date && !isNaN(d);
}

/**
 * filtre les evenements sur une periode
 * @param {Object} eventDatas 
 * @param {Date} dateStart 
 * @param {Date} dateEnd 
 * @returns {Object}
 */

let filterEventForPeriode = (eventDatas, dateStart, dateEnd) => {
    eventDatas.events = eventDatas.events.filter(event=>{
        let start = new Date(event[eventDatas.start]);
        let end = new Date(event[eventDatas.end]);

        return !(end < dateStart || start > dateEnd);
    });

    return eventDatas;
}

/**
 * Order Event data by date
 * @param {Object} eventsData
 * @returns {Object}
 */

let orderEventByDate = (eventDatas) => {
    eventDatas.events = eventDatas.events.sort((event1, event2)=>{
        let start1 = new Date(event1[eventDatas.start]);
        let start2 = new Date(event2[eventDatas.start]);

        return start1 - start2;
    })

    return eventDatas;
}

/**
 * Number of day between two day
 * @param {Date} date1 
 * @param {Date} date2
 * @returns {Number}
 */

let differenceDay = (date1, date2)=>{
    date1.setUTCHours(0, 0, 0);
    date2.setUTCHours(0, 0, 0);
    let difference = date1.getTime() - date2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return Math.abs(TotalDays);
}