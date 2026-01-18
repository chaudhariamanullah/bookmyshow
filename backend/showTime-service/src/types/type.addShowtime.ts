export interface AddShowTime {
    showTime_public_id:string,
    movie_id:string,
    theater_id:string,
    screen_id:string,
    date:string,
    time:string,
    showtime_status: "housefull" | "cancel" | "active"
}